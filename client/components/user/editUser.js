/**
 * Created by Reinchard on 6/28/2017.
 */
import React from 'react'
import PropTypes from 'prop-types'
import Moment  from 'moment';

const EditUser = ({user, onSubmit, onChange}) => {
    let roles = ['Free', 'Premium', 'Enterprise', 'Admin', 'God'];
    let allowProjectsCount = [2, 5, 10];
    let storageSize = [100, 1000, 5000];
    let type =['User', 'Organization'];
    return (<div className="paperWrapper">
            <form className="form-horizontal" onSubmit={onSubmit} noValidate>
                <fieldset>

                    <legend>User Info</legend>

                    <div className="form-group">
                        <label className="col-md-4 control-label">Username</label>
                        <div className="col-md-8">
                            <input className="form-control" name="username" value={user.username} type="text"
                                   onChange={onChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4 control-label">Email</label>
                        <div className="col-md-8">
                            <input className="form-control" name="email" value={user.email} onChange={onChange}
                                   type="text"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4 control-label">Role</label>
                        <div className="col-md-4">
                            <select className="form-control" name="role" value={user.role}
                                    onChange={onChange}>
                                {roles.map((value, key) => <option value={value} key={key}>{value}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4 control-label">Type</label>
                        <div className="col-md-4">
                            <select className="form-control" name="role" value={user.type}
                                    onChange={onChange}>
                                {type.map((value, key) => <option value={value} key={key}>{value}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4 control-label">Allow Projects Count</label>
                        <div className="col-md-4">
                            <select className="form-control" name="allowProjectsCount" value={user.allowProjectsCount}
                                    onChange={onChange}>
                                {allowProjectsCount.map((value, key) => <option value={value}
                                                                                key={key}>{value}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4 control-label">Storage Size</label>
                        <div className="col-md-4">
                            <select className="form-control" name="storageSize" value={user.storageSize}
                                    onChange={onChange}>
                                {storageSize.map((value, key) => <option value={value} key={key}>{value}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4 control-label">Created At</label>
                        <div className="col-md-8">
                            <input className="form-control" name="createdAt"
                                   value={Moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')} disabled
                                   type="text"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4 control-label">Updated At</label>
                        <div className="col-md-8">
                            <input className="form-control" name="createdAt"
                                   value={Moment(user.updatedAt).format('MMMM Do YYYY, h:mm:ss a')} disabled
                                   type="text"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label">Username Confirmed</label>
                        <div className="col-md-4">
                            <input type="checkbox" name="usernameConfirmed" checked={user.usernameConfirmed}
                                   onChange={onChange}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label"/>
                        <div className="col-md-4">
                            <button type="submit" name="save" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    )
};

EditUser.propTypes = {
    user: PropTypes.object,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
};

export default EditUser;