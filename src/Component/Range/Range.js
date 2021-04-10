import React from 'react'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


function valuetext(value) {
    return `${value}°C`;
}

export default function Range(props) {
    return (
        <>
            <div className={props.className}>
                <Typography id="range-slider" gutterBottom>
                    {props.text}
                </Typography>
                <Slider
                    value={props.set.value}
                    onChange={props.set.onChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={props.min}
                    max={props.max}
                />
            </div>
        </>
    )
}