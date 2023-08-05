import { useState } from "react";
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

export const ContactForm = ({getContact}) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleData = ({ target }) => {
        if (target.name === 'name') {
            setName(target.value);
        }
        if (target.name === 'number') {
            setNumber(target.value);
        }
    }

    const addContact = (e) => {
        e.preventDefault();
        const newContact = {
            id: nanoid(),
            name,
            number,
        }

        getContact(newContact);
        setName('');
        setNumber('');
    }

    return (
        <form onSubmit={addContact} className={css.form_container}>
            <label className={css.label_section}>
                <p>Name:</p>
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={handleData}
                    value={name}
                />
            </label>
            <label className={css.label_section}>
                <p>Phone number:</p>
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={handleData}
                    value={number}
                />
            </label>
            <button type='submit'>Add contact</button>
        </form>
    );
}

ContactForm.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ).isRequired,
    getContact: PropTypes.func.isRequired,
}