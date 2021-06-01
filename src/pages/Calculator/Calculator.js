import { Button, Container, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import './Calculator.css'
import { CloudUpload } from '@material-ui/icons';
import CardAppartment from '../../Component/Card/Card';
import SelectDistricts from '../../Component/Select/Select'
import { useDispatch, useSelector } from 'react-redux';
import { useTextField } from '../../hooks/hookInput';
import { predictPrice, predictPriceClasificationManual, predictPriceRegressionManual, predictPriceSecond } from '../../store/partials/culculator/actions';
import { useComboBoxField } from '../../hooks/selectHook';
import { typeOfOsers } from '../../store/partials/Auth/typeUsers';
import CircularIndeterminate from '../../Component/Spinner/Spinner';
import SelectMethods from '../../Component/Select/SelectorMethods';
import methods from '../../Component/Select/TypesMethod';


export default function Calculator() {
    const [isDownload, setDownload] = useState(false);
    const dispatch = useDispatch()
    const totalSquare = useTextField("", 'TotalSqure');
    const roomsCount = useTextField("", 'RoomsCount');
    const floors = useTextField("", 'Floors');
    const districtsName = useComboBoxField('', 'DistrictsName')
    const typeMethod = useComboBoxField('', "typeMethod")
    const apartmentState = useSelector(state => state.predict)
    const authState = useSelector(state => state.auth)
    console.log(apartmentState)
    
    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            totalSquare: parseInt(totalSquare.value, 10),
            roomsCount: parseInt(roomsCount.value, 10),
            floor: parseInt(floors.value,10),
            districtName: districtsName.value
        }
        console.log(typeMethod)
        setDownload(true)
        switch(typeMethod.value){
            case methods.REGRESSION_AUTO:
                dispatch(predictPrice(data, setDownload));
                break;
            case methods.REGRESSION_MANUAL:
                dispatch(predictPriceRegressionManual(data, setDownload))
                break;
            case methods.CLASIFICATION_AUTO:
                dispatch(predictPriceSecond(data, setDownload))
                break;
            case methods.CLASIFICATION_MANUAL:
                dispatch(predictPriceClasificationManual(data, setDownload))
                break;
        }
    }

    return (
        <>
            <h1>Калькулятор прогнозу ціни на квартиру</h1>
            <Container maxWidth='sm' className="container">
                <form className="formCalc" onSubmit={submitHandler}>
                    <Container className="child">
                        <TextField
                            required
                            id="outlined-required"
                            label="Загальна площа"
                            value={totalSquare.value}
                            {...totalSquare}
                            variant="outlined"
                            type='number'
                            className='left'
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Кількість кімнат"
                            value={roomsCount.value}
                            {...roomsCount}
                            variant="outlined"
                            type='number'
                            className="right"
                        />
                    </Container>
                    <Container className='child'>
                        <TextField
                            required
                            id="outlined-required"
                            label="Номер етажа"
                            value={floors.value}
                            {...floors}
                            variant="outlined"
                            type='number'
                            className='left'
                        />
                        
                        <SelectDistricts className='right' set={districtsName} required={true} label="Назва району" fetch="districts"/>
                    </Container>
                    <SelectMethods set={typeMethod}/>
                    {
                        isDownload ? <CircularIndeterminate />
                        :
                        <Button
                        variant="contained"
                        color="primary"
                        className="submitButton"
                        type="submit"
                        startIcon={<CloudUpload />}
                        >
                            Зпрогнозувати
                        </Button>
                    }
                    
                </form>
                {
                    isDownload ? null 
                    :
                    <>
                    <h3 className="result-text"><span>Зпрогнозована: </span> ціна за такі параметри {apartmentState.apartment.price}$</h3>
                    </>
                }
            </Container>

            
                <h2>Зхожі варінти за вашим запитом</h2>
                    <div className="parent">
                        {
                            authState.status === typeOfOsers.GUEST ?
                            <h2>Увійдіть в систему, для того щоб побачити</h2>
                            : apartmentState.calculatorList.length !== 0? apartmentState.calculatorList.map((item, index) => {
                                return <CardAppartment key={index} appartment={item}/>
                            })
                            : <h1>ПУСТО</h1>
                        }
                    </div>
        </>
    )
}