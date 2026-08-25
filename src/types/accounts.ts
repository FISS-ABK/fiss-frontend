export interface BankAccount {
  _id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  subAccountCode: string;
}

export interface AccountsResponse {
  success: boolean;
  data: BankAccount[];
}
