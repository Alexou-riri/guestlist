/** @jsx jsx */
/** @jsxFrag React.Fragment */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import { jsx, css } from '@emotion/core';
import Emoji from './Emoji';

const GuestStyles = css`
  .attending {
    color: green;
  }
  .notAttending {
    color: red;
  }
`;
export default function Guest({ guest, updateFirstName, updateLastName }) {
  const [isEditable, setIsEditable] = useState(false);
  const changeIsEditable = () => {
    setIsEditable(!isEditable);
  };
  const inputFirstName = useRef(guest.firstName);
  const inputLastName = useRef(guest.lastName);

  return (
    <span>
      {isEditable && (
        <span>
          <input
            type="text"
            ref={inputFirstName}
            placeholder={guest.firstName}
          />
          <input type="text" ref={inputLastName} placeholder={guest.lastName} />
          <button
            onClick={() => {
              changeIsEditable();
            }}
          >
            X
          </button>
          <button
            onClick={() => {
              console.log(inputFirstName.current.value);
              console.log(inputLastName.current.value);
              updateFirstName(guest.id, inputFirstName.current.value);
              updateLastName(guest.id, inputLastName.current.value);
              changeIsEditable();
            }}
          >
            Save
          </button>
        </span>
      )}
      {!isEditable && (
        <span css={GuestStyles}>
          <button
            onClick={() => {
              changeIsEditable();
            }}
          >
            Edit
          </button>
          <Emoji symbol="🎩 " />
          <span
            className={`guest ${
              guest.attending ? 'attending' : 'notAttending'
            }`}
          >{`${guest.firstName} `}</span>
          <span
            className={`guest ${
              guest.attending ? 'attending' : 'notAttending'
            }`}
          >
            {guest.lastName}{' '}
          </span>
        </span>
      )}
    </span>
  );
}
