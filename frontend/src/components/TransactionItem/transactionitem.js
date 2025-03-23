import React from 'react';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import { rupee, calender, comment } from '../../utils/icons';

function TransactionItem({ title, amount, date, category, description }) {
    return (
        <TransactionItemStyled>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{rupee} {amount}</p>
                        <p>{calender} {dateFormat(date)}</p>
                        <p>
                            {comment} {description}
                        </p>
                    </div>
                </div>
            </div>
        </TransactionItemStyled>
    );
}

const TransactionItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5 {
            font-size: 1.3rem;
        }
        .inner-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p {
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    }
`;

export default TransactionItem;
