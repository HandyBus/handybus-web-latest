import type { CancellationPolicyRow } from '@/constants/cancellation-policy';

interface CancellationPolicyTableProps {
  data: CancellationPolicyRow[];
}

const CancellationPolicyTable = ({ data }: CancellationPolicyTableProps) => {
  return (
    <div className="overflow-hidden rounded-[5px] border border-basic-grey-300 text-12 text-basic-black">
      <table className="w-full border-collapse">
        <thead className="font-600 text-basic-grey-700">
          <tr className="bg-basic-grey-100 text-left">
            <th className="border-b border-r border-basic-grey-300 px-[10px] py-[6px]">
              취소시점
            </th>
            <th className="border-b border-basic-grey-300 px-[10px] py-[6px]">
              취소 수수료
            </th>
          </tr>
        </thead>
        <tbody className="bg-basic-white font-500 text-basic-grey-600">
          {data.map((row, index) => (
            <tr
              key={row.timing}
              className={row.highlight ? 'text-basic-red-400' : ''}
            >
              <td
                className={`border-r border-basic-grey-300 px-[10px] py-[6px] ${
                  index < data.length - 1
                    ? 'border-b border-basic-grey-300'
                    : ''
                }`}
              >
                {row.timing}
              </td>
              <td
                className={`px-[10px] py-[6px] ${
                  index < data.length - 1
                    ? 'border-b border-basic-grey-300'
                    : ''
                }`}
              >
                {row.fee}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CancellationPolicyTable;
