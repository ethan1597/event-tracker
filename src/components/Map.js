import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationInfoBox from './LocationInfoBox'
import fireIcon from '@iconify/icons-mdi/pine-tree-fire'
import stormIcon from '@iconify/icons-mdi/weather-lightning-rainy'
import volcanoIcon from '@iconify/icons-mdi/fire-alert'
import icebergIcon from '@iconify/icons-mdi/snowflake'

const Map = ({ eventData, center, zoom }) => {
    const [locationInfo, setLocationInfo] = useState(null)

    const markers = eventData.map(ev => {
        if (ev.categories[0].id === 8) {
            return <LocationMarker lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} 
                onClick={() => setLocationInfo({ id: ev.id, title: ev.title})} locationIcon={fireIcon} eventType="wildfire" />
        }else if(ev.categories[0].id === 10){
            const stormMarkers = ev.geometries.map(point => {
                return <LocationMarker lat={point.coordinates[1]} lng={point.coordinates[0]} 
                onClick={() => setLocationInfo({ id: ev.id, title: ev.title})} locationIcon={stormIcon} eventType="storm" />
            })
            return stormMarkers;
        }else if(ev.categories[0].id === 12){
            if(ev.title === 'Dukono Volcano, Indonesia'){ /*NASA accidentally formated this one incorrectly and it causes a bug*/
                return null;
            }
            return <LocationMarker lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} 
                onClick={() => setLocationInfo({ id: ev.id, title: ev.title})} locationIcon={volcanoIcon} eventType="volcano" />
        }else if(ev.categories[0].id === 15){
            return <LocationMarker lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} 
                onClick={() => setLocationInfo({ id: ev.id, title: ev.title})} locationIcon={icebergIcon} eventType="iceberg" />
        }
        return null;
    })

    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: '' }} /* Add google API key here between quotes */
                defaultCenter={center}
                defaultZoom={zoom}
            >
                {markers}
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info={locationInfo}/>}
        </div>
    )
}

Map.defaultProps = {
    center: {
        lat: 42.3265,
        lng: -122.8756
    },
    zoom: 6
}

export default Map
