import React, { createRef, useEffect } from 'react';
import Spice from 'spice-app-react';

export default function Timeline() {
    const ref = createRef();
    useEffect(() => {
        const el = ref.current;
        const observer = new IntersectionObserver((entries) => {
            for (let i = 0; i < entries.length; ++i) {
                const entry = entries[i];
                if (entry.isIntersecting) {
                    const target = entry.target;
                    observer.unobserve(target);
                    target.classList.add('is-in-viewport');
                }
            }
        }, {
            threshold: 0.75
        });
        const items = el.querySelectorAll('.timeline-item, .timeline-header');
        for (let i = 0; i < items.length; ++i) {
            const target = items[i];
            observer.observe(target);
        }
        el.classList.add('is-animated');
        return () => observer.disconnect();
    }, [ref]);
    return (
        <Spice.Attach selector=".timeline" ref={ref} />
    );
}
