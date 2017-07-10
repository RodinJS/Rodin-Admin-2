/**
 * Created by Reinchard on 6/30/2017.
 */
import React, {Component} from 'react';
import {Pagination} from 'react-bootstrap';

class Paginate extends Component {
    constructor(props) {
        super();
        this.state = {
            activePage: 1,
            itemsPerPage: props.itemsPerPage
        }
    }

    changePage(e) {
        this.setState({activePage:e});
        this.props.onPageChange(e)
    }

    render() {
        let count = this.props.listLength / this.props.itemsPerPage;
        let items =(this.props.listLength % count) === 0 ? count : count + 1;
        if(items < 2) {
            return <div></div>
        }
        return <Pagination
                bsSize="large"
                items={items}
                activePage={this.state.activePage}
                onSelect={this.changePage.bind(this)}/>
    }
}
export default Paginate