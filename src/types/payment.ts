import { FeeResponse } from "@/hooks/useFees";

export interface PersonalInformation {
  fullName: string;
  studentId: string;
  email: string;
  contact: string;
  feeType: string;
  term: string;
  academicSession: string;
  className: string;
  amount: number;
}

export interface PaymentData {
  fee: FeeResponse;
  personalInfo: PersonalInformation;
}

export type PaymentStep = 'personal' | 'review' | 'payment';
