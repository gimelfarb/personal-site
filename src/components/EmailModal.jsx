import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './EmailModal.scss';

export default function EmailModal(props) {
    const { active, email, onClose } = props;
    const onCloseClick = () => {
        setCopied(false);
        onClose && onClose();
    };

    const [elModalRoot] = useState(() => document.createElement('div'));
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const body = document.body;
        body.appendChild(elModalRoot);
        return () => body.removeChild(elModalRoot);
    }, [elModalRoot]);

    useEffect(() => {
        const html = document.documentElement;
        active ? html.classList.add('is-clipped') : html.classList.remove('is-clipped');
        return () => html.classList.remove('is-clipped');
    }, [active]);

    const onCopy = () => {
        copyToClipboard(email);
        setCopied(true);
        setTimeout(() => onCloseClick(), 1000);
    };

    return createPortal(
        <div className={'modal' + (active ? ' is-active' : '')}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="section">
                {
                    copied ?
                        <div className="container has-text-centered is-clipped">
                            <p className="title copied-notify">Copied!</p>
                        </div>
                        : (
                            active ?
                                <div className="field has-addons has-addons-centered email-field">
                                    <div className="control has-icons-left">
                                        <input className="input is-large" readOnly={true} defaultValue={email || ''} />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                    </div>
                                    <div className="control">
                                        <button className="button is-large copy-button" onClick={onCopy}>
                                            <span className="icon">
                                                <i className="fas fa-copy"></i>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                : null
                        )
                }
                </div>
            </div>
            <button
                className="modal-close is-large"
                aria-label="close"
                onClick={onCloseClick}
            >
            </button>
        </div>,
        elModalRoot
    );
}

// From: https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
function copyToClipboard(str) {
    const el = document.createElement('textarea');  // Create a <textarea> element
    el.value = str;                                 // Set its value to the string that you want copied
    el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
    el.style.position = 'absolute';
    el.style.left = '-9999px';                      // Move outside the screen to make it invisible
    document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
    const selected =
        document.getSelection().rangeCount > 0        // Check if there is any content selected previously
            ? document.getSelection().getRangeAt(0)     // Store selection if found
            : false;                                    // Mark as false to know no selection existed before
    el.select();                                    // Select the <textarea> content
    document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el);                  // Remove the <textarea> element
    if (selected) {                                 // If a selection existed before copying
        document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
        document.getSelection().addRange(selected);   // Restore the original selection
    }
}