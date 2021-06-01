import { Autocomplete, TextField } from '@material-ui/core'
import React from 'react'
import methods from './TypesMethod'
import './Select.css'

export default function SelectMethods(props) {
    const method = [
        methods.REGRESSION_AUTO,
        methods.REGRESSION_MANUAL,
        methods.CLASIFICATION_AUTO,
        methods.CLASIFICATION_MANUAL
    ]


    return (
        <Autocomplete
            id="combo-box-demo"
            options={method}
            getOptionSelected={(option, value) => option === value}
            className="combo-box-w"
            {...props.set}
            renderInput={(params) => <TextField {...params} required label="Виберіть метод" variant="outlined" />}
        />
    )
}