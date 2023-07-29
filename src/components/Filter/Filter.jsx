import { Component } from "react";
import PropTypes from 'prop-types';
import css from './Filter.module.css'

export class Filter extends Component {
    handleInputValue = ({target}) => {
        this.props.handleFilter(target.value)
    }

    render() {
        return (
            <div className={css.filter_section}>
                <b>Find contact by name: </b>
                <input onChange={this.handleInputValue} value={this.props.value} />
            </div>
        );
    }
}

Filter.propTypes = {
    value: PropTypes.string.isRequired,
}