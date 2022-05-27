import React from "react";
import './WeatherForm.css'

const WeatherResult = props => {
    return (
        <>
        <h1 className="form-title">Aktualna pogoda</h1>
        <form className="form">
            <input 
            className='form-input'
            onChange={props.onChange}
            placeholder="Wpisz miasto..."
            type="text" 
            value={props.value}
            />
        </form>
        </>
    )
}

export default WeatherResult;