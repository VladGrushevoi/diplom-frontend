import { Button, Container, TextField } from '@material-ui/core'
import React from 'react'
import './Calculator.css'
import { CloudUpload } from '@material-ui/icons';
import CardAppartment from '../../Component/Card/Card';
import SelectDistricts from '../../Component/Select/Select'
import { useDispatch, useSelector } from 'react-redux';
import { useTextField } from '../../hooks/hookInput';
import { predictPrice } from '../../store/partials/culculator/actions';
import { useComboBoxField } from '../../hooks/selectHook';
import { typeOfOsers } from '../../store/partials/Auth/typeUsers';


export default function Calculator() {
    const dispatch = useDispatch()
    const totalSquare = useTextField("", 'TotalSqure');
    const roomsCount = useTextField("", 'RoomsCount');
    const floors = useTextField("", 'Floors');
    const districtsName = useComboBoxField('', 'DistrictsName')
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
        dispatch(predictPrice(data));
        console.log()
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
                        
                        <SelectDistricts className='right' set={districtsName} required={true}/>
                    </Container>
                    <Button
                        variant="contained"
                        color="primary"
                        className="submitButton"
                        type="submit"
                        startIcon={<CloudUpload />}
                    >
                        Зпрогнозувати
                    </Button>
                </form>

                <h3 className="result-text">Ціна за такі параметри {apartmentState.apartment.price}$</h3>
            </Container>

            
                <h2>Зхожі варінти за вашим запитом</h2>
                    <div className="parent">
                        {
                            authState.userType === typeOfOsers.GUEST ?
                            <h2>Увійдіть в систему, для того щоб побачити</h2>
                            : apartmentState.calculatorList.length !== 0? apartmentState.calculatorList.map((item, index) => {
                                return <CardAppartment key={index} appartment={item}/>
                            })
                            : <h1>ПУСТО</h1>
                        }
                        {/* {console.log(apartmentState)}
                        {apartmentState.calculatorList.length !== 0? apartmentState.calculatorList.map((item, index) => {
                            return <CardAppartment key={index} appartment={item}/>
                        })
                        : <h1>ПУСТО</h1>
                    } */}
                    </div>
        </>
    )
}