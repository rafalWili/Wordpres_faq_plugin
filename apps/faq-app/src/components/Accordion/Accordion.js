import React, { useState } from 'react';

const Accordion = ({ title, children  }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ border: '1px solid #ccc', marginBottom: '10px' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    padding: '6px',
                    textAlign: 'left',
                    background: '#f1f1f1',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                {title}
            </button>
            {isOpen && (
                <div style={{ padding: '10px', background: '#fff' }}>
                    {children }
                </div>
            )}
        </div>
    );
};

export default Accordion;
