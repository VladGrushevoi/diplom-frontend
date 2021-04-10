import actions from "../actionTypes"
import { appAuthAdmin, appAuthRieltor, appAuthUser } from '../../../firebase/config'
import 'firebase/auth'
import { typeOfOsers } from "./typeUsers"

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
            userType: typeOfOsers.GUEST
        }
    }
}

// const signUpAction = (data) => {
//     return {
//         type: actions.SIGN_UP,
//         payload: data
//     }
// }


export const signUpUser = (data, setMessage) => {
    return (dispatch) => {
        appAuthUser.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
          setMessage(data.email+", чудови ви зареєстовані!")
        })
        .catch((error) => {
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
            setMessage(error.message)
        });
    }
}
export const signUpRieltor = (data, setMessage) => {
    return (dispatch) => {
        appAuthRieltor.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
            setMessage(data.email+", чудови ви зареєстовані!")
        })
        .catch((error) => {
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
            setMessage(error.message)
        });
    }
}
export const signUpAdmin = (data, setMessage) => {
    return (dispatch) => {
        appAuthAdmin.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
            setMessage(data.email+", чудови ви зареєстовані!")
        })
        .catch((error) => {
            setMessage(error.message)
        });
    }
}

export const signIn = (data, setMessage, history) => {
    return (dispatch) => {
        appAuthUser.auth().signInWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                dispatch(signInAction({...data, userType: typeOfOsers.USER}))
                history.push("user-cabinet")
            })
            .catch((error) => {
                setMessage(error.message)
                appAuthRieltor.auth().signInWithEmailAndPassword(data.email, data.password)
                    .then((userCredential) => {
                        dispatch(signInAction({...data, userType: typeOfOsers.RIELTOR}))
                        history.push("user-cabinet")
                    })
                    .catch((error) => {
                        setMessage(error.message)
                        appAuthAdmin.auth().signInWithEmailAndPassword(data.email, data.password)
                            .then((userCredential) => {
                                dispatch(signInAction({...data, userType: typeOfOsers.ADMIN}))
                                history.push("user-cabinet")
                            })
                            .catch((error) => {
                                setMessage(error.message)
                            });
                    });
            });
    }
}