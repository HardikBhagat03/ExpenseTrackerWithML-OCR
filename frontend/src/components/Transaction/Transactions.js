import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/GlobalContext';
import TransactionItem from '../TransactionItem/transactionitem';
import Chart from '../Transaction/Chart';
import YChart from '../Transaction/YChart';
import WChart from '../Transaction/WChart';


function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [interval, setInterval] = useState('weekly');
    return (
        <TransactionsStyled>
            <InnerLayout>
            <h2>Transactions -Weekly</h2>
            <div className='interval-buttons'>
                    <br></br>
                    <WChart/>
            </div>
            <h2>Transactions -Monthly</h2>
            <div className='interval-buttons'>                    
                    <Chart/><br></br>
            </div>
            <h2>Transactions -Yearly</h2>
            <div className='interval-buttons'>
                    <YChart/>
            </div>
                
                <div className="transactions-list">
                    {transactions.map((transaction) => (
                        <TransactionItem key={transaction._id} {...transaction} />
                    ))}
                </div>
            </InnerLayout>
        </TransactionsStyled>
    );
}

const TransactionsStyled = styled.div`
    .interval-buttons {
        display: flex;
        flex-direction: right;
        gap: 1rem;
        margin-bottom: 2rem;
        button {
            padding: 0.5rem 1rem;
            background: var(--primary-color);
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
                background: var(--color-green);
            }
        }
    }

    .transactions-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`;

export default Transactions;
