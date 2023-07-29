import { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  getContact = (newContact) => {
    let isExist = true;

    this.state.contacts.map((contact) => {
      if (newContact.name === contact.name) {
        return isExist = false;
      }
      return contact;
    });

    if (isExist) {
      this.setState((prevState) => {
        return ({ contacts: [...prevState.contacts, newContact] })
      });  
    }
    if (!isExist) alert(`${newContact.name} is already in contacts`);
  }

  handleFilter = (newFilter) => {
    this.setState(({filter: newFilter}))
  }

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id)
    }))
  }

  componentDidMount() {
    if (localStorage.getItem('phonebook')) {
      this.setState(({
        contacts: JSON.parse(localStorage.getItem('phonebook'))
      }))
    } else {
      localStorage.setItem('phonebook', JSON.stringify(this.state.contacts));
    }
  }

  componentDidUpdate() {
    localStorage.setItem('phonebook', JSON.stringify(this.state.contacts));
  }

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          getContact={this.getContact}
          contacts={this.state.contacts}
        />

        <h2>Contacts</h2>
        <Filter
          handleFilter={this.handleFilter}
          value={this.state.filter}
        />
        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
};
