/**
 * Created by Reinchard on 7/4/2017.
 */

/**
 * Created by Reinchard on 7/3/2017.
 */
import React from 'react'
import {Link} from "react-router-dom";

export const SideBar = (props) => {
    return ( <div className="collapse navbar-collapse navbar-ex1-collapse">
        <ul className="nav navbar-nav side-nav">
            <li className={props.path === '/dashboard/' ? "active":""}>
                <Link to={`/dashboard/`}><i className="fa fa-fw fa-dashboard"/> Dashboard</Link>
            </li>
            <li className={props.path === '/users/' ? "active":""}>
                <Link to={`/users/`}><i className="fa fa-fw fa-users"/> Users</Link>
            </li>
            <li className={props.path === '/projects/' ? "active":""}>
                <Link to={`/projects/`}><i className="fa fa-fw fa-file"/> Projects</Link>
            </li>
            <li className={props.path === '/modules/' ? "active":""}>
                <Link to={`/modules/`}><i className="fa fa-fw fa-file-code-o"/> Modules</Link>
            </li>
            <li><a onClick={props.logout}>Sing Out</a></li>
        </ul>
    </div>)
};