import React, { useState } from 'react'
import Map from './Map';

const EventSelect = ({eventData}) => {
    const [eventToggle, setEventToggle] = useState({wildfire: true, storm: true, volcano: true, iceberg: true});

    const onClick = (event) => {
        let newState = !eventToggle[event];
        setEventToggle({...eventToggle, [event]: newState});
    }

    return (
        <div>
            <ul class="toggle-bar">
                <li><button onClick={() => onClick('wildfire')} className="wildfire-btn">Wildfires</button></li>
                <li><button onClick={() => onClick('storm')} >Storms</button></li>
                <li><button onClick={() => onClick('volcano')} >Volcanos</button></li>
                <li><button onClick={() => onClick('iceberg')} >Icebergs</button></li>
            </ul>
            <Map eventData={eventData} eventToggle={eventToggle} />
        </div>
    )
}

export default EventSelect
