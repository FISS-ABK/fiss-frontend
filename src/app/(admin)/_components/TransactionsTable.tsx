'use client';

interface Transaction {
  id: string | number;
  studentName: string;
  studentId: string;
  feeType: string;
  class: string;
  amount: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

interface TransactionsTableProps {
  transactions: Transaction[];
  showSeeAll?: boolean;
  onSeeAll?: () => void;
}

const statusStyles = {
  Approved: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Rejected: 'bg-red-100 text-red-700',
};

export default function TransactionsTable({ 
  transactions, 
  showSeeAll = false, 
  onSeeAll 
}: TransactionsTableProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        {showSeeAll && (
          <button 
            onClick={onSeeAll}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          >
            See all
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr className="text-left text-sm font-medium text-gray-600">
              <th className="pb-3 font-medium">Student Name</th>
              <th className="pb-3 font-medium">Fee Type</th>
              <th className="pb-3 font-medium">Class</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="text-sm">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-white text-sm font-medium">
                      {transaction.studentName[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.studentName}</p>
                      <p className="text-xs text-gray-500">{transaction.studentId}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-gray-600">{transaction.feeType}</td>
                <td className="py-4 text-gray-600">{transaction.class}</td>
                <td className="py-4 font-medium text-gray-900">{transaction.amount}</td>
                <td className="py-4 text-gray-600">{transaction.date}</td>
                <td className="py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[transaction.status]}`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
