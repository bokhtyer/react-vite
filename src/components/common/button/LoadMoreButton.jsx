import React from 'react';
import './Button.scss'

function LoadMoreButton(props) {
    return (
        <div className="lodMore-button">
            <button className={props?.className} disabled={props.disabled} onClick={props.onClick}><i className={`fa-solid fa-rotate-right ${props.loading && 'fa-spin'}`}/></button>
        </div>
    );
}

export default LoadMoreButton;