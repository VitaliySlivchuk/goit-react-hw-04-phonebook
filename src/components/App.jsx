import { Component } from 'react';
import { nanoid } from 'nanoid';

import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import css from './Form/Form.module.css';

const contactsJSON = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts !== null) {
      this.setState({ contacts: parseContacts });
      return;
    }
    this.setState({ contacts: contactsJSON });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  fromSubmit = data => {
    const searchSameName = this.state.contacts
      .map(cont => cont.name)
      .includes(data.name);

    if (searchSameName) {
      alert(`${data.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [data, ...prevState.contacts],
    }));
  };

  deleteContact = name => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.name !== name),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterContacts = contacts => {
    const lowCaseFilter = this.state.filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowCaseFilter)
    );
  };

  findSameContact = (contacts, formContact) => {
    return contacts.map(contact => contact.include(formContact));
  };

  render() {
    const { fromSubmit, changeFilter, filterContacts, deleteContact } = this;
    const { filter, contacts } = this.state;

    return (
      <div className={css.app}>
        <h1>Phone book</h1>

        <Form getFormState={fromSubmit} />

        <h2>Contacts</h2>
        <div className={css.contactsWrap}>
          <Filter filter={filter} onChangeFilter={changeFilter} />
          <ContactList
            filterContacts={filterContacts(contacts)}
            onDelete={deleteContact}
          />
        </div>
      </div>
    );
  }
}
