/**
 * Created by Reinchard on 7/14/2017.
 */
import React from 'react';
import {Link} from "react-router-dom";
import moment from 'moment';

/**
 *
 * @param project
 * @returns {XML}
 * @constructor
 */
export const ProjectListRow = ({project, onDelete}) => {
    /**
     *
     */
    return (
        <tr key={project.displayName}>
            <td><Link to={`/project/${project._id}`}>{project.displayName}</Link></td>
            <td>{project.name}</td>
            <td>{project.state}</td>
            <td><Link to={`/user/${project.owner}`}>{project.owner}</Link></td>
            <td>{project.description}</td>
            <td>{project.public}</td>
            <td>{project.templateOf}</td>
            <td>{moment(project.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
            <td className="text-center">
                <div className="btn-toolbar">
                    <Link to={`/project/${project._id}`}><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"/></Link>
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