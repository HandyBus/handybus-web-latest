import { ReviewsViewEntity } from '@/types/review.type';

export const STATIC_REVIEWS: ReviewsViewEntity[] = [
  {
    id: 1,
    rating: 5,
    content:
      '핸디 버스 차 대절은 이번이 두번째인데 일반적인 고석버스와는 다른 크고 편안한 좌석과 기사님도 너무 친절하셨고 할인 이벤트도 쉽게 참여할 수 있는게 큰 장점이었어요 다음에도 또 이용할 생각입니다 💚',
    reviewImages: [
      {
        imageUrl: '/images/reviews/review-1-1.png',
        status: 'ACTIVE' as const,
      },
      {
        imageUrl: '/images/reviews/review-1-2.png',
        status: 'ACTIVE' as const,
      },
    ],
    createdAt: '2024-08-04',
    userNickname: '맠쿨럭',
    eventName: '2024 NCT 127 8th ANNIVERSARY FANMEETING <8ECRET INVITATION>',
    eventLocationName: '잠실실내체육관',
    eventArtists: [{ artistId: 'art-nct127', artistName: 'NCT 127' }],
  },
  {
    id: 2,
    rating: 5,
    content:
      '두번째 이용인데 기사님이 너무 친절하셨고 덕분에 막차시간 신경 쓸 필요도 없이 대전까지 정말 편하게 올 수 있었습니다',
    reviewImages: [],
    createdAt: '2024-08-03',
    userNickname: '연승현',
    eventName: '2024 NCT 127 8th ANNIVERSARY FANMEETING <8ECRET INVITATION>',
    eventLocationName: '잠실실내체육관',
    eventArtists: [{ artistId: 'art-nct127', artistName: 'NCT 127' }],
  },
  {
    id: 3,
    rating: 5,
    content: '라이즈 팬콘때 진짜 편안하고 빠르게 잘 다녀왔어요 🧡',
    reviewImages: [],
    createdAt: '2024-05-04',
    userNickname: 'danaas2',
    eventName: "2024 RIIZE FAN-CON TOUR 'RIIZING DAY'",
    eventLocationName: '잠실실내체육관',
    eventArtists: [{ artistId: 'art-riize', artistName: 'RIIZE' }],
  },
  {
    id: 4,
    rating: 5,
    content:
      '캐럿랜드 차대절 후기!\n 트친이 알려줘서 타고왔는데 가격도 꽤 괜찮았고 버스도 우등버스라 편했하구 엄청 조용해서 편하게 갔다왔어요!\n 같이 탑승한 부총대님이 친절하게 인솔해주셔서 잘 다녀왔어요-!!',
    reviewImages: [],
    createdAt: '2024-07-23',
    userNickname: '묘다',
    eventName: '2024 SVT 8TH FAN MEETING SEVENTEEN in CARAT LAND',
    eventLocationName: '고척스카이돔',
    eventArtists: [{ artistId: 'art-svt', artistName: 'SEVENTEEN' }],
  },
  {
    id: 5,
    rating: 5,
    content:
      '전에 다른 대절을 이용했을땐 일반 관광버스가 와서 조금은 불편했는데 우등버스로 운행해주셔서 편안하게 이동할 수 있었습니다 :D',
    reviewImages: [],
    createdAt: '2024-07-24',
    userNickname: 'seungjin',
    eventName: '2024 SVT 8TH FAN MEETING SEVENTEEN in CARAT LAND',
    eventLocationName: '고척스카이돔',
    eventArtists: [{ artistId: 'art-svt', artistName: 'SEVENTEEN' }],
  },
  {
    id: 6,
    rating: 5,
    content:
      '인천콘때부터 핸디버스 만 타요ㅋㅋㅋㅋ 자방럿에겐 제일 좋은 방법.. 사랑해요 핸디버스',
    reviewImages: [],
    createdAt: '2024-10-12',
    userNickname: 'tanily',
    eventName: 'SEVENTEEN [RIGHT HERE] WORLD TOUR IN GOYANG',
    eventLocationName: '고양종합운동장',
    eventArtists: [{ artistId: 'art-svt', artistName: 'SEVENTEEN' }],
  },
  {
    id: 7,
    rating: 5,
    content:
      '공지사항을 꼼꼼하고 자세하게 알려주셔서 항상 믿고 탈 수 있습니다 특히 버스 기사남께서 말로 다 표현 못할정도로 친절하세요',
    reviewImages: [],
    createdAt: '2024-04-27',
    userNickname: '심진희',
    eventName: "SEVENTEEN TOUR 'FOLLOW' AGAIN TO SEOUL",
    eventLocationName: '서울월드컵경기장',
    eventArtists: [{ artistId: 'art-svt', artistName: 'SEVENTEEN' }],
  },
  {
    id: 8,
    rating: 5,
    content:
      '기사님도 친절하고 유쾌하셔서 버스타는동안 너무 편안하게 갔다왔습니다! 다음에도 이용할 수 있으면 꼭 다시 이용할게요!!❤️',
    reviewImages: [],
    createdAt: '2024-05-04',
    userNickname: 'minjoo',
    eventName: '2024 NCT DREAM WORLD TOUR <THE DREAM SHOW 3>',
    eventLocationName: '고척스카이돔',
    eventArtists: [{ artistId: 'art-nctdream', artistName: 'NCT DREAM' }],
  },
  {
    id: 9,
    rating: 5,
    content:
      '지방럿 항상 가기 너무 힘든데 핸디버스 덕분에 너무 편하게 다녀왔어요!!',
    reviewImages: [
      {
        imageUrl: '/images/reviews/review-9.png',
        status: 'ACTIVE' as const,
      },
    ],
    createdAt: '2024-03-03',
    userNickname: 'heejin',
    eventName: '<2024 IU HEREH WORLD TOUR CONCERT [H.E.R.] 콘서트>',
    eventLocationName: 'KSPO DOME',
    eventArtists: [{ artistId: 'art-iu', artistName: '아이유' }],
  },
  {
    id: 10,
    rating: 5,
    content: '아이유 콘서트 때 처음 이용해봤는데 너무 편하고 좋았어요!',
    reviewImages: [
      {
        imageUrl: '/images/reviews/review-10.png',
        status: 'ACTIVE' as const,
      },
    ],
    createdAt: '2024-03-10',
    userNickname: 'yongjin',
    eventName: '<2024 IU HEREH WORLD TOUR CONCERT [H.E.R.] 콘서트>',
    eventLocationName: 'KSPO DOME',
    eventArtists: [{ artistId: 'art-iu', artistName: '아이유' }],
  },
  {
    id: 11,
    rating: 5,
    content:
      '지방러들의 빛... 기사 분도 너무 친절하시고 총대 맡아주신 분도 너무 잘 설명해주셔서 편하게 다녀왔습니다 💛',
    reviewImages: [
      {
        imageUrl: '/images/reviews/review-11.png',
        status: 'ACTIVE' as const,
      },
    ],
    createdAt: '2024-02-23',
    userNickname: 'crealiy',
    eventName: "ENHYPEN WORLD TOUR 'FATE PLUS' IN SEOUL",
    eventLocationName: 'KSPO DOME',
    eventArtists: [{ artistId: 'art-enh', artistName: 'ENHYPEN' }],
  },
  {
    id: 12,
    rating: 5,
    content: '다음에도 꼭 열어주세요!! 🥺',
    reviewImages: [
      {
        imageUrl: '/images/reviews/review-12.png',
        status: 'ACTIVE' as const,
      },
    ],
    createdAt: '2024-02-23',
    userNickname: 'beliveall',
    eventName: "ENHYPEN WORLD TOUR 'FATE PLUS' IN SEOUL",
    eventLocationName: 'KSPO DOME',
    eventArtists: [{ artistId: 'art-enh', artistName: 'ENHYPEN' }],
  },
  {
    id: 13,
    rating: 5,
    content:
      '버스가 우등버스라 진짜 편했어요! 다음 콘서트 때도 이용할 생각입니당',
    reviewImages: [
      {
        imageUrl: '/images/reviews/review-13.png',
        status: 'ACTIVE' as const,
      },
    ],
    createdAt: '2024-09-21',
    userNickname: 'lilac',
    eventName: '<2024 IU HEREH WORLD TOUR CONCERT [H.E.R.] 앵콜 콘서트>',
    eventLocationName: '서울월드컵경기장',
    eventArtists: [{ artistId: 'art-iu', artistName: '아이유' }],
  },
  {
    id: 14,
    rating: 5,
    content: '핸디버스 덕분에 집 앞에서 타고 왔어요! 너무 편하고 좋아요',
    reviewImages: [
      {
        imageUrl: '/images/reviews/review-14.png',
        status: 'ACTIVE' as const,
      },
    ],
    createdAt: '2024-09-22',
    userNickname: 'aimin',
    eventName: '<2024 IU HEREH WORLD TOUR CONCERT [H.E.R.] 앵콜 콘서트>',
    eventLocationName: '서울월드컵경기장',
    eventArtists: [{ artistId: 'art-iu', artistName: '아이유' }],
  },
];
