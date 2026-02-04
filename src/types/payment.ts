import { FeeResponse } from "@/hooks/useFees";

export interface PersonalInformation {
  fullName: string;
  studentId: string;
  email: string;
  contact: string;
}

export interface PaymentData {
  fee: FeeResponse;
  personalInfo: PersonalInformation;
}

export type PaymentStep = 'personal' | 'review' | 'payment';
