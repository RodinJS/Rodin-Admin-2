/**
 * Created by Reinchard on 7/3/2017.
 */
import React from 'react'
import {Link} from "react-router-dom";

export const DashboardCountsItem = (props) => {
    let icon = props.type.toLowerCase() === 'users' ? 'fa-users' :
        props.type.toLowerCase() === 'projects' ? 'fa-file' :
        props.type.toLowerCase() === 'modules' ? 'fa-file-code-o' : '';
    return <div className="col-lg-3 col-md-6">
        <div className="panel panel-primary">
            <div className="panel-heading">
                <div className="row">
                    <div className="col-xs-12 col-md-12 text-center">
                        <i className={`fa ${icon} fa-5x`}/>
                        <p className="text-center">{props.type}</p>
                    </div>

                    <div className="col-xs-12 col-md-12 text-right">
                        {props.value ? props.value.map((val, key) => <p key={key}>{val.name}
                            - {val.count}</p>) : ''}
                    </div>
                </div>
            </div>
            <div className="panel-footer">
                        <span className="pull-left"><Link to={`/${props.type.toLowerCase()}/`}
                                                          className="circle-tile-footer">View Details</Link></span>
                <span className="pull-right"><i className="fa fa-arrow-circle-right"/></span>
                <div className="clearfix"/>
            </div>
        </div>
    </div>
};