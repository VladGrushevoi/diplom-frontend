import { Button, Container } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CircularIndeterminate from '../../Component/Spinner/Spinner'
import './RootSetting.css'

export default function RootSetting(){

    const [information, setInformation] = useState({
        accurate: 0,
        errorModel: 0,
        appartmentCount: 550,
        isLoading: false,
        deleted: 0
    })

    const handleUpdateAppartment = () => {
        setInformation(i => i.isLoading = true);
        axios.delete("http://localhost:5000/api/admin/delete-apartments")
        .then((res) => {
            setInformation({
                ...information,
                deleted: res.data.countDeleted
            })
            axios.get('http://localhost:5000/api/admin/update-appartments')
            .then((res) => {
                setInformation({
                    ...information,
                    appartmentCount: res.data.amount,
                    isLoading: false
                })
            });
        })
    }
    const handleUpdateModel = () => {
        axios.post('http://localhost:5000/api/admin/train-model')
        .then(res => {
            alert(res.data.result)
        })
    }
    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/model-parameters')
        .then((res) => {
            setInformation({
                ...information,
                accurate: res.data.accurate.toFixed(2),
                errorModel: res.data.error.toFixed(2),
                appartmentCount: res.data.countApps
            })
        });
    }, [])
    return (
        <>
            <h1>Настойка системи</h1>
            <Container className="container-setting">
                <h2>Інформація про модель</h2>
                <p>Точність моделі {information.accurate} &gt; 0.5. Модель має високу точність</p>
                <p>Похибка моделі {information.errorModel}</p>
            </Container>
            <Container className="container-setting">
                <h2>Керування даними</h2>
                <p>Кількість квартир {information.appartmentCount} штук</p>
                {
                    information.isLoading? <CircularIndeterminate />
                    :
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                className="button"
                                onClick={handleUpdateAppartment}
                                size='large'
                                startIcon={<CloudUpload />}
                            >
                                Оновити базу даних квартир
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUpdateModel}
                                className="button"
                                size='large'
                                startIcon={<CloudUpload />}
                            >
                                Оновити регресійну модель
                            </Button>
                        </>
                }
            </Container>
        </>
    )
}