/** @jsx jsx */
/** @jsxFrag React.Fragment */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { jsx, css } from '@emotion/core';
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
  emoji,
}) {
  let filteredGuestList = guestList;
  // depending on state of the filter, set the array to map over for e render
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
                emoji={emoji}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GuestList;
