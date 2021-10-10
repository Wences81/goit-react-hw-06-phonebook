import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const addContact = createAction('contacts/addContact', (name, number) => {
  return {
    playload: {
      id: uuidv4(),
      name,
      number,
    },
  };
});

const deleteContact = createAction('contacts/deleteContact');

const changeFilter = createAction('contacts/changeFilter');

export default { deleteContact, addContact, changeFilter };
