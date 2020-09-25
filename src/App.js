/** @jsx jsx */
/** @jsxFrag React.Fragment */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { jsx, css } from '@emotion/core';
import './App.css';
import GuestList from './GuestList';
import RegisterGuestForm from './RegisterGuestForm';
//import InlineEdit from './InlineEdit';

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
  const baseUrl = 'http://localhost:5000';
  const [guestList, setGuestList] = useState([]);
  // set filter to show attending and not attending guests
  const showAll = 'showAll';
  const showAttending = 'showAttending';
  const showNotAttending = 'showNotAttending';
  const [filter, setFilter] = useState(showAll);

  // class contructor for new guest
  class Guest {
    constructor(firstName, lastName, confirmationDueDate, attending, id) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.confirmationDueDate = confirmationDueDate;
      this.attending = attending;
      this.id = id;
    }
  }
  // add a new guest by creating a new guest object with the class guest, push it to the guestlist and update guest list state
  const addGuest = (first, last, confirmationDueDate) => {
    const newGuest = new Guest(
      first,
      last,
      confirmationDueDate,
      false,
      Math.random(),
    );
    const guestListWithAddedGuest = guestList.slice();
    guestListWithAddedGuest.push(newGuest);
    setGuestList(guestListWithAddedGuest);
    console.log(guestList);
    postGuest(first, last);
  };

  // function to post new Guest to the server
  const postGuest = (first, last) => {
    fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: first,
        lastName: last,
      }),
    });
  };

  // function to fetch GuestList form the server
  const fetchGuestList = async () => {
    const response = await fetch('http://localhost:5000');
    const data = await response.json();
    console.log(data);
    setGuestList(data);
  };
  // function to patch attendance for one guest
  // function to delete one guest

  const deleteAllGuests = () => {
    setGuestList([]);
  };
  const toggleAttendance = (id) => {
    const updatedGuestList = guestList.map((guest) =>
      guest.id !== id ? guest : { ...guest, attending: !guest.attending },
    );
    setGuestList(updatedGuestList);
  };

  const deleteGuest = (id) => {
    const updatedGuestListGuestDeleted = guestList.filter(
      (guest) => guest.id !== id,
    );
    setGuestList(updatedGuestListGuestDeleted);
  };

  const updateFirstName = (id) => {
    const updatedGuestList = guestList.map((guest) =>
      guest.id !== id ? guest : { ...guest, firstName: 'something' },
    );
    setGuestList(updatedGuestList);
  };

  return (
    <main css={MainStyles}>
      <h1>RSVP Guest List</h1>
      <RegisterGuestForm addGuest={addGuest} />
      <button onClick={() => deleteAllGuests}>Delete Guest List</button>
      <div>Filter is set to:</div>
      <button onClick={() => setFilter(showAttending)}>attending</button>
      <button onClick={() => setFilter(showNotAttending)}>not attending</button>
      <button onClick={() => setFilter(showAll)}>Reset Filter</button>

      <GuestList
        guestList={guestList}
        toggleAttendance={toggleAttendance}
        deleteGuest={deleteGuest}
        updateFirstName={updateFirstName}
        filter={filter}
      />
    </main>
  );
}

export default App;
