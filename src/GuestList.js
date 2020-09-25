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
    margin: 0;
    justify-content: right;
    align-self: right;
  }
  li {
    width: 100%;
    font-size: 18px;
    margin: 0;
  }
`;

function GuestList({ guestList, toggleAttendance, deleteGuest, filter }) {
  let filteredGuestList = guestList;

  if (filter === 'showAttending') {
    filteredGuestList = guestList.filter((guest) => guest.attending === true);
    console.log(filteredGuestList);
  } else if (filter === 'showNotAttending') {
    filteredGuestList = guestList.filter((guest) => guest.attending === false);
    console.log(filteredGuestList);
  }
  console.log(filteredGuestList);

  const [isEditable, setIsEditable] = useState(false);
  const changeIsEditable = () => {
    console.log(isEditable);
    setIsEditable(!isEditable);
    console.log(isEditable);
  };

  const updateFirstName = () => {
    changeIsEditable();
    //// HOW TO ACTUALLY UPDATE THE NAME refs???
  };

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

              <Emoji symbol="★  " />
              {isEditable ? (
                <span>
                  <input type="text" defaultValue={guest.firstName} />
                  <button onClick={changeIsEditable}>X</button>
                  <button onClick={updateFirstName}>Save</button>
                </span>
              ) : (
                <span onDoubleClick={changeIsEditable}>{guest.firstName} </span>
              )}

              <span>{guest.lastName} </span>
              <span>{guest.attending ? 'attends the party. ' : null}</span>
            </div>
            <div>
              {' '}
              Confirmation due by:{' '}
              {guest.confirmationDueDate.toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GuestList;
