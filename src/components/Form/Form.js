import { useState } from 'react';
import { nanoid } from 'nanoid';

import css from './Form.module.css';

export const Form = ({ fromSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handelChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const hendelSubmit = e => {
    e.preventDefault();
    fromSubmit({ id: nanoid(), name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={hendelSubmit} className={css.form}>
      <div className={css.wrap}>
        <label>{'Name'}</label>
        <input
          type="text"
          name="name"
          // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handelChange}
          autoComplete="off"
        />
      </div>

      <div className={css.wrap}>
        <label>{'Number'}</label>
        <input
          type="tel"
          name="number"
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handelChange}
          autoComplete="off"
        />
      </div>

      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};
