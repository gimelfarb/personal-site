import React, { useState } from 'react';
import HeroFacets from './HeroFacets';
import facets from '../data/facets';
import HeroBackgrounds from './HeroBackgrounds';

const facetStrings = facets.map(f => f[0]);
const facetBackgrounds = facets.map(f => f[1]);

export default function Hero() {
    const [facetIdx, setFacetIdx] = useState(0);
    const onFacetChange = (_str, idx) => setFacetIdx(idx);
    return (
        <section data-spice-selector="section.hero">
            <HeroFacets facets={facetStrings} onFacetChange={onFacetChange} />
            <HeroBackgrounds images={facetBackgrounds} idx={facetIdx} />
        </section>
    );
}