import { Button, Container, TextField } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardAppartment from '../../Component/Card/Card'
import ComboBox from '../../Component/Select/Select'
import { useTextField } from '../../hooks/hookInput'
import { useComboBoxField } from '../../hooks/selectHook'
import { portitableOrder } from '../../store/partials/culculator/actions'
import './PortitableOrder.css'

export default function PortitableOrder(){
    const totalSquare = useTextField("", 'TotalSqure');
    const roomsCount = useTextField("", 'RoomsCount');
    const floors = useTextField("", 'Floors');
    const districtsName = useComboBoxField('', 'DistrictsName')
    const dispatch = useDispatch();
    const apartmentState = useSelector(state => state.predict)

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            totalSquare: parseInt(totalSquare.value, 10),
            roomsCount: parseInt(roomsCount.value, 10),
            floor: parseInt(floors.value,10),
            districtName: districtsName.value
        }
        console.log(data)
        dispatch(portitableOrder(data));
    }

    return (
        <>
            <h1>Вигідні пропозиції</h1>
            <Container>
            <form className="form" onSubmit={submitHandler}>
                <div className='button-container'>
                <TextField
                            required
                            id="outlined-required"
                            label="Загальна площа"
                            {...totalSquare}
                            variant="outlined"
                            type='number'
                            className='input'
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Кількість кімнат"
                            {...roomsCount}
                            variant="outlined"
                            type='number'
                            className="input"
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Номер етажа"
                            {...floors}
                            variant="outlined"
                            type='number'
                            className='left'
                        />
                        <ComboBox className='combo-box' set={districtsName} label="Назва району" required={true} fetch="districts"/>
                    <Button
                        variant="contained"
                        color="primary"
                        className="button"
                        type="submit"
                        size='large'
                        startIcon={<CloudUpload />}
                    >
                        Upload
                    </Button>
                    
                <h3>Ціна за такі параметри {apartmentState.apartment.price}$</h3>
                </div>
                </form>
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