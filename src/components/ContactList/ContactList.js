import PropTypes from 'prop-types';

import css from '../Form/Form.module.css';

export const ContactList = ({ filterContacts, onDelete }) => {
  return (
    <ul className={css.ul}>
      {filterContacts.map(({ id, name, number }) => (
        <li key={id} className={css.liitem}>
          <div>
            <span>{name}: </span>
            <span>{number}</span>
          </div>

          <button onClick={() => onDelete(name)} className={css.itembtn}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  filterContacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
