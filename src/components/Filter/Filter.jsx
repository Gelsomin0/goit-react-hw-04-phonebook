import PropTypes from 'prop-types';
import css from './Filter.module.css'

export const Filter = ({handleFilter, value}) => {
    const handleInputValue = ({target}) => {
        handleFilter(target.value)
    }

    return (
        <div className={css.filter_section}>
            <b>Find contact by name: </b>
            <input onChange={handleInputValue} value={value} />
        </div>
    );
}

Filter.propTypes = {
    value: PropTypes.string.isRequired,
}