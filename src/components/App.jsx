import { useState, useEffect } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

export const App = () => {
  const [contacts, setContacts] = useState([
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]);
  const [filter, setFilter] = useState('');

  const getContact = (newContact) => {
    let isExist = false;
    contacts.map((contact) => {
      if (newContact.name === contact.name) {
        return isExist = true;
      }
      return contact;
    });

    if (!isExist) {
      setContacts((prevState) => [...prevState, newContact]);
    }
    if (isExist) alert(`${newContact.name} is already in contacts`);
  }

  const handleFilter = (newFilter) => {
    setFilter(newFilter);
  }

  const deleteContact = (id) => {
    setContacts((prevState) => prevState.filter((contact) => contact.id !== id))
  }

  useEffect(() => {
    const checkLocalStorage = () => {
      const localPhonebook = localStorage.getItem('phonebook');
      if (!localPhonebook) localStorage.setItem('phonebook', JSON.stringify(contacts)); 
      return;
    }
    checkLocalStorage();    
  }, []);

  useEffect(() => {
    const localPhonebook = localStorage.getItem('phonebook');
    if (localPhonebook) setContacts(JSON.parse(localPhonebook));
    contacts.length > 4 && localStorage.setItem('phonebook', JSON.stringify(contacts));
  }, [contacts])
  

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm
        getContact={getContact}
        contacts={contacts}
      />

      <h2>Contacts</h2>
      <Filter
        handleFilter={handleFilter}
        value={filter}
      />
      <ContactList
        contacts={contacts}
        filter={filter}
        deleteContact={deleteContact}
      />
    </div>
  );
}