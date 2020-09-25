/** @jsx jsx */
/** @jsxFrag React.Fragment */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { jsx, css } from '@emotion/core';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RegisterGuestFormStyles = css`
  input {
    height: 2em;
    font-size: 18px;
    padding: 0 0 0 1em;
    margin: 1em 1em 2em 0em;
  }

  button {
    font-size: 18px;
    height: 2em;
    margin: 0 2em;
  }
`;

function RegisterGuestForm(props) {
  const [newGuestFirstName, setNewGuestFirstName] = useState('');
  const [newGuestLastName, setNewGuestLastName] = useState('');
  const [newGuestDueDate, setNewGuestDueDate] = useState(new Date());

  const handleChangedDate = (date) => {
    setNewGuestDueDate(date);
  };

  return (
    <div css={RegisterGuestFormStyles}>
      <form
        onSubmit={(e) => {
          props.addGuest(newGuestFirstName, newGuestLastName, newGuestDueDate);
          e.preventDefault();
          setNewGuestFirstName([]);
          setNewGuestLastName([]);
        }}
      >
        <input
          required
          type="text"
          placeholder="Virginia"
          value={newGuestFirstName}
          onChange={(e) => setNewGuestFirstName(e.currentTarget.value)}
        ></input>
        <input
          required
          type="text"
          placeholder="Woolf"
          value={newGuestLastName}
          onChange={(e) => setNewGuestLastName(e.currentTarget.value)}
        ></input>
        <Datepicker selected={newGuestDueDate} onChange={handleChangedDate} />
        <input type="submit" value="Invite Guest" />
      </form>
    </div>
  );
}

export default RegisterGuestForm;
