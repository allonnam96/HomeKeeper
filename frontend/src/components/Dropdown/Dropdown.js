import { forwardRef } from 'react';
import './Dropdown.css'
import React from 'react';

const Dropdown = forwardRef(({ children }, ref) => {
    return (
        <ul ref={ref} className="dropdown">
            {children.map(child => (
                <li key={child.value} onClick={child.fn}>
                    {child.value}
                </li>
            ))}
        </ul>
    )
});

export default Dropdown;