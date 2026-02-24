import { CancellationPolicyRow } from '@/constants/cancellation-policy';

interface CancellationPolicyTableProps {
  data: CancellationPolicyRow[];
}

const CancellationPolicyTable = ({ data }: CancellationPolicyTableProps) => {
  return (
    <table className="w-full border-collapse overflow-hidden rounded-8 border border-basic-grey-200">
      <thead>
        <tr className="bg-basic-grey-300">
          <th className="border-b border-r border-basic-grey-200 px-12 py-8 text-left text-14 font-700 leading-[18px]">
            취소시점
          </th>
          <th className="border-b border-basic-grey-200 px-12 py-8 text-left text-14 font-700 leading-[18px]">
            취소 수수료
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={row.timing}
            className={
              index < data.length - 1 ? 'border-b border-basic-grey-200' : ''
            }
          >
            <td className="border-r border-basic-grey-200 px-12 py-8 text-14 font-400">
              {row.timing}
            </td>
            <td
              className={`px-12 py-8 text-14 font-400 ${
                row.highlight ? 'text-basic-red-400' : ''
              }`}
            >
              {row.fee}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CancellationPolicyTable;
