import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { calculateRefundFee } from './reservation.util';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ReservationsViewEntity } from '@/types/reservation.type';

dayjs.extend(utc);
dayjs.extend(timezone);

// Helper to create a mock reservation
const createMockReservation = (
  isHandyParty: boolean,
  paymentCreatedAt: string,
  boardingDate: string,
  paymentAmount: number = 10000,
): ReservationsViewEntity => {
  return {
    paymentCreatedAt,
    paymentAmount,
    type: 'TO_DESTINATION',
    toDestinationShuttleRouteHubId: 'hub-1',
    shuttleRoute: {
      isHandyParty,
      dailyEventId: 'daily-event-1',
      event: {
        dailyEvents: [
          {
            dailyEventId: 'daily-event-1',
            dailyEventDate: boardingDate, // used for HandyParty boarding time calculation
          },
        ],
      },
      toDestinationShuttleRouteHubs: [
        {
          shuttleRouteHubId: 'hub-1',
          arrivalTime: boardingDate, // used for Normal boarding time calculation
        },
      ],
      fromDestinationShuttleRouteHubs: [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
  } as ReservationsViewEntity;
};

describe('calculateRefundFee', () => {
  beforeEach(() => {
    // Set a fixed "now" time for consistent testing
    // Let's say "now" is 2024-01-10 12:00:00 KST
    vi.setSystemTime(dayjs('2024-01-10T12:00:00+09:00').toDate());
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Common Rules', () => {
    it('should return null if reservation is null', () => {
      expect(calculateRefundFee(null)).toBeNull();
    });

    it('should return 0 if canceled within 2 hours of payment', () => {
      const now = dayjs('2024-01-10T12:00:00+09:00');
      const paymentTime = now.subtract(1, 'hour').format(); // 1 hour ago
      const boardingDate = '2024-01-20T10:00:00+09:00'; // plenty of time

      const reservation = createMockReservation(
        false,
        paymentTime,
        boardingDate,
      );
      expect(calculateRefundFee(reservation)).toBe(0);
    });

    it('should calculate fee if canceled after 2 hours of payment', () => {
      const now = dayjs('2024-01-10T12:00:00+09:00');
      const paymentTime = now.subtract(3, 'hour').format(); // 3 hours ago
      const boardingDate = '2024-01-20T10:00:00+09:00';

      const reservation = createMockReservation(
        false,
        paymentTime,
        boardingDate,
      );
      // D-10. Normal fee: D>=8 -> 0
      expect(calculateRefundFee(reservation)).toBe(0);
    });
  });

  describe('HandyParty Refund Rules', () => {
    // HandyParty:
    // D >= 6: 0% fee
    // D < 6: 100% fee

    const isHandyParty = true;
    const paymentAmount = 10000;
    // "now" is 2024-01-10 (start of day for diff calculation is 2024-01-10 00:00)

    it('D-6: should return 0 fee', () => {
      // Boarding: 2024-01-16. 16 - 10 = 6
      const paymentTime = '2024-01-01T10:00:00+09:00';
      const boardingDate = '2024-01-16T12:00:00+09:00';

      const reservation = createMockReservation(
        isHandyParty,
        paymentTime,
        boardingDate,
        paymentAmount,
      );
      expect(calculateRefundFee(reservation)).toBe(0);
    });

    it('D-5: should return 100% fee', () => {
      // Boarding: 2024-01-15. 15 - 10 = 5
      const paymentTime = '2024-01-01T10:00:00+09:00';
      const boardingDate = '2024-01-15T12:00:00+09:00';

      const reservation = createMockReservation(
        isHandyParty,
        paymentTime,
        boardingDate,
        paymentAmount,
      );
      expect(calculateRefundFee(reservation)).toBe(paymentAmount);
    });

    it('D-0 (Same day): should return 100% fee', () => {
      // Boarding: 2024-01-10. 10 - 10 = 0
      const paymentTime = '2024-01-01T10:00:00+09:00';
      const boardingDate = '2024-01-10T18:00:00+09:00';

      const reservation = createMockReservation(
        isHandyParty,
        paymentTime,
        boardingDate,
        paymentAmount,
      );
      expect(calculateRefundFee(reservation)).toBe(paymentAmount);
    });
  });

  describe('Shuttle Bus (Normal) Refund Rules', () => {
    // Normal:
    // D >= 8: 0%
    // D = 7: 25%
    // D = 6: 50%
    // D <= 5: 100%

    const isHandyParty = false;
    const paymentAmount = 10000;

    it('D-8: should return 0 fee', () => {
      // Boarding: 2024-01-18. 18 - 10 = 8
      const paymentTime = '2024-01-01T10:00:00+09:00';
      const boardingDate = '2024-01-18T12:00:00+09:00';

      const reservation = createMockReservation(
        isHandyParty,
        paymentTime,
        boardingDate,
        paymentAmount,
      );
      expect(calculateRefundFee(reservation)).toBe(0);
    });

    it('D-7: should return 25% fee', () => {
      // Boarding: 2024-01-17. 17 - 10 = 7
      const paymentTime = '2024-01-01T10:00:00+09:00';
      const boardingDate = '2024-01-17T12:00:00+09:00';

      const reservation = createMockReservation(
        isHandyParty,
        paymentTime,
        boardingDate,
        paymentAmount,
      );
      expect(calculateRefundFee(reservation)).toBe(2500);
    });

    it('D-6: should return 50% fee', () => {
      // Boarding: 2024-01-16. 16 - 10 = 6
      const paymentTime = '2024-01-01T10:00:00+09:00';
      const boardingDate = '2024-01-16T12:00:00+09:00';

      const reservation = createMockReservation(
        isHandyParty,
        paymentTime,
        boardingDate,
        paymentAmount,
      );
      expect(calculateRefundFee(reservation)).toBe(5000);
    });

    it('D-5: should return 100% fee', () => {
      // Boarding: 2024-01-15. 15 - 10 = 5
      const paymentTime = '2024-01-01T10:00:00+09:00';
      const boardingDate = '2024-01-15T12:00:00+09:00';

      const reservation = createMockReservation(
        isHandyParty,
        paymentTime,
        boardingDate,
        paymentAmount,
      );
      expect(calculateRefundFee(reservation)).toBe(paymentAmount);
    });
  });
});
