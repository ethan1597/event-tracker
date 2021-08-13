import { Icon } from '@iconify/react'

const LocationMarker = ({ lat, lng, onClick, locationIcon, eventType }) => {
    return (
        <div className="location-marker" onClick={onClick}>
            <Icon icon={locationIcon} className={eventType} />
        </div>
    )
}

export default LocationMarker
