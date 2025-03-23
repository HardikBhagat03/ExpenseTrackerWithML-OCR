import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useMemo} from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Orb from './orb/Orb'
import bg from '../img/bg.jpg'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post( 'http://localhost:3001/login', {email, password})
        .then(result => {
            console.log(result);
            if(result.data === "Success"){
                console.log("Login Success");
                alert('Login successful!')
                navigate('/home');
            }
            else{
                alert('Incorrect password! Please try again.');
            }
        })
        .catch(err => console.log(err));
    }
    const OrbMemo = useMemo(()=>{
        return <Orb />
      },[])

    return (
        <div>
            <LoginStyled bg ={bg} className="Login">
            {OrbMemo}
            <Orb />
            <main>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : `url(${props => props.bg})`}}>
                <div className="bg-white p-3 rounded" style={{width : '40%'}}>
                <h1 className="d-flex justify-content-center">Your Expense Partner</h1>
                    <h2 className='mb-3 text-success'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Enter Email"
                                className="form-control" 
                                id="exampleInputEmail1" 
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Login</button>
                    </form>
                    {/* TO add ' appostopee */}
                    <p className='container my-2'>Don&apos;t have an account?</p>
                    <Link to='/register' className="btn btn-danger">Register</Link>
                </div>
            </div>
            </main>
            </LoginStyled>
        </div>
    )
}

const LoginStyled = styled.div`
    height: 100vh;
    background-image:  url(${props => props.bg});
    position: relative;
    main{
        flex: 1;
        background: rgba(0, 0, 0, 0.78);
        backdrop-filter: blur(4.5px);
        border-radius: 12px;
        overflow-x: hidden;
        &::-webkit-scrollbar{
        width: 0;
    }
    
  }
`;
export default Login