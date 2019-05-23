import React from 'react';
import './HeroBackgrounds.scss';

export default function HeroBackgrounds(props) {
    const images = (props.images || []);
    const nextIdx = props.idx || 0;
    const lastIdx = (nextIdx - 1 + images.length) % images.length;
            
    const bgs = images.map((url, idx) => {
        const className = (idx === nextIdx) 
        ? 'visible top'
        : (idx === lastIdx)
            ? 'visible'
            : null;

        return <div 
            key={url}
            className={className} 
            style={{ 
                backgroundImage: `url(${url})`, 
                backgroundPosition: 'center'
            }}
        />;
    });

    return (
        <div id="bg">
            {bgs}
        </div>
    );
}