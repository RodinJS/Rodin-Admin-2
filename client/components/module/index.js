/**
 * Created by xgharibyan on 6/13/17.
 */

import React from 'react';
import _map from 'lodash/map';

export const ModuleElement = ({module, onSubmit, onAction, onChange}) => {
    /**
     *
     * @type {{title: string, description: string, author: string, url: string, status: string, exampleLink: string, documentationLink: string, email: string}}
     * @param module, onSubmit, onAction {onApprove || onDelete || onReject}
     */
    let element = module ? module : {
        title: '',
        description: '',
        author: '',
        url: '',
        status: 'Pending',
        exampleLink: '',
        documentationLink: '',
        email: ''
    };

    const inputFields = _map(element, (val, key) => {
        val = val ? val.toString() : '';
        let field = '';
        switch (key) {
            case 'thumbnail':
                field = (
                    <div className="form-group" key={key}>
                        <label className="col-md-4 control-label">{key}</label>
                        <div className="col-md-8">
                            <img key={key} style={{width: '100px'}} src={val}/>
                        </div>
                    </div>);
                break;
            default:
                field = key !== '__v' && key !== '_id' ?
                    <div className="form-group" key={key}>
                        <label className="col-md-4 control-label">{key}</label>
                        <div className="col-md-8">
                            <input className="form-control" name={key} value={val} type="text"
                                   disabled={["createdAt", "status"].some(i => i === key)}
                                   onChange={onChange}/>
                        </div>
                    </div> : null;
                break
        }

        return field;
    });

    let rejectReason = <div style={{padding: '20px'}}>
        <div className="form-group">
                <textarea defaultValue=""
                          className="form-control"
                          key="rejectReason"
                          name="rejectReason"
                          label="Reject reason"
                          type="text"
                          rows="8"
                          onChange={onChange}
                />
        </div>
    </div>;

    const renderActions = () => {

        if (element.createdAt) {
            return <div className="col-md-4">
                <div className="btn-group pull-right">
                    <button type="button" className="btn btn-success" onClick={() => {
                        onAction('success', 'Approve Module', 'onApprove', `Approve Module ${element.title}`)
                    }}>Approve
                    </button>
                    <button type="button" className="btn btn-warning" onClick={() => {
                        onAction('warning', 'Reject reason', 'onReject', rejectReason)
                    }}>Reject
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => {
                        onAction('danger', 'Delete Module', 'onDelete', `Delete Module ${element.title}`)
                    }}>Delete
                    </button>
                </div>
            </div>
        }
    };

    return (
        <div className="paperWrapper">
            <form className="form-horizontal" onSubmit={onSubmit}>
                <fieldset>
                    <legend>{element.title || 'Module'}</legend>
                    {inputFields}
                    <div className="form-group">
                        <label className="col-md-4 control-label"/>
                        <div className="col-md-4">
                            <button type="submit" name="save" className="btn btn-primary">Save</button>
                        </div>
                        {renderActions()}
                    </div>
                </fieldset>
            </form>
        </div>
    )
}