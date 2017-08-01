/**
 * Created by Reinchard on 6/30/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Pagination} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getProjects} from "../../actions/projects";
import {getModules} from "../../actions/modules";
import {getUsers} from "../../actions/users";

class Paginate extends Component {
    constructor(props) {
        super();
        this.state = {
            activePage: props.activePage,
            itemsPerPage: props.itemsPerPage,
            name: props.name,
            total: props.total
        };
        this.changePage = this.changePage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
        this.getMore(Number(this.state.activePage))
    }

    getMore(page) {
        let reducerLength = this.props.state[this.state.name + 'Reducer'].length;
        let nextPage = (reducerLength - 1) / (page * this.state.itemsPerPage);
        let finished = this.state.total === reducerLength;
        if (nextPage < 1 && !finished) {
            this.props.actions['get' + this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)]({
                page: this.state.activePage
            })
        }
    }

    changePage(e) {
        this.setState({activePage: e});
        this.props.onPageChange(e);
        this.getMore(e);
    }

    renderPagination() {
        if (this.props.pages) {
            return <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                items={this.props.pages}
                maxButtons={5}
                activePage={this.state.activePage}
                onSelect={this.changePage} />
        } else {
            return <div></div>
        }

    }

    render() {
        return (this.renderPagination())
    }
}

Paginate.propTypes = {
    actions: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
};
Paginate.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({getUsers, getModules, getProjects}, dispatch)}

}

export default connect(mapStateToProps, mapDispatchToProps)(Paginate);