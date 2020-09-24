/** @jsx jsx */
/** @jsxFrag React.Fragment */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { jsx, css } from '@emotion/core';

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
    margin-right: 1em;
  }
`;

function RegisterGuestForm(props) {
  const [newGuestFirstName, setNewGuestFirstName] = useState('');
  const [newGuestLastName, setNewGuestLastName] = useState('');
  const [newGuestEmail, setNewGuestEmail] = useState('');

  return (
    <div css={RegisterGuestFormStyles}>
      <form
        onSubmit={(e) => {
          props.addGuest(newGuestFirstName, newGuestLastName, newGuestEmail);
          e.preventDefault();
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
        <input
          type="email"
          placeholder="example@email.com"
          value={newGuestEmail}
          onChange={(e) => setNewGuestEmail(e.currentTarget.value)}
        ></input>
        <input type="submit" value="Invite Guest" />
      </form>
      <button onClick={() => props.deleteAllGuests()}>Clear All</button>
    </div>
  );
}

export default RegisterGuestForm;
