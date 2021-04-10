// import axios from "axios";
import actions from "../actionTypes"


const initState = {
    apartment : {
        totalSquare: 0,
        roomsCount: 0,
        floors: 0,
        districtName: '',
        price: 0,
    },
    calculatorList: [],
    portitableList: [],
    catalogList:[],
    catalog: []
}

export const predictPrice = (state = initState, action) => {
    switch(action.type){
        case actions.PREDICT_PRICE:
            console.log(action.payload)
            return {
                ...state,
                apartment: action.payload.prediction,
                calculatorList: action.payload.calculatorList
            }
        case actions.PORTITABLE_ORDERS:
            return {
                ...state,
                apartment: action.payload.prediction,
                portitableList: action.payload.portitableList
            }
        case actions.USE_CATALOG:
            return {
                ...state,
                apartment: state.apartment,
                catalogList: action.payload.catalogList,
                catalog: action.payload.catalog
            }
        case actions.TWENTY_ORDERS: {
            console.log(action.payload)
            return {
                ...state,
                catalog: action.payload
            }
        }
        default: 
            return state;
    }
}
