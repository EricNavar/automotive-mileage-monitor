import React from 'react';
import { dummyResults } from './dummyData';
import './results.css';
import Saul from './assets/saul.png';

type ListItemProps = {
    yearlyFuelCost: number;
    originalMileage: string;
    effectiveMileage: number;
    speed: number;
    make: string;
    model: string;
    year: string;
}

const ListItem = (props: ListItemProps) => {
    return (
        <div className="listItem">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <div style={{backgroundImage:`url(${Saul})`}} className="car-thumbnail"/>
            <div className="info-container">
                <p className="line1">{props.year} {props.make} {props.model}</p>
                <p className="line2">
                    <span className="gray-text">MPG:</span> <span className="mileage">{props.originalMileage}</span> → <span className='real-mileage'>{props.effectiveMileage}</span><span style={{marginLeft:"2rem"}}>
                    <span className="gray-text">Speed: </span>{props.speed} mph</span>
                </p>
                <p className="line3"><span className="gray-text">Yearly fueld cost: </span>${props.yearlyFuelCost}</p>
            </div>
        </div>
    );
};

const Results = () => {
    const meanOriginalMileage = dummyResults.reduce((total, next) => total + Number(next.originalMileage), 0) / dummyResults.length;
    const meanEffectiveMileage = dummyResults.reduce((total, next) => total + next.effectiveMileage, 0) / dummyResults.length;
    const meanSpeed = dummyResults.reduce((total, next) => total + next.speed, 0) / dummyResults.length;
    let meanYearlyFuelCost = dummyResults.reduce((total, next) => total + next.yearlyFuelCost, 0) / dummyResults.length;
    meanYearlyFuelCost = Math.round(meanYearlyFuelCost * 100) / 100; //round to the nearest cent

    return (
        <div className="results">
            <h1>Results</h1>
            <div className="list-container">
                <div className="list">
                    {dummyResults.map((item, index) => <ListItem key={index} {...item}/>)}
                </div>
            </div>
            <div className="total" style={{padding: 8, borderRadius: 8}}>
                <p style={{marginBottom:8, marginTop: 0}}><b>Averages</b></p>
                <p><span className="gray-text">Mileage: </span><span className="mileage">{meanOriginalMileage}</span> → <span className='real-mileage'>{meanEffectiveMileage}</span></p>
                <p><span className="gray-text">Speed: </span>{meanSpeed} mph</p>
                <p><span className="gray-text">Yearly Fuel Cost: </span>${meanYearlyFuelCost}</p>
            </div>
        </div>
    );
}

export {Results};
