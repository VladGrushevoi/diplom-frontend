import axios from "axios"
import actions from "../actionTypes"


const predictPriceAction = (data, setDownload) => {
    setDownload(false)
    return {
        type: actions.PREDICT_PRICE,
        payload: data,
    }
}
// const predictPriceSecondAction = (data, setDownload) => {
//     setDownload(false);
//     console.log(data)
//     return {
//         type: actions.PREDICT_PRICE_SECOND,
//         payload: data,
//     }
// }

const portitableOrders = (data, setDownload) => {
    setDownload(false);
    return {
        type: actions.PORTITABLE_ORDERS,
        payload: data
    }
}
const catalogOrders = (data) => {
    return {
        type: actions.USE_CATALOG,
        payload: data
    }
}

const twentyOrder = (data) => {
    return {
        type: actions.TWENTY_ORDERS,
        payload: data
    }
}

export const predictPrice = (data, setDownload) => {
    return async (dispatch) => {
        await axios.post(`http://localhost:5000/api/admin/predict`,data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            const prediction = res.data.value.prediction
            const simApps = res.data.value.similarAppartments
            let similarAppartments = setSimilarList(simApps)
            Promise.all(similarAppartments).then((values) => {dispatch(predictPriceAction({prediction,calculatorList: values}, setDownload))})
        })
    }
}

export const predictPriceSecond = (data, setDownload) => {
    return async (dispatch) => {
        await axios.post(`http://localhost:5000/api/admin/clasification-predict`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    const prediction = res.data.value.prediction
                    const simApps = res.data.value.similarAppartments
                    let similarAppartments = setSimilarList(simApps)
                    Promise.all(similarAppartments).then((values) => {dispatch(predictPriceAction({prediction,calculatorList: values}, setDownload))})
                })
    }
}

export const predictPriceRegressionManual = (data, setDownload) => {
    return async (dispatch) => {
        await axios.post(`http://localhost:5000/api/admin/custom`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    const prediction = res.data.value.prediction
                    const simApps = res.data.value.similarAppartments
                    let similarAppartments = setSimilarList(simApps)
                    Promise.all(similarAppartments).then((values) => {dispatch(predictPriceAction({prediction,calculatorList: values}, setDownload))})
                })
    }
}
export const predictPriceClasificationManual = (data, setDownload) => {
    return async (dispatch) => {
        await axios.post(`http://localhost:5000/api/admin/custom-clasification`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    const prediction = res.data.value.prediction
                    const simApps = res.data.value.similarAppartments
                    let similarAppartments = setSimilarList(simApps)
                    Promise.all(similarAppartments).then((values) => {dispatch(predictPriceAction({prediction,calculatorList: values}, setDownload))})
                })
    }
}

export const portitableOrder = (data, typeMethod, setDownload) => {
    return (dispatch) => {
        console.log(typeMethod)
        axios.post(`http://localhost:5000/api/rieltor/get-portitable-orders/${typeMethod}`,data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res.data.value)
            const prediction = res.data.value.prediction
            const simApps = res.data.value.similarAppartments
            let similarAppartments = setSimilarList(simApps)
            Promise.all(similarAppartments).then((values) => {dispatch(portitableOrders({prediction,portitableList: values}, setDownload))})
        })
    }
}

export const catalogOrder = (data) => {
    return (dispatch) => {
        axios.post(`http://localhost:5000/api/search/apartments`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            const simApps = res.data.appartments
            const catalogPromise =  getTwentyOrders(simApps, 1);
            Promise.all(catalogPromise).then((values) => {
                dispatch(catalogOrders({catalogList: simApps, catalog: values}))
            });
        })
    }
}

export const formTwentyOrders = (data) => {
    return (dispatch) => {
        Promise.all(data).then((values) => {dispatch(twentyOrder(values))}) 
    }
}

export const getTwentyOrders = (data, index) => {
    if(data.length <= 20){
        return setSimilarList(data)
    }
    if(index * 20 > data.length){
        const tempOrders = [];
        for(let i = (index - 1) * 20; i < data.length; i++){
            tempOrders.push(data[i])
        }
        return setSimilarList(tempOrders)
    }
    const tempTwentyOrders = []
    for(let i = (index - 1) * 20; i < index*20; i++){
        tempTwentyOrders.push(data[i])
    }
    return setSimilarList(tempTwentyOrders)
}   

const setSimilarList = (apps) => {
    return apps.map(async (item) => {
        return await axios.get(`https://developers.ria.com/dom/info/${item.idFromApi}?api_key=6fkeFdHbE2uRhnTxkyUIbNhvkdAAuIJmevrxaYWu`)
            .then(res => {
                return res.data
            })
    })
}