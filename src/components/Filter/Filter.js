import PropTypes from 'prop-types';

import css from '../Form/Form.module.css';

export const Filter = ({ filter, onChangeFilter }) => {
  return (
    <div className={css.contacts}>
      {' '}
      <label>Find contacts by name</label>
      <input
        type="text"
        value={filter}
        onChange={onChangeFilter}
        className={css.input}
      ></input>
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
