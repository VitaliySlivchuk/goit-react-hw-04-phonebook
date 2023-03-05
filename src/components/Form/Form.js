import { Component } from 'react';
import { nanoid } from 'nanoid';

import css from './Form.module.css';

export class Form extends Component {
  state = { id: '', name: '', number: '' };

  handelChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
      id: nanoid(),
    });
  };

  hendelSubmit = e => {
    e.preventDefault();
    this.props.getFormState(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ id: '', name: '', number: '' });
  };

  render() {
    const { handelChange, hendelSubmit } = this;
    const { name, number } = this.state;

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
          />
        </div>

        <button type="submit" className={css.button}>
          Add contact
        </button>
      </form>
    );
  }
}
