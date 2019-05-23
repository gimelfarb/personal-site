import React from 'react';
import './PreloaderAnimation.scss';

export default function PreloaderAnimation() {
    // Borrowed from: https://tobiasahlin.com/spinkit/
    return (
        <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div>
    );
}