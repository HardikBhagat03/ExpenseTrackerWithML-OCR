import React ,{useState} from "react";
import { useTheme } from "styled-components";
import styled from 'styled-components';
import Button from '../Button/Button';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from "../../context/GlobalContext";
import Chart from "./PChart";

function Predictions(){
    const global =useGlobalContext()
    console.log(global);
    const [isPredictions,setIsPredictions] = useState(false);
    

    return(
    <DashboardStyled>
        <InnerLayout>
            <h3>Revenue and Predictions</h3>
            <Chart />
        </InnerLayout>
    </DashboardStyled>
    )

}
const DashboardStyled = styled.div`
    width="100%"
    height="100%"
    p="1rem"
    overflow="hidden"
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "1rem",
    boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .8)",
    alignItems: "center",
    button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 2.1rem;
                        font-weight: 700;
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 2.1rem;
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 6400;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;
export default Predictions