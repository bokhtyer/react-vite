import React from 'react'
import { Link } from 'react-router-dom'
import './Button.scss'

export default function AnchorButton(props) {
    return (
        <Link
        to={props.to}
        className={`button-1 ${props.btnClassName}`}
        >
            {props.btnText}
        </Link>
    )
}