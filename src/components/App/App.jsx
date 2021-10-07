import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from '../Form/ContactForm';
import ContactList from '../List/ContactList';
import Filter from '../Filter/Filter';
import { Title } from './App.styled';

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const localstorageKeyName = 'contacts';

  useEffect(() => {
    const currentContacts = JSON.parse(
      localStorage.getItem(localstorageKeyName),
    );
    currentContacts && setContacts(currentContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(localstorageKeyName, JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = (name, number) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLocaleLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: uuidv4(),
      name,
      number,
    };

    setContacts(prevState => [newContact, ...prevState]);
  };

  const deleteContacts = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId),
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const changeBlur = e => {
    e.currentTarget.value = '';
    setFilter('');
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase()),
    );
  };

  return (
    <div>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={formSubmitHandler} />
      <Title>Contacts</Title>
      <Filter value={filter} onChange={changeFilter} onBlur={changeBlur} />
      <ContactList
        contacts={filteredContacts()}
        onDeleteContacts={deleteContacts}
      />
    </div>
  );
}
