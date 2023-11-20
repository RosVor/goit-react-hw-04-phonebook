import React, { useState } from 'react';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addContact(name, number);
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <label>
        Name:
        <input className="contact-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Number:
        <input className="contact-input" type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
      </label>
      <button className="button-submit" type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;


