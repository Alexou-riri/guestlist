/** @jsx jsx */
/** @jsxFrag React.Fragment */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { jsx, css } from '@emotion/core';
import './App.css';
import GuestList from './GuestList';
import RegisterGuestForm from './RegisterGuestForm';

const MainStyles = css`
  width: 80%;
  max-width: 1000px;
  height: 1000px;
  background-color: white;
  padding: 2em;
  margin: 2em auto;
  background-color: rgba(255, 255, 255, 0.95);

  h1 {
    font-size: 36px;
  }
`;

function App() {
  const [guestList, setGuestList] = useState([]);
  // set filter to show attending and not attending guests
  const showAll = 'showAll';
  const showAttending = 'showAttending';
  const showNotAttending = 'showNotAttending';
  const [filter, setFilter] = useState(showAll);

  // class contructor for new guest

  class Guest {
    constructor(firstName, lastName, email, isAttending, id) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.isAttending = isAttending;
      this.id = id;
    }
  }
  // ad a new guest by creating a new guest object with the class guest, push it to the guestlist and update guest list state
  const addGuest = (first, last, email) => {
    const newGuest = new Guest(first, last, (email = ''), false, Math.random());
    const guestListWithAddedGuest = guestList.slice();
    guestListWithAddedGuest.push(newGuest);
    setGuestList(guestListWithAddedGuest);
    console.log(guestList);
  };

  const deleteAllGuests = () => {
    setGuestList([]);
  };
  const toggleAttendance = (id) => {
    const updatedGuestList = guestList.map((guest) =>
      guest.id !== id ? guest : { ...guest, isAttending: !guest.isAttending },
    );
    setGuestList(updatedGuestList);
  };
  const confirmAttendance = (id) => {
    const updatedGuestList = guestList.map((guest) =>
      guest.id !== id ? guest : { ...guest, isAttending: true },
    );
    setGuestList(updatedGuestList);
  };

  const deleteGuest = (id) => {
    const updatedGuestListGuestDeleted = guestList.filter(
      (guest) => guest.id !== id,
    );
    setGuestList(updatedGuestListGuestDeleted);
  };

  return (
    <main css={MainStyles}>
      <h1>RSVP Guest List</h1>
      <RegisterGuestForm
        addGuest={addGuest}
        deleteAllGuests={deleteAllGuests}
      />
      <button onClick={() => setFilter(showAll)}>Show all</button>
      <button onClick={() => setFilter(showAttending)}>Show attending</button>
      <button onClick={() => setFilter(showNotAttending)}>
        Show cancelled
      </button>
      <div>Filter is set to {filter} </div>
      <GuestList
        guestList={guestList}
        toggleAttendance={toggleAttendance}
        confirmAttendance={confirmAttendance}
        deleteGuest={deleteGuest}
        filter={filter}
      />
    </main>
  );
}

export default App;
