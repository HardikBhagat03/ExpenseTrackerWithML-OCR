import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000//api/v1/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                console.log('User registered successfully');
            } else {
                console.log(data.message);
            }
        } catch (err) {
            console.log('Error signing up:', err);
        }
    };

    return (
        <SignupStyled>
        <form onSubmit={handleSignup}>
            <div className='input-control'>
            <h2>Signup</h2>
            <br></br>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            </div>
            <br></br>
            <div className='input-control'>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            </div>
            <br></br>  
            <div className='input-control'>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            </div>
            <br></br>
            <div className='submit-btn'></div>
            <Button name={'Signup'}
                    bPad={'.8rem 1.6rem'}
                    color={'var(--color-green)'}
                    bRad={'30px'}
                    box-shadow={'0px 1px 15px rgba(0, 0, 0, 0.06)'}
                    >
            </Button>
            
        </form>
        </SignupStyled>
    );
};

const SignupStyled = styled.form`
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
                background: var(--color-green) !important;
            }
        }
    }
`;

export default Signup;
