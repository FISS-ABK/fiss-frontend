"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FloatingNavWrapper from "@/components/floating-nav-wrapper";
import DotSeparator from "@/components/dot-separator";
import { FormEvent, useState } from "react";
import { useStudentReceipts } from "@/hooks/useTransaction";

export default function ReceiptsPage() {
  const [studentId, setStudentId] = useState("");
  const {
    studentTransactions,
    fetchStudentTransactionsAsync,
    isFetchingStudentTransactions,
    studentTransactionsError,
  } = useStudentReceipts();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) return;
    await fetchStudentTransactionsAsync({ studentId: studentId.trim() });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <FloatingNavWrapper initialBg="bg-[#edf5f5]">
        <Navbar />
      </FloatingNavWrapper>

      <header className="bg-[#edf5f5]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <h1 className="text-3xl font-extrabold text-[#09283b]">
            Print Receipts
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-[#12303f]">
            Search for payment receipts and print official copies for
            record-keeping.
          </p>
        </div>
      </header>
      <DotSeparator />
      <main className="mx-auto w-full max-w-3xl px-6 py-12">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Search by Student ID
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                  placeholder="Enter Student ID"
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isFetchingStudentTransactions}
                  className="rounded-md bg-[#09283b] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isFetchingStudentTransactions ? "Searching..." : "Find Receipt"}
                </button>
              </div>
            </div>
          </form>

          {studentTransactionsError && (
            <div className="mt-4 text-sm text-red-600">
              Failed to load receipts. Please try again.
            </div>
          )}

          <div className="mt-8">
            {isFetchingStudentTransactions && (
              <p className="text-sm text-gray-600">Searching receipts...</p>
            )}

            {!isFetchingStudentTransactions &&
              Array.isArray(studentTransactions) &&
              studentTransactions.length === 0 && (
                <p className="text-sm text-gray-600">
                  Enter a student ID and click &quot;Find Receipt&quot; to view
                  payment history.
                </p>
              )}

            {!isFetchingStudentTransactions &&
              Array.isArray(studentTransactions) &&
              studentTransactions.length > 0 && (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="border-b bg-gray-50 text-xs font-medium text-gray-600">
                      <tr>
                        <th className="px-3 py-2">Transaction ID</th>
                        <th className="px-3 py-2">Fee Type</th>
                        <th className="px-3 py-2">Amount</th>
                        <th className="px-3 py-2">Status</th>
                        <th className="px-3 py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {studentTransactions.map((tx: any, index: number) => {
                        const amountValue =
                          typeof tx.amount === "number"
                            ? tx.amount
                            : Number(tx.amount ?? 0);
                        const amountFormatted = isNaN(amountValue)
                          ? `${tx.amount ?? ""}`
                          : `₦${amountValue.toLocaleString()}`;

                        const dateSource = tx.date || tx.createdAt;
                        const formattedDate = dateSource
                          ? new Date(dateSource).toLocaleString()
                          : "—";

                        return (
                          <tr key={tx.id ?? index}>
                            <td className="px-3 py-2 text-gray-900">
                              {tx.id ?? "—"}
                            </td>
                            <td className="px-3 py-2 text-gray-700">
                              {tx.feeType || tx.fee_type || "—"}
                            </td>
                            <td className="px-3 py-2 text-gray-900">
                              {amountFormatted}
                            </td>
                            <td className="px-3 py-2 text-gray-700">
                              {tx.status || "—"}
                            </td>
                            <td className="px-3 py-2 text-gray-700">
                              {formattedDate}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        </div>
      </main>
      {/* <DotSeparator /> */}
      <Footer />
    </div>
  );
}
