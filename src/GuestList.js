/** @jsx jsx */
/** @jsxFrag React.Fragment */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { jsx, css } from '@emotion/core';
import Emoji from './Emoji';

const GuestListStyles = css`
  ul {
    list-style: none;
    align-items: space-between;
  }

  button {
    font-size: 0.8em;
    width: 80px;
    display: inline-block;
    margin: 0 1em;
    justify-content: right;
    align-self: right;
  }
  li {
    width: 100%;
    font-size: 18px;
    margin: 1em;
  }
`;

function GuestList({
  guestList,
  toggleAttendance,
  confirmAttendance,
  deleteGuest,
  // filter,
}) {
  // const [guestListFiltered, SetGuestListFiltered] = useState(guestList);

  // if (filter === 'showAttending') {
  //   SetGuestListFiltered(
  //     guestList.filter((guest) => guest.isAttending === true),
  //   );
  // } else if (filter === 'showNotAttending') {
  //   SetGuestListFiltered(
  //     guestList.filter((guest) => guest.isAttending === false),
  //   );
  // }

  return (
    <div css={GuestListStyles}>
      <ul>
        {guestList.map((guest) => (
          <li key={guest.id}>
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
              {guest.IsAttending ? 'Cancel' : 'Confirm'}
            </button>
            <button
              onClick={() => {
                confirmAttendance(guest.id);
              }}
            >
              Confirm
            </button>
            <Emoji symbol="★  " />
            {guest.firstName} {guest.lastName}{' '}
            {guest.IsAttending ? 'attends the party' : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GuestList;
