import s from '../styles/Input.module.css'

import { FC, useRef, useEffect } from 'react'

import { setCity } from '../redux/forecastSlice';
import { useAppDispatch, useAppSelector } from '../redux/store'

interface IInput {
    setInputRef: (ref: any) => void
}

export const Input: FC<IInput> = ({ setInputRef }): JSX.Element => {
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