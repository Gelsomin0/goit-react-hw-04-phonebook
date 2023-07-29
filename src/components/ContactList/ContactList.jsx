import { Component } from "react";
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export class ContactList extends Component {
    render() {
        return (
            <ol className={css.contacts_list}>
                {this.props.filter === ''
                    ? this.props.contacts.map(({ id, name, number }) => {
                        return (
                            <li className={css.contacts_list_item} key={id}>
                                <p className={css.contact_name}>{name}:</p> {number}
                                <button className={css.contact_delete_button} onClick={() => this.props.deleteContact(id)}>Delete</button>
                            </li> 
                        )
                    })
                    : this.props.contacts.map((contact) => {
                        let item;
                        if (contact.name.toLowerCase().includes(this.props.filter.toLowerCase())) {
                            item = (
                                <li className={css.contacts_list_item} key={contact.id}>
                                    <p className={css.contact_name}>{contact.name}:</p> {contact.number}
                                    <button className={css.contact_delete_button} onClick={() => this.props.deleteContact(contact.id)}>Delete</button>
                                </li> 
                            )
                        }
                        return item;
                    })
                }
            </ol>
        );
    }
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ).isRequired,
    deleteContact: PropTypes.func.isRequired,
}