import React from 'react';
function ContactList({ contacts, onDeleteContact }) {
  return (
    <div>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.number}
            <button onClick={() => onDeleteContact(contact.id)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default ContactList;
