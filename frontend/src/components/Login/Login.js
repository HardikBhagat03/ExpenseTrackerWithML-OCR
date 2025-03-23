import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import { MainLayout } from "../../styles/Layouts";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/v1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                console.log('Logged in successfully');
            } else {
                console.log(data.message);
            }
        } catch (err) {
            console.log('Error logging in:', err);
        }
    };

    return (
        <MainLayout>
        <LoginStyled>
        <div>
        <h2>Add Incomes</h2>
        
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <br></br>
            <div className="input-control">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            </div>
            <br></br>
            <div className="input-control">
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            </div>
            <br></br>
            <div className="submit-btn">
            <Button name={'Login'}
                    bPad={'.8rem 1.6rem'}
                    color={'var(--color-green)'}
                    bRad={'30px'}
                    box-shadow={'0px 1px 15px rgba(0, 0, 0, 0.06)'}
                    >
            </Button>
            </div>
        </form>
        </div>
        </LoginStyled>
        </MainLayout>
    );
};

const LoginStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) ;
            }
        }
    }
`;

export default Login;