interface Transaction {
  id: string;
  amount: number;
  balance: number;
  label: string;
  description?: string | null;
  date: string;
}
