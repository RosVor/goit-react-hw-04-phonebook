import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import './ContactForm/ContactForm.css';
import './ContactList/ContactList.css';
import './Filter/Filter.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Error saving data to localStorage', error);
    }
  }, [contacts]);

  const addContact = (name, number) => {
    const isDuplicate = contacts.some(
      (contact) =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (isDuplicate) {
      alert(`${name} or ${number} is already in contacts.`);
    } 
    else {
      const newContact = {
        id: uuidv4(),
        name,
        number,
      };
      setContacts((prevContacts) => [...prevContacts, newContact]);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) 
  );

  return (
    <div className="contact-menu">
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={deleteContact} />
    </div>
  );
};

export default App;

