import React from 'react'
import './Preloader.css'

export const Preloader: React.FC = () => {
    return (
        <div className="wrapper">
            <div className="lds-hourglass"></div>
        </div>
    )
}
