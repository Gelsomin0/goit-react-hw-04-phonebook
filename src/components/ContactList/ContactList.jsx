import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({filter, contacts, deleteContact}) => {
    return (
        <ol className={css.contacts_list}>
            {filter === ''
                ? contacts.map(({ id, name, number }) => {
                    return (
                        <li className={css.contacts_list_item} key={id}>
                            <p className={css.contact_name}>{name}: {number}</p> 
                            <button
                                className={css.contact_delete_button}
                                onClick={() => deleteContact(id)}
                            >Delete</button>
                        </li> 
                    )
                })
                : contacts.map((contact) => {
                    let item;
                    if (contact.name.toLowerCase().includes(filter.toLowerCase())) {
                        item = (
                            <li className={css.contacts_list_item} key={contact.id}>
                                <p className={css.contact_name}>{contact.name}: {contact.number}</p> 
                                <button
                                    className={css.contact_delete_button}
                                    onClick={() => deleteContact(contact.id)}
                                >Delete</button>
                            </li> 
                        )
                    }
                    return item;
                })
            }
        </ol>
    );
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