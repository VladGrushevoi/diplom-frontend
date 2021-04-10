import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTextField } from '../../hooks/hookInput'
import { signUpAdmin, signUpRieltor, signUpUser } from '../../store/partials/Auth/actions'
import { typeOfOsers } from '../../store/partials/Auth/typeUsers'
import './SignUp.css'

export default function SignUp(){
    const [message, setMessage] = useState("");
    const chooseUser = useTextField("Користувач", "typeUser")
    const email= useTextField("", "email")
    const password = useTextField("", "password")
    const passwordRepeat = useTextField("", "password")
    const dispatch = useDispatch();
    // const auth = useSelector(state => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password.value !== passwordRepeat.value)
        {
            setMessage("Паролі не однакові".toUpperCase());
        }else{
            const data = {
                email: email.value,
                password: password.value,
                type: chooseUser.value
            }
            console.log(data);
            switch(chooseUser.value){
                case typeOfOsers.USER:
                    dispatch(signUpUser(data, setMessage))
                    break;
                case typeOfOsers.RIELTOR:
                    dispatch(signUpRieltor(data, setMessage))
                    break;
                case typeOfOsers.ADMIN:
                    dispatch(signUpAdmin(data, setMessage))
                    break;
                default:
                    dispatch(signUpUser(data, setMessage))
            }
        }
    }

    return (
        <>
            <h1 className="title">Реєстрація</h1>
            <Container maxWidth='sm' className="container">
                <form className="form-signUp" onSubmit={handleSubmit}>
                    <TextField
                        required
                        id="outlined-required"
                        type='email'
                        label="Enter the email"
                        variant="outlined"
                        fullWidth
                        className="inputSignUp"
                        {...email}
                    />
                    <TextField
                        required
                        type='password'
                        id="outlined-required"
                        label="Enter the password"
                        variant="outlined"
                        fullWidth
                        className="inputSignUp"
                        {...password}
                    />
                    <TextField
                        required
                        type="password"
                        id="outlined-required"
                        label="Repeat password"
                        variant="outlined"
                        fullWidth
                        className="inputSignUp"
                        {...passwordRepeat}
                    />
                    <FormControl component="fieldset" style={{marginTop: '2%'}} fullWidth>
                        <FormLabel component="legend" >Тип користувача</FormLabel>
                        <RadioGroup aria-label="gender" {...chooseUser}>
                            <FormControlLabel value="Користувач" control={<Radio />} label="Користувач" />
                            <FormControlLabel value="Рієлтор" control={<Radio />} label="Рієлтор" />
                            <FormControlLabel value="Адміністратор" control={<Radio />} label="Адміністратор" />
                        </RadioGroup>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submitButton"
                            type="submit"
                            startIcon={<CloudUpload />}
                            style={{marginTop:'2%'}}
                        >
                            Зареєструватися
                    </Button>
                    </FormControl>
                    <p>{message}</p>
                </form>
            </Container>
        </>
    )
}