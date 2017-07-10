/**
 * Created by Reinchard on 7/3/2017.
 */
import React from 'react'
import {Link} from "react-router-dom";

export const DashboardCounts = (props) => {
    return (<div className="row">
        <div className="col-lg-3 col-md-6">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-xs-4 col-md-4">
                            <i className="fa fa-users fa-5x"></i>
                        </div>
                        <div className="col-xs-4 col-md-4 text-center">Users</div>
                        <div className="col-xs-4 col-md-4 text-right">
                            {props.users ? props.users.map((val, key) => <p key={key}>{val.name}
                                - {val.count}</p>) : ''}
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                        <span className="pull-left"><Link to={`/users/`}
                                                          className="circle-tile-footer">View Details</Link></span>
                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                    <div className="clearfix"></div>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-md-6">
            <div className="panel panel-green">
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-xs-4 col-md-4">
                            <i className="fa fa-file fa-5x"></i>
                        </div>
                        <div className="col-xs-4 col-md-4 text-center">Projects</div>
                        <div className="col-xs-4 col-md-4 text-right">
                            {props.projects ? props.projects.map((val, key) => <p key={key}>{val.name}
                                - {val.count}</p>) : ''}
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                        <span className="pull-left"><Link to={`/projects/`}
                                                          className="circle-tile-footer">View Details</Link></span>
                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                    <div className="clearfix"></div>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-md-6">
            <div className="panel panel-yellow">
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-xs-4 col-md-4">
                            <i className="fa fa-file-code-o fa-5x"/>
                        </div>
                        <div className="col-xs-4 col-md-4 text-center">Modules</div>
                        <div className="col-xs-4 col-md-4 text-right">
                            {props.modules ? props.modules.map((val, key) => <p key={key}>{val.name}
                                - {val.count}</p>) : ''}
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                    <span className="pull-left"><Link to={`/modules/`}
                                                      className="circle-tile-footer">View Details</Link></span>
                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                    <div className="clearfix"/>
                </div>
            </div>
        </div>
    </div>)
}
//     return (
//         <div>
//             <div className="col-sm-3 col-md-3">
//                 <div className="hero-widget well well-sm">
//                     <div className="icon">
//                         <i className="fa fa-users fa-2x"/>
//                     </div>
//                     <label className="text-muted">Users</label>
//                     <div className="text text-left">
//                         {props.users ? props.users.map((val, key) => <p key={key}>{val.name} - {val.count}</p>) : ''}
//                     </div>
//                     <div className="options">
//                         <Link to={`/users/`} className="circle-tile-footer">More Info <i
//                             className="fa fa-chevron-circle-right"/></Link>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-sm-3 col-md-3">
//                 <div className="hero-widget well well-sm">
//                     <div className="icon">
//                         <i className="fa fa-file fa-2x"/>
//                     </div>
//                     <label className="text-muted">Projects</label>
//                     <div className="text text-left">
//                         {props.projects ? props.projects.map((val, key) => <p key={key}>{val.name} - {val.count}</p>) : ''}
//                     </div>
//                     <div className="options">
//                         <Link to={`/projects/`} className="circle-tile-footer">More Info <i
//                             className="fa fa-chevron-circle-right"/></Link>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-sm-3 col-md-3">
//                 <div className="hero-widget well well-sm">
//                     <div className="icon">
//                         <i className="fa fa-file-code-o fa-2x"/>
//                     </div>
//                     <label className="text-muted">Modules</label>
//                     <div className="text text-left">
//                         {props.modules ? props.modules.map((val, key) => <p key={key}>{val.name} - {val.count}</p>) : ''}
//                     </div>
//                     <div className="options">
//                         <Link to={`/modules/`} className="circle-tile-footer">More Info <i
//                             className="fa fa-chevron-circle-right"/></Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };