import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import './ContactForm/ContactForm.css';
import './ContactList/ContactList.css';
import './Filter/Filter.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      const savedContacts = localStorage.getItem('contacts');
      if (savedContacts) {
        setContacts(JSON.parse(savedContacts));
      }
    } catch (error) {
      console.error('Error parsing data from localStorage', error);
    }
  }, []);
  
  
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
    } else {
      if (name.trim() !== '' && number.trim() !== '') {
        const contact = { id: nanoid(), name: name, number: number };
        setContacts((prevContacts) => [...prevContacts, contact]);
      }
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
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
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

