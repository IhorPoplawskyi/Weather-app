import React, { useRef, useEffect } from 'react'
import s from '../styles/Input.module.css'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { setCity } from '../redux/forecastSlice';

interface IInput {
    setInputRef: (ref: any) => void
}

const Input: React.FC<IInput> = ({ setInputRef }) => {
    const city = useAppSelector(state => state.forecastSlice.city);
    const dispatch = useAppDispatch();
    const inputRef = useRef(null);
    useEffect(() => {
        setInputRef(inputRef.current);
    }, [])

    return (
        <input
            ref={inputRef}
            type='text'
            placeholder="enter city" className={s.input}
            value={city}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { dispatch(setCity(event.target.value)) }}
        />
    )
}

export default Input