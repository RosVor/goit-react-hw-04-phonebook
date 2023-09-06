import React, { Component } from 'react';
import '../css/ContactForm.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;

    if (!name || !number) {
      alert('Please enter name and number.');
      return;
    }

    this.props.onAddContact({ name, number });

    this.setState({ name: '', number: '' });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="contact-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            className="contact-input"
          />
        </label>
        <label>
          Number:
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            className="contact-input"
          />
        </label>
        <button className="button-submit" type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
