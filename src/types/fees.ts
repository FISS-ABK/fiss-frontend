// Fee Management Types
export interface FeeBreakdownItem {
  description: string;
  amount: number;
}

export interface FeeStructure {
  _id?: string | number;
  feeType: 'School Fee' | 'Hostel Fee' | 'Textbooks & Study Materials' | 'Sport Fee' | string;
  academicSession: string;
  className: string;
  description: string;
  term: '1st Term' | '2nd Term' | '3rd Term';
  breakdown: FeeBreakdownItem[];
  amount: number;
}
