/**
 * Created by Reinchard on 6/28/2017.
 */
import React from 'react'
import PropTypes from 'prop-types'
import Moment  from 'moment';
import _map from "lodash/map";

const EditUser = ({user, onSubmit, onChange}) => {
    let options = {
        role: ['Free', 'Premium', 'Enterprise', 'Admin', 'God'],
        allowProjectsCount: [2, 5, 10],
        storageSize: [100, 1000, 5000],
        type: ['User', 'Organization']
    };
    let selectOptions = ['role', 'allowProjectsCount', 'storageSize', 'type'];
    let inputFields = _map(user, (val, key) => {
        val = val ? val.toString() : '';
        let field = '';
        switch (key) {
            case selectOptions.indexOf(key) !== -1 ? key : false:
                field = <div className="form-group" key={key}>
                    <label className="col-md-4 control-label">{key}</label>
                    <div className="col-md-4">
                        <select className="form-control" name={key} value={val}
                                onChange={onChange}>
                            {options[key].map((opt, id) => <option value={opt} key={id}>{opt}</option>)}
                        </select>
                    </div>
                </div>;
                break;
            case 'usernameConfirmed':
                field = <div className="form-group" key={key}>
                    <label className="col-md-4 control-label">Username Confirmed</label>
                    <div className="col-md-4">
                        <input type="checkbox" name="usernameConfirmed" checked={val}
                               onChange={onChange}/>
                    </div>
                </div>;
                break;
            default:
                field = key !== '__v' && key !== '_id' && key !== 'editorSettings' && key !== 'github' && key !== 'projects' ?
                    <div className="form-group" key={key}>
                        <label className="col-md-4 control-label">{key}</label>
                        <div className="col-md-8">
                            <input className="form-control" name={key}
                                   value={["createdAt", "updatedAt"].some(i => i === key) ? Moment(val).format('MMMM Do YYYY, h:mm:ss a') : val}
                                   type="text"
                                   disabled={["createdAt", "updatedAt"].some(i => i === key)}
                                   onChange={onChange}/>
                        </div>
                    </div> : null;
                break
        }

        return field;
    });
    return (<div className="paperWrapper">
            <form className="form-horizontal" onSubmit={onSubmit} noValidate>
                <fieldset>

                    <legend>User Info</legend>
                    {inputFields}
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