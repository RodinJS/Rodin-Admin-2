/**
 * Created by Reinchard on 6/29/2017.
 */
import React from 'react';
import {Link} from "react-router-dom";
import moment from 'moment';

export const UsersListRow = ({user, onDelete}) => {
    return (
        <tr key={user.username}>
            <td>{user.email}</td>
            <td>{user.username}</td>
            <td>{user.role}</td>
            <td>{user.storageSize}</td>
            <td>{user.allowProjectsCount}</td>
            <td>{moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
            <td className="text-center">
                <div className="btn-toolbar">
                    <Link to={`/user/${user.username}`}><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"/></Link>
                </div>
            </td>
            <td className="text-center">
                <div className="btn-toolbar">
                    <a onClick={onDelete}><i className="fa fa-trash-o fa-2x" style={{color: 'red', cursor: 'pointer'}} aria-hidden="true"/></a>
                </div>
            </td>
        </tr>
    )
};