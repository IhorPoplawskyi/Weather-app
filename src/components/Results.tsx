import React from 'react'
import s from '../styles/Results.module.css'

interface props {
    results: {
        name: string
        country: string
        state?: string
        lat: number
        lon: number
    }[]
    selectCity: (lat: number, lon: number) => void
    setVisible: (check: boolean) => void
}

const Results: React.FC<props> = ({ results, selectCity, setVisible }) => {
    const style = [s.resultsBlock]

    return (
        <div tabIndex={1} onBlur={() => setVisible(false)} className={style.join(' ')}>
            {results.map(el =>
                <div key={el.lat}
                    onClick={() => selectCity(el.lat, el.lon)}
                    className={s.resultsBlockItem}>
                    {`${el.name}, ${el.country} ${el.state !== undefined ? el.state : ''}`}
                </div>)}
        </div>
    )
}

export default Results