import React from 'react';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className='contact-list'>
      {contacts.map((contact) => (
        <li className='contact-item' key={contact.id}>
          {contact.name}: {contact.number}
          <button  className="button-delete" type="button" onClick={() => onDeleteContact(contact.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
