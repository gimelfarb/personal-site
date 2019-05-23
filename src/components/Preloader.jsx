import React, { useEffect } from 'react';
import PreloaderAnimation from './PreloaderAnimation';
import './Preloader.scss';

export default function Preloader() {
    useEffect(() => {
        const delayMs = (process.env.NODE_ENV === 'production') ? 0 : 1000;
        setTimeout(() => {
            document.body.className = document.body.className.replace(/preload\b/, '');
        }, delayMs);
    }, []);
    return (
        <div className="preload-overlay" data-spice-selector=".preload-overlay">
            <PreloaderAnimation />
        </div>
    );
}
