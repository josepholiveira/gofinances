import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';
import { Container, CardContainer, Card, TableContainer } from './styles';

import formatValue from '../../utils/formatValue';

interface Transactions {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  const [balance, setBalance] = useState<Balance>(Object);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/transactions');

      const transactiosFormatted = response.data.transactions.map(
        (transaction: Transactions) => ({
          ...transaction,
          formattedValue: formatValue(transaction.value),
          formattedDate: new Date(transaction.created_at).toLocaleDateString(
            'pt-br',
          ),
        }),
      );

      setTransactions(transactiosFormatted);

      const balanceFormatted = {
        income: formatValue(response.data.balance.income),
        outcome: formatValue(response.data.balance.outcome),
        total: formatValue(response.data.balance.total),
      };

      setBalance(balanceFormatted);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1>{balance?.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1>{balance?.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1>{balance?.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <tr>
              <th>Título</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Data</th>
            </tr>

            {transactions.map((transaction) => (
              <tr>
                <td className="title">{transaction.title}</td>
                <td className={transaction.type}>
                  {transaction?.formattedValue}
                </td>
                <td>{transaction.category.title}</td>
                <td>{transaction.formattedDate}</td>
              </tr>
            ))}
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
