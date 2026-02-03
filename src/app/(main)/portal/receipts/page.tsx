import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FloatingNavWrapper from "@/components/floating-nav-wrapper";
import { Dot } from "lucide-react";
import DotSeparator from "@/components/dot-separator";

export default function ReceiptsPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <FloatingNavWrapper initialBg="bg-[#edf5f5]">
                <Navbar />
            </FloatingNavWrapper>

            <header className="bg-[#edf5f5]">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
                    <h1 className="text-3xl font-extrabold text-[#09283b]">Print Receipts</h1>
                    <p className="mt-3 max-w-2xl text-sm text-[#12303f]">
                        Search for payment receipts and print official copies for record-keeping.
                    </p>
                </div>
            </header>
            <DotSeparator />
            <main className="mx-auto w-full max-w-3xl px-6 py-12">
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <label className="text-sm font-medium text-gray-700">Search by Transaction ID or Student ID</label>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <input placeholder="Transaction ID or Student ID" className="w-full rounded-md border px-3 py-2 text-sm" />
                        <button className="rounded-md bg-[#09283b] px-4 py-2 text-sm font-medium text-white">Find Receipt</button>
                    </div>

                    <div className="mt-6 text-sm text-gray-600">No backend connected yet — this will search receipts once integrated.</div>
                </div>
            </main>
            {/* <DotSeparator /> */}
            <Footer />
        </div>
    );
}
