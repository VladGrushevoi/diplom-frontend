import { Button, Container, TextField } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardAppartment from '../../Component/Card/Card'
import ComboBox from '../../Component/Select/Select'
import SelectMethods from '../../Component/Select/SelectorMethods'
import methods from '../../Component/Select/TypesMethod'
import CircularIndeterminate from '../../Component/Spinner/Spinner'
import { useTextField } from '../../hooks/hookInput'
import { useComboBoxField } from '../../hooks/selectHook'
import { portitableOrder } from '../../store/partials/culculator/actions'
import './PortitableOrder.css'

export default function PortitableOrder(){
    // const totalSquare = useTextField("", 'TotalSqure');
    // const roomsCount = useTextField("", 'RoomsCount');
    // const floors = useTextField("", 'Floors');
    // const districtsName = useComboBoxField('', 'DistrictsName')
    // const dispatch = useDispatch();
    // const apartmentState = useSelector(state => state.predict)

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     const data = {
    //         totalSquare: parseInt(totalSquare.value, 10),
    //         roomsCount: parseInt(roomsCount.value, 10),
    //         floor: parseInt(floors.value,10),
    //         districtName: districtsName.value
    //     }
    //     console.log(data)
    //     dispatch(portitableOrder(data));
    // }

    const [isDownload, setDownload] = useState(false);
    const dispatch = useDispatch()
    const totalSquare = useTextField("", 'TotalSqure');
    const roomsCount = useTextField("", 'RoomsCount');
    const floors = useTextField("", 'Floors');
    const districtsName = useComboBoxField('', 'DistrictsName')
    const typeMethod = useComboBoxField('', "typeMethod")
    const apartmentState = useSelector(state => state.predict)
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
                dispatch(portitableOrder(data, 1, setDownload));
                break;
            case methods.REGRESSION_MANUAL:
                dispatch(portitableOrder(data, 2, setDownload));
                break;
            case methods.CLASIFICATION_AUTO:
                dispatch(portitableOrder(data, 3, setDownload));
                break;
            case methods.CLASIFICATION_MANUAL:
                dispatch(portitableOrder(data, 4, setDownload));
                break;
            default:
                break;
        }
    }

    return (
        <>
            <h1>Вигідні пропозиції</h1>
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
                        
                        <ComboBox className='right' set={districtsName} required={true} label="Назва району" fetch="districts"/>
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

            <h2>Вигідні варіанти</h2>
            <div className='parent'>
            {apartmentState.portitableList.map((item, index) => {
                            return <CardAppartment key={index} appartment={item}/>
                        })
                    }
            </div>
        </>
    )
}