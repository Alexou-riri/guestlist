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

function GuestInviteForm(props) {
  const [newGuestFirstName, setNewGuestFirstName] = useState('');
  const [newGuestLastName, setNewGuestLastName] = useState('');

  // default deadline one week in the future
  const inOneWeek = () => {
    var date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  };
  const [newGuestDeadline, setNewGuestDeadline] = useState(inOneWeek());

  const handleChangedDate = (date) => {
    setNewGuestDeadline(date);
  };

  return (
    <div css={RegisterGuestFormStyles}>
      <form
        onSubmit={(e) => {
          props.postGuest(newGuestFirstName, newGuestLastName, newGuestDeadline);
          e.preventDefault();
          setNewGuestFirstName('');
          setNewGuestLastName('');
          setNewGuestDeadline(inOneWeek());
        }}
      >
        <input
          required
          placeholder="Virginia"
          value={newGuestFirstName}
          onChange={(e) => setNewGuestFirstName(e.currentTarget.value)}
        />
        <input
          required
          placeholder="Woolf"
          value={newGuestLastName}
          onChange={(e) => setNewGuestLastName(e.currentTarget.value)}
        />
        <Datepicker selected={newGuestDeadline} onChange={handleChangedDate} />
        <input type="submit" value="Invite Guest" />
      </form>
    </div>
  );
}

export default GuestInviteForm;
