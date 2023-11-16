import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import '../css/ContactForm.css';
import { v4 as uuidv4 } from 'uuid';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
  
    if (savedContacts !== undefined) {
      setContacts(JSON.parse(savedContacts));
    }
  }, [setContacts]);
  

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts, setContacts]);

  const isContactExist = (name) => {
    return contacts.some((contact) => contact.name.toLowerCase() === name.toLowerCase());
  }

  const addContact = (contact) => {
    const { name } = contact;

    if (isContactExist(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = { ...contact, id: uuidv4() };
    
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const deleteContact = (contactId) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    setContacts(updatedContacts);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const getVisibleContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onFilterChange={handleFilterChange} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
}

export { App };
