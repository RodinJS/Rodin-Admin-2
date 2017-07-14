/**
 * Created by Reinchard on 7/14/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import _map from "lodash/map";
import Moment  from 'moment';

const EditProject = ({project, onSubmit, onChange}) => {
    let options = {
        state: ['pending', 'approved']
    };
    let selectOptions = ['state'];
    let inputFields = _map(project, (val, key) => {
        val = val ? val.toString() : '';
        let field = '';
        switch (key) {
            case 'defaultThumbnail':
                field = (
                    <div className="form-group" key={key}>
                        <label className="col-md-4 control-label">{key}</label>
                        <div className="col-md-8">
                            <img key={key} style={{width: '100px'}} src={val}/>
                        </div>
                    </div>);
                break;
            case selectOptions.indexOf(key) !== -1 ? key: false:
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
            case 'public':
                field = field = <div className="form-group" key={key}>
                    <label className="col-md-4 control-label">{key}</label>
                    <div className="col-md-4">
                        <input type="checkbox" name="usernameConfirmed" checked={val}
                               onChange={onChange}/>
                    </div>
                </div>;
               break;
            default:
                field = key !== '__v' && key !== '_id' && key !== 'build' && key !== 'tags'?
                    <div className="form-group" key={key}>
                        <label className="col-md-4 control-label">{key}</label>
                        <div className="col-md-8">
                            <input className="form-control" name={key} value={["createdAt", "updatedAt"].some(i => i === key) ? Moment(val).format('MMMM Do YYYY, h:mm:ss a') : val} type="text"
                                   disabled={["createdAt", "updatedAt"].some(i => i === key)}
                                   onChange={onChange}/>
                        </div>
                    </div> : null;
                break
        }

        return field;
    });
    return (
        <div className="paperWrapper">
        <form className="form-horizontal" onSubmit={onSubmit} noValidate>
            <fieldset>

                <legend>Project Info</legend>

                {inputFields}

                <div className="form-group">
                    <label className="col-md-4 control-label"/>
                    <div className="col-md-4">
                        <button type="submit" name="save" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </fieldset>
        </form>
        </div>)
}
EditProject.propTypes = {
    project: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
};

export default EditProject;