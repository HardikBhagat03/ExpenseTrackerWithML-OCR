import React from "react"
import styled from 'styled-components'
import { useEffect, useState } from "react";
import { useGlobalContext } from '../../context/GlobalContext'
import { dateFormat, monthYearFormat , YearFormat} from '../../utils/dateFormat'
//const { Incomes = [], Expenses = [] } = useGlobalContext();
import {Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import {Line, Bubble,Pie} from 'react-chartjs-2'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)


function YChart() {
    const {Incomes, Expenses} = useGlobalContext()

    const data = {
        labels: Incomes.map((inc) =>{
            const {date} = inc
            return YearFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...Incomes.map((income) => {
                        const {amount} = income
                        return amount
                    })
                ],
                backgroundColor: 'green',
                tension: .2
            },
            {
                label: 'Expenses',
                data: [
                    ...Expenses.map((expense) => {
                        const {amount} = expense
                        return amount
                    })
                ],
                backgroundColor: 'red',
                tension: .2
            }
        ]
    }
    return (
        <ChartStyled >
            <Line data={data} />
        </ChartStyled>
    )

}

const ChartStyled = styled.div`
    display:flex;
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 125%;
`;

export default YChart;