import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FloatingNavWrapper from "@/components/floating-nav-wrapper";
import DotSeparator from "@/components/dot-separator";

export default function FeesPage() {
    const sampleFees = [
        { name: "Tuition (Term)", amount: "₦150,000" },
        { name: "Examination Fee", amount: "₦12,000" },
        { name: "Sports/Activities", amount: "₦8,000" },
        { name: "Admission Processing", amount: "₦20,000" },
    ];

    return (
        <div className="flex min-h-screen flex-col">
            <FloatingNavWrapper initialBg="bg-[#edf5f5]">
                <Navbar />
            </FloatingNavWrapper>

            <header className="bg-[#edf5f5]">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
                    <h1 className="text-3xl font-extrabold text-[#09283b]">Fee Payments</h1>
                    <p className="mt-3 max-w-2xl text-sm text-[#12303f]">
                        Pay school fees securely online. Choose a fee type below and proceed to payment.
                    </p>
                </div>
            </header>
            <DotSeparator />
            <main className="mx-auto w-full max-w-7xl px-6 pb-16">
                <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {sampleFees.map((f) => (
                        <div key={f.name} className="rounded-lg border bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-[#09283b]">{f.name}</h3>
                                    <p className="mt-1 text-sm text-gray-600">Suggested amount</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-semibold text-gray-900">{f.amount}</div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Link href="#" className="inline-block rounded-md bg-[#09283b] px-4 py-2 text-sm font-medium text-white">
                                    Proceed to Pay
                                </Link>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="mt-10 max-w-3xl rounded-lg border bg-white p-6 shadow-sm">
                    <h4 className="text-sm font-semibold text-[#09283b]">Quick Pay</h4>
                    <p className="mt-2 text-sm text-gray-600">Enter student ID and amount to make a custom payment.</p>
                    <form className="mt-4 grid gap-3 sm:grid-cols-2">
                        <input placeholder="Student ID" className="rounded-md border px-3 py-2 text-sm" />
                        <input placeholder="Amount (₦)" className="rounded-md border px-3 py-2 text-sm" />
                        <div className="sm:col-span-2">
                            <button className="rounded-md bg-[#09283b] px-4 py-2 text-sm font-medium text-white">Pay Now</button>
                        </div>
                    </form>
                </section>
            </main>
            <DotSeparator />
            <Footer />
        </div>
    );
}
