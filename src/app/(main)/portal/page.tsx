import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FloatingNavWrapper from "@/components/floating-nav-wrapper";
import { CreditCard, Dot, FileText, ReceiptText } from "lucide-react";
import DotSeparator from "@/components/dot-separator";

export default function PortalPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <FloatingNavWrapper initialBg="bg-[#edf5f5]">
                <Navbar />
            </FloatingNavWrapper>

            <header className="bg-[#edf5f5]">
                <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                    <h1 className="text-4xl font-extrabold text-[#09283b]">Parent & Student Portal</h1>
                    <p className="mt-3 max-w-2xl text-sm text-[#12303f]">
                        Access fee payments, check results, and print official receipts from here.
                    </p>
                </div>
            </header>
            <DotSeparator />
            <main className="mx-auto w-full max-w-7xl px-6 py-16">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <article className="rounded-lg border bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-[#eef6f6] p-3 text-[#0b2c4d]">
                                <CreditCard />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-[#09283b]">Fee Payments</h3>
                                <p className="mt-1 text-sm text-gray-600">Make secure payments for school fees and view payment history.</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Link href="/portal/fees" className="inline-block rounded-md bg-[#09283b] px-4 py-2 text-sm font-medium text-white">
                                Go to Payments
                            </Link>
                        </div>
                    </article>

                    <article className="rounded-lg border bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-[#eef6f6] p-3 text-[#0b2c4d]">
                                <FileText />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-[#09283b]">Result Checker</h3>
                                <p className="mt-1 text-sm text-gray-600">Enter student details to view or download exam results.</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Link href="https://fiss.edutams.net/login" className="inline-block rounded-md bg-[#09283b] px-4 py-2 text-sm font-medium text-white">
                                Check Results
                            </Link>
                        </div>
                    </article>

                    <article className="rounded-lg border bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-[#eef6f6] p-3 text-[#0b2c4d]">
                                <ReceiptText />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-[#09283b]">Print Receipts</h3>
                                <p className="mt-1 text-sm text-gray-600">Search and print official payment receipts for record-keeping.</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Link href="/portal/receipts" className="inline-block rounded-md bg-[#09283b] px-4 py-2 text-sm font-medium text-white">
                                Print Receipts
                            </Link>
                        </div>
                    </article>
                </div>
            </main>
            <DotSeparator />
            <Footer />
        </div>
    );
}
