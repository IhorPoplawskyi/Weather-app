import React from 'react'
import s from '../styles/Input.module.css'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { setCity } from '../redux/forecastSlice';

function Input() {
    const city = useAppSelector(state => state.forecastSlice.city);
    const dispatch = useAppDispatch();
    return (
        <input
            type='text'
            placeholder="enter city" className={s.input}
            value={city}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { dispatch(setCity(event.target.value)) }}
        />
    )
}

export default Input