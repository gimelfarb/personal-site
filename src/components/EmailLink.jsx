import React, { useState, useCallback } from 'react';
import Spice from 'spice-app-react';
import EmailModal from './EmailModal';

// Hiding from spammer web scraping ...
const myemail = []
    .concat(['t','e','n','.','b','r','a','f'])
    .concat(['l','e','m','i','g','@','v','e','l'])
    .reverse()
    .join('');

export default function EmailLink() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onCloseModal = useCallback(() => setIsModalOpen(false), []);
    const onOpenModal = useCallback((e) => {
        e.preventDefault();
        setIsModalOpen(true);
    }, []);

    return (
        <>
            <Spice.Attach selector=".email-link" onClick={onOpenModal} />
            <EmailModal 
                active={isModalOpen}
                email={myemail}
                onClose={onCloseModal}
            />
        </>
    );
}