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
    <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <h2 className="text-base font-semibold text-gray-900 sm:text-lg">Recent Transactions</h2>
        {showSeeAll && (
          <button 
            onClick={onSeeAll}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 sm:gap-2 sm:text-sm"
          >
            See all
            <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      <div className="-mx-4 overflow-x-auto sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full">
            <thead className="border-b border-gray-200">
              <tr className="text-left text-xs font-medium text-gray-600 sm:text-sm">
                <th className="whitespace-nowrap px-4 pb-3 font-medium sm:px-0">Student Name</th>
                <th className="whitespace-nowrap px-4 pb-3 font-medium sm:px-0">Fee Type</th>
                <th className="hidden whitespace-nowrap px-4 pb-3 font-medium sm:table-cell sm:px-0">Class</th>
                <th className="whitespace-nowrap px-4 pb-3 font-medium sm:px-0">Amount</th>
                <th className="hidden whitespace-nowrap px-4 pb-3 font-medium lg:table-cell lg:px-0">Date</th>
                <th className="whitespace-nowrap px-4 pb-3 font-medium sm:px-0">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="text-xs sm:text-sm">
                  <td className="px-4 py-3 sm:px-0 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-700 text-xs font-medium text-white sm:h-10 sm:w-10 sm:text-sm">
                        {transaction.studentName[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-gray-900">{transaction.studentName}</p>
                        <p className="truncate text-xs text-gray-500">{transaction.studentId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-600 sm:px-0 sm:py-4">{transaction.feeType}</td>
                  <td className="hidden whitespace-nowrap px-4 py-3 text-gray-600 sm:table-cell sm:px-0 sm:py-4">{transaction.class}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 sm:px-0 sm:py-4">{transaction.amount}</td>
                  <td className="hidden whitespace-nowrap px-4 py-3 text-gray-600 lg:table-cell lg:px-0 lg:py-4">{transaction.date}</td>
                  <td className="whitespace-nowrap px-4 py-3 sm:px-0 sm:py-4">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium sm:px-3 sm:py-1 ${statusStyles[transaction.status]}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
