import './App.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';

import React from 'react';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import EmailLink from './components/EmailLink';

export default function App() {
    return (
        <>
            <Preloader />
            <Hero />
            <EmailLink />
            <Timeline />
        </>
    );
}