import { Fragment } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import path from "../../../routes/path";
import { IoHomeOutline } from "react-icons/io5";

function Breadcrumb(props: any) {
    return (
        <Fragment>
            <div className="Breadcrumb">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item d-flex align-items-center">
                        <Link className="home-i" to={path.dashboard}>
                            <IoHomeOutline />
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
