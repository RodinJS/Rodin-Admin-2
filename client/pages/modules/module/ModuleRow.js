/**
 * Created by Reinchard on 7/4/2017.
 */
import React from 'react';
import {Link} from "react-router-dom";
import moment from 'moment';

export const ModuleListRow = ({module, onDelete}) => {
     return (
        <tr key={module.author}>
            <td>{<Link to={`/module/${module._id}`}>{module.title}</Link>}</td>
            <td>{module.author}</td>
            <td>{module.submittedDate}</td>
            <td>{module.approvedDate}</td>
            <td>{module.rejectedDate}</td>
            <td>{moment(module.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
            <td>
                <button type="button"
                        className={`btn ${module.status === 'Pending' ? 'btn-warning' : module.status === 'Rejected' ? 'btn-danger' : module.status === 'Active' ? 'btn-success' : module.status === 'InReview' ? 'btn-primary' : '' }`}>
                    {module.status}</button>
            </td>
            {/*<td className="text-center">*/}
            {/*<div className="btn-toolbar">*/}
            {/*<Link to={`/user/${module._id}`}><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"/></Link>*/}
            {/*</div>*/}
            {/*</td>*/}
            {/*<td className="text-center">*/}
            {/*<div className="btn-toolbar">*/}
            {/*<a onClick={onDelete}><i className="fa fa-trash-o fa-2x" style={{color: 'red', cursor: 'pointer'}} aria-hidden="true"/></a>*/}
            {/*</div>*/}
            {/*</td>*/}
        </tr>
    )
};