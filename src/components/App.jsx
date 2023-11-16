import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import '../css/ContactForm.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '', 
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  isContactExist = (name) => {
    return this.state.contacts.some((contact) => contact.name.toLowerCase() === name.toLowerCase());
  }

  addContact = (contact) => {
    const { name } = contact;
    
    if (this.isContactExist(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, contact],
    }));
    
  };

  
  deleteContact = (contactId) => {
    const { contacts } = this.state;
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id === contactId) {
        contacts.splice(i, 1);
        this.setState({ contacts });
        return;
      }
    }
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    
    if (typeof filter !== 'string') {
      return contacts;
    }
    
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onFilterChange={this.handleFilterChange} />
        <ContactList contacts={visibleContacts} onDeleteContact={this.deleteContact} />
      </div>
    );
  }
}

export {App};