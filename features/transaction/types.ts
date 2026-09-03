export type TransactionResponse = {
  id: number;
  accountId: string;
  occurredAt: string;
  type: string;
  description: string;
  amount: number;
};

export type TransactionPageResponse = {
  items: TransactionResponse[];
  page: number;
  size: number;
  totalCount: number;
};