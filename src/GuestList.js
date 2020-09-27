/** @jsx jsx */
/** @jsxFrag React.Fragment */
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from 'react';
import { jsx, css } from '@emotion/core';
import Emoji from './Emoji';
import Guest from './Guest';

const GuestListStyles = css`
  ul {
    margin: 0 0;
    list-style: none;
    align-items: space-between;
    padding: 0;
  }

  button {
    font-size: 0.8em;
    width: 80px;
    display: inline-block;
    margin: 0 0.5em 0 0em;
    justify-content: right;
    align-self: right;
  }
  li {
    width: 100%;
    font-size: 18px;
    margin: 1em 0;

    button {
      margin: 0, 0.5em;
    }
  }
`;

function GuestList({
  guestList,
  toggleAttendance,
  deleteGuest,
  updateFirstName,
  updateLastName,
  filter,
}) {
  let filteredGuestList = guestList;

  if (filter === 'showAttending') {
    filteredGuestList = guestList.filter((guest) => guest.attending === true);
  } else if (filter === 'showNotAttending') {
    filteredGuestList = guestList.filter((guest) => guest.attending === false);
  }

  return (
    <div css={GuestListStyles}>
      <ul>
        {filteredGuestList.map((guest) => (
          <li key={guest.id}>
            <div>
              <button
                onClick={() => {
                  deleteGuest(guest.id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  toggleAttendance(guest.id);
                }}
              >
                {guest.attending ? 'Cancel' : 'Confirm'}
              </button>

              <Guest
                guest={guest}
                updateFirstName={updateFirstName}
                updateLastName={updateLastName}
              />

              {/* Confirmation due by:{' '}
              {guest.confirmationDueDate.toLocaleDateString()} */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GuestList;
