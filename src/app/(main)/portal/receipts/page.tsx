"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FloatingNavWrapper from "@/components/floating-nav-wrapper";
import DotSeparator from "@/components/dot-separator";
import { FormEvent, useState, useEffect, Suspense } from "react";
import { useStudentReceipts, ApiTransaction } from "@/hooks/useTransaction";
import { useSearchParams } from "next/navigation";
import { usePayment } from "@/hooks/usePayment";
import { toast } from "sonner";
import { Loader2, Download } from "lucide-react";

// Helper to trigger file download using a Blob to ensure standard download prompt
const downloadReceipt = async (url: string, filename: string = "receipt.pdf") => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Failed to download receipt via blob:", error);
    // Fallback: just open in new tab
    window.open(url, "_blank");
  }
};

function ReceiptsPageContent() {
  const [studentId, setStudentId] = useState("");
  const {
    studentTransactions,
    fetchStudentTransactionsAsync,
    isFetchingStudentTransactions,
    studentTransactionsError,
  } = useStudentReceipts();
  const hasTransactionsError = Boolean(studentTransactionsError);

  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  
  const [isVerifyingRef, setIsVerifyingRef] = useState(false);
  const { verifyPaymentAsync } = usePayment();
  const [downloadedRef, setDownloadedRef] = useState<string | null>(null);
  const [localTransactions, setLocalTransactions] = useState<ApiTransaction[]>([]);

  // Choose which list of transactions to display (single verified transaction or full list from search)
  const transactionsToShow = localTransactions.length > 0 ? localTransactions : studentTransactions;

  // Automatically verify payment and retrieve/download receipt if redirected from Paystack
  useEffect(() => {
    if (reference && downloadedRef !== reference) {
      setDownloadedRef(reference);
      const verifyAndDownload = async () => {
        setIsVerifyingRef(true);
        const loadingToastId = toast.loading("Verifying payment status...");
        try {
          const res = await verifyPaymentAsync(reference);
          
          const statusRaw = res.status ?? res.payment_status ?? res.data?.status ?? null;
          const status = typeof statusRaw === "string" ? statusRaw.toLowerCase() : null;
          const isSuccessStatus = status === "confirmed" || status === "success" || status === "successful" || status === "completed";
          const isSuccessBool = res.success ?? res.data?.success;
          
          if (isSuccessStatus || isSuccessBool === true) {
            toast.success("Payment verified successfully!", { id: loadingToastId });
            
            // Try to find the receiptUrl
            const receiptUrl = res.receiptUrl || res.data?.receiptUrl || res.transaction?.receiptUrl || res.data?.transaction?.receiptUrl;
            
            // Try to find the student ID
            const studentIdFromRes = res.studentId || res.data?.studentId || res.data?.metadata?.studentId || res.transaction?.studentId || res.data?.transaction?.studentId || res.data?.transaction?.metadata?.studentId;
            
            if (studentIdFromRes) {
              setStudentId(studentIdFromRes);
            }

            // Build a single transaction object from the verification response to display in the table
            const txData = res.transaction || res.data?.transaction || {};
            const apiTx: ApiTransaction = {
              id: (txData.id || txData._id || reference) as string | number,
              feeType: (txData.feeType || txData.fee_type || (res.data as Record<string, unknown> | undefined)?.feeType || "—") as string,
              amount: (txData.amount || (res.data as Record<string, unknown> | undefined)?.amount || 0) as number,
              status: (txData.status || status || "completed") as string,
              date: (txData.date || txData.createdAt || (res.data as Record<string, unknown> | undefined)?.createdAt || new Date().toISOString()) as string,
              receiptUrl: receiptUrl
            };
            setLocalTransactions([apiTx]);
            
            if (receiptUrl) {
              toast.info("Downloading your receipt...");
              await downloadReceipt(receiptUrl, `receipt_${reference}.pdf`);
            } else {
              toast.warning("Payment was verified, but receipt URL is not ready yet. Please search by Student ID to print.");
            }
          } else {
            toast.error("Payment status verification returned: " + (status || "unconfirmed"), { id: loadingToastId });
          }
        } catch (error) {
          console.error("Verification error:", error);
          toast.error("Failed to verify payment status.", { id: loadingToastId });
        } finally {
          setIsVerifyingRef(false);
        }
      };
      
      verifyAndDownload();
    }
  }, [reference, downloadedRef, verifyPaymentAsync]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) return;
    setLocalTransactions([]); // Clear any single auto-fetched transaction to show the searched student transactions
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
        {isVerifyingRef && (
          <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-6 text-center shadow-sm">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#09283b]" />
            <h3 className="mt-3 text-lg font-semibold text-[#09283b]">Verifying Payment...</h3>
            <p className="mt-1 text-sm text-gray-600">Please wait while we verify your transaction and retrieve your receipt.</p>
          </div>
        )}

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

          {hasTransactionsError && (
            <div className="mt-4 text-sm text-red-600">
              Failed to load receipts. Please try again.
            </div>
          )}

          <div className="mt-8">
            {isFetchingStudentTransactions && (
              <p className="text-sm text-gray-600">Searching receipts...</p>
            )}

            {!isFetchingStudentTransactions &&
              Array.isArray(transactionsToShow) &&
              transactionsToShow.length === 0 && (
                <p className="text-sm text-gray-600">
                  Enter a student ID and click &quot;Find Receipt&quot; to view
                  payment history.
                </p>
              )}

            {!isFetchingStudentTransactions &&
              Array.isArray(transactionsToShow) &&
              transactionsToShow.length > 0 && (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="border-b bg-gray-50 text-xs font-medium text-gray-600">
                      <tr>
                        <th className="px-3 py-2">Transaction ID</th>
                        <th className="px-3 py-2">Fee Type</th>
                        <th className="px-3 py-2">Amount</th>
                        <th className="px-3 py-2">Status</th>
                        <th className="px-3 py-2">Date</th>
                        <th className="px-3 py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {transactionsToShow.map((tx: ApiTransaction, index: number) => {
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

                        const receiptUrl = tx.receiptUrl || ((tx.metadata?.zendfi as Record<string, unknown> | undefined)?.receiptUrl as string | undefined);

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
                            <td className="px-3 py-2 text-right">
                              {receiptUrl ? (
                                <button
                                  onClick={() => downloadReceipt(receiptUrl, `receipt_${tx.id || index}.pdf`)}
                                  className="inline-flex items-center gap-1.5 rounded-md bg-[#09283b] px-3 py-1.5 text-xs font-medium text-white hover:bg-opacity-90 transition-colors"
                                >
                                  <Download className="h-3.5 w-3.5" />
                                  Download
                                </button>
                              ) : (
                                <span className="text-xs text-gray-400">N/A</span>
                              )}
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
      <Footer />
    </div>
  );
}

export default function ReceiptsPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#edf5f5]">
        <Loader2 className="h-8 w-8 animate-spin text-[#09283b]" />
      </div>
    }>
      <ReceiptsPageContent />
    </Suspense>
  );
}
