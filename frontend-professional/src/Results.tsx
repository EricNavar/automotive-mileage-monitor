import React from 'react';
import { dummyResults } from './dummyData';
import './results.css';
import {Loading} from './Loading';

type ListItemProps = {
    yearlyFuelCost: number;
    originalMileage: string;
    effectiveMileage: number;
    speed: number;
    make: string;
    model: string;
    year: string;
    image: string;
}

const ListItem = (props: ListItemProps) => {
    console.log(props);
    return (
        <div className="listItem">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <div style={{backgroundImage:`url("${props.image}")`}} className="car-thumbnail"/>
            <div className="info-container">
                <p className="line1">{props.year} {props.make} {props.model}</p>
                <p className="line2">
                    <span className="gray-text">MPG:</span> <span className="mileage">{props.originalMileage}</span> → <span className='real-mileage'>{props.effectiveMileage}</span><span style={{marginLeft:"2rem"}}>
                    <span className="gray-text">Speed: </span>{props.speed} mph</span>
                </p>
                <p className="line3"><span className="gray-text">Yearly fuel cost: </span>${props.yearlyFuelCost}</p>
            </div>
        </div>
    );
};

const Results = () => {
    const meanOriginalMileage = dummyResults.reduce((total, next) => total + Number(next.originalMileage), 0) / dummyResults.length;
    let meanEffectiveMileage = dummyResults.reduce((total, next) => total + next.effectiveMileage, 0) / dummyResults.length;
    meanEffectiveMileage = Math.round(meanEffectiveMileage * 10000) / 10000;
    const meanSpeed = dummyResults.reduce((total, next) => total + next.speed, 0) / dummyResults.length;
    let meanYearlyFuelCost = dummyResults.reduce((total, next) => total + next.yearlyFuelCost, 0) / dummyResults.length;
    meanYearlyFuelCost = Math.round(meanYearlyFuelCost * 100) / 100; //round to the nearest cent

    const [timeLeft, setTimeLeft] = React.useState<number|null>(5);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if(timeLeft===0){
            console.log("TIME LEFT IS 0");
            setTimeLeft(null);
            setLoading(false);
        }
    
        // exit early when we reach 0
        if (!timeLeft) return;
    
        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
    
          setTimeLeft(timeLeft - 1);
        }, 1000);
    
        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
    }, [timeLeft]);

    if (loading) {
        return <Loading />;
    }

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
