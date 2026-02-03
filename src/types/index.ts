export type AuthUser = {
  id: string;
  name?: string;
  email?: string;
};

export type FeeItem = {
  id?: string;
  name: string;
  amount: number | string;
};

export type Receipt = {
  id: string;
  studentId: string;
  amount: number;
  date: string;
};
