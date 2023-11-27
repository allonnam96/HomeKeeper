import './Modal.css'
import React from 'react';

const Modal = ({ onClose, isOpen, children }) => {
    if(!isOpen) return null;

    const childWithOnClose = React.cloneElement(children, { onClose })

    return (
        <>
            <div className="modal-backdrop" onClick={onClose}></div>
            <div className="modal-content">
                {childWithOnClose}
            </div>
        </>
    )
}

export default Modal