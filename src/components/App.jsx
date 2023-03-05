import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { load } from '../utils/storage';

import css from './Form/Form.module.css';

const contactsJSON = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(load('contacts') || []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts === null) {
      setContacts(contactsJSON);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const fromSubmit = data => {
    const searchSameName = contacts.map(cont => cont.name).includes(data.name);
    if (searchSameName) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    setContacts(prev => [data, ...prev]);
  };

  const deleteContact = name => {
    setContacts(prev => prev.filter(contact => contact.name !== name));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContacts = contacts => {
    const lowCaseFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowCaseFilter)
    );
  };

  return (
    <div className={css.app}>
      <h1>Phone book</h1>

      <Form fromSubmit={fromSubmit} />

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
};
