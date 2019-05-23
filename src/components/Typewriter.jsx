import React, { useRef, useEffect } from 'react';
import TypeIt from 'typeit';

export default function Typewriter(props) {
    const ref = useRef();
    useEffect(() => {
        const el = ref.current;
        const {beforeString, strings, ...typeitProps} = props;
        let idx = 0;
        const typeit = new TypeIt(el, {
            beforeString: () => {
                beforeString && beforeString(strings[idx], idx);
                idx = (idx + 1) % strings.length;
            },
            strings,
            ...typeitProps
        });
        typeit.go();
        return () => typeit.reset();
    }, []);
    return (
        <span ref={ref}></span>
    );
}