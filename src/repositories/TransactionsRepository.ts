import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const { income, outcome } = transactions.reduce(
      (acumulator, transaction) => {
        switch (transaction.type) {
          case 'income':
            acumulator.income += Number(transaction.value);
            break;
          case 'outcome':
            acumulator.outcome += Number(transaction.value);
            break;
          default:
            break;
        }

        return acumulator;
      },
      {
        outcome: 0,
        income: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { total, income, outcome };
  }
}

export default TransactionsRepository;
