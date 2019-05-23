import React from 'react';
import Typewriter from './Typewriter';

export default function HeroFacets(props) {
    const facets = (props.facets || []).map(s => s + '.');
    const beforeString = (str, idx) => {
        const onFacetChange = props.onFacetChange;
        onFacetChange && onFacetChange(str, idx);
    }
    return (
        <p data-spice-selector=".facet">
            {''}
            <Typewriter 
                strings={facets} 
                breakLines={false}
                loop={true}
                speed={150}
                nextStringDelay={[5000, 1000]}
                beforeString={beforeString}
            />
        </p>
    );
}
