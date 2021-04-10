/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/core';
import axios from 'axios';

export default function ComboBox(props) {
    const [districts, setDistricts] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/api/info/districts")
                    .then(res => {
                    console.log(res.data.districts)
                    setDistricts(res.data.districts)
        })
    }, [])
  return (
    <Autocomplete
      id="combo-box-demo"
      options={districts}
      getOptionSelected = {(option, value) => option === value}
      className={props.className}
      {...props.set}
      renderInput={(params) => <TextField {...params} required={props.required} label="Назва району" variant="outlined"/>}
    />
  );
}
