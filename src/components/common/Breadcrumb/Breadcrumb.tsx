import { Fragment } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import path from "../../../routes/path";

function Breadcrumb(props: any) {
    return (
        <Fragment>
            <div className="Breadcrumb">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to={path.dashboard}>
                            <i className="fa-solid fa-house" />
                        </Link>
                    </li>
                    {props.parentPath ? (
                        <li className="breadcrumb-item">
                            <Link to={props?.parentPath}>{props.parent}</Link>
                        </li>
                    ) : (
                        <li className="breadcrumb-item">{props.parent}</li>
                    )}
                    {props.subtitle && (
                        <li className="breadcrumb-item">
                            <Link to={props?.subparentPath}>{props.subtitle}</Link>
                        </li>
                    )}
                    <li className="breadcrumb-item active">{props.title}</li>
                </ul>
            </div>
        </Fragment>
    );
}

export default Breadcrumb;
