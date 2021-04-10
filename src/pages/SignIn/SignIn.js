import { Button, Container, TextField } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useTextField } from '../../hooks/hookInput';
import { signIn } from '../../store/partials/Auth/actions';
import './SignIn.css'

export default function SignIn(){
    const [message, setMessage] = useState("")
    const loginEmail= useTextField("", "LoginEmail")
    const loginPpassword = useTextField("", "LoginPassword")
    const dispatch = useDispatch();
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("ало?")
        const data = {
            email: loginEmail.value,
            password: loginPpassword.value,
        }
        dispatch(signIn(data, setMessage, history))
    }

    return (
        <>
            <h1 className="title">Авторизація</h1>
            <Container maxWidth='sm' className="container">
                <form className="form-signIn" onSubmit={handleSubmit}>
                    <TextField
                        required
                        id="1"
                        type='email'
                        label="Enter the email"
                        variant="outlined"
                        fullWidth
                        className="inputSignIn"
                        {...loginEmail}
                    />
                    <TextField
                        required
                        type='password'
                        id="2"
                        label="Enter the password"
                        variant="outlined"
                        fullWidth
                        className="inputSignIn"
                        {...loginPpassword}
                    />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submitButton"
                            type="submit"
                            startIcon={<CloudUpload />}
                            style={{marginTop:'2%'}}
                        >
                            Авторизуватися
                    </Button>
                    <p>{message}</p>
                </form>
            </Container>
        </>
    )
}