"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FloatingNavWrapper from "@/components/floating-nav-wrapper";
import DotSeparator from "@/components/dot-separator";
import { useFees } from "@/hooks/useFees";
import { FeeResponse } from "@/hooks/useFees";
import { PersonalInformation, PaymentStep, PaymentData } from "@/types/payment";
import PaymentSteps from "@/components/widgets/payment-steps";
import PersonalInformationForm from "@/components/widgets/personal-information-form";
import PaymentReview from "@/components/widgets/payment-review";
import PaymentGateway from "@/components/widgets/payment-gateway";
import { FileText } from "lucide-react";

export default function FeesPage() {
    const router = useRouter();
    const { fees, isLoading } = useFees();
    const [currentStep, setCurrentStep] = useState<PaymentStep | null>(null);
    const [selectedFee, setSelectedFee] = useState<FeeResponse | null>(null);
    const [personalInfo, setPersonalInfo] = useState<PersonalInformation | null>(null);

    const safeFees = Array.isArray(fees) ? fees : [];

    const handleProceedToPay = (fee: FeeResponse) => {
        setSelectedFee(fee);
        setCurrentStep("personal");
    };

    const handlePersonalInfoSubmit = (info: PersonalInformation) => {
        setPersonalInfo(info);
        setCurrentStep("review");
    };

    const handleReviewBack = () => {
        setCurrentStep("personal");
    };

    const handleReviewNext = () => {
        setCurrentStep("payment");
    };

    const handlePaymentBack = () => {
        setCurrentStep("review");
    };

    const handlePaymentComplete = () => {
        // Reset state and redirect to receipts
        setCurrentStep(null);
        setSelectedFee(null);
        setPersonalInfo(null);
        router.push("/portal/receipts");
    };

    const handleCancel = () => {
        setCurrentStep(null);
        setSelectedFee(null);
        setPersonalInfo(null);
    };

    // If in payment flow, show payment interface
    if (currentStep && selectedFee) {
        return (
            <div className="flex min-h-screen flex-col">
                <FloatingNavWrapper initialBg="bg-[#edf5f5]">
                    <Navbar />
                </FloatingNavWrapper>

                <header className="bg-[#edf5f5]">
                    <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
                        <h1 className="text-2xl font-extrabold text-[#09283b]">
                            Complete Payment
                        </h1>
                        <p className="mt-2 text-sm text-[#12303f]">
                            Follow the steps below to complete your fee payment
                        </p>
                    </div>
                </header>
                <DotSeparator />
                
                <main className="mx-auto w-full max-w-7xl px-6 py-8 pb-16">
                    <PaymentSteps currentStep={currentStep} />

                    {currentStep === "personal" && (
                        <PersonalInformationForm
                            onNext={handlePersonalInfoSubmit}
                            initialData={personalInfo || undefined}
                            onCancel={handleCancel}
                        />
                    )}

                    {currentStep === "review" && personalInfo && (
                        <PaymentReview
                            data={{ fee: selectedFee, personalInfo }}
                            onBack={handleReviewBack}
                            onNext={handleReviewNext}
                        />
                    )}

                    {currentStep === "payment" && personalInfo && (
                        <PaymentGateway
                            data={{ fee: selectedFee, personalInfo }}
                            onBack={handlePaymentBack}
                            onComplete={handlePaymentComplete}
                        />
                    )}
                </main>
                
                <DotSeparator />
                <Footer />
            </div>
        );
    }

    // Default fee listing page
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
                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#0a1929] border-t-transparent"></div>
                            <p className="mt-4 text-sm text-gray-600">Loading fees...</p>
                        </div>
                    </div>
                )}

                {/* Fees Grid */}
                {!isLoading && safeFees.length > 0 ? (
                    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {safeFees.map((fee) => (
                            <div key={fee.id} className="rounded-lg border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-[#09283b]">{fee.feeType}</h3>
                                        <p className="mt-1 text-sm text-gray-600">{fee.class} - {fee.term}</p>
                                        <p className="mt-1 text-xs text-gray-500">{fee.academicSession}</p>
                                    </div>
                                </div>
                                <div className="mt-4 rounded-md bg-gray-50 p-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700">Total Amount</span>
                                        <span className="text-lg font-semibold text-[#09283b]">
                                            ₦{fee.amount.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        onClick={() => handleProceedToPay(fee)}
                                        className="w-full rounded-md bg-[#09283b] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#09283b]/90"
                                    >
                                        Proceed to Pay
                                    </button>
                                </div>
                            </div>
                        ))}
                    </section>
                ) : !isLoading ? (
                    <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No fees available</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            There are currently no fees configured. Please check back later or contact the school office.
                        </p>
                    </div>
                ) : null}
            </main>
            
            <DotSeparator />
            <Footer />
        </div>
    );
}
