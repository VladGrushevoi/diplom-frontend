import actions from "../actionTypes"
import 'firebase/auth'
import { typeOfOsers } from "./typeUsers"
import axios from "axios"

const signInAction = (data) => {
    console.log(data)
    return {
        type: actions.SIGN_IN,
        payload: data
    }
}

export const SignOut = () => {
    return {
        type: actions.SIGN_OUT,
        payload: {
            email: "",
            password: "",
            status: typeOfOsers.GUEST
        }
    }
}


export const signUpUser = (data, setMessage) => {
    return (dispatch) => {
        axios.post("http://localhost:5000/api/auth/registration", data)
        .then(res => {
            console.log(res.data.value.result)
          setMessage(res.data.value.result.email+", чудови ви зареєстовані!")
        })
        .catch((error) => {
            setMessage("Такий користувач уже є")
        });
    }
}


export const signIn = (data, setMessage, history) => {
    return (dispatch) => {
        axios.post("http://localhost:5000/api/auth/login", data)
            .then((res) => {
                console.log(res.data.value)
                dispatch(signInAction({...res.data.value}))
                history.push("user-cabinet")
            })
            .catch((error) => {
                setMessage("Невірний логін або пароль")
            });
    }
}