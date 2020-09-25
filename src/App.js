/** @jsx jsx */
/** @jsxFrag React.Fragment */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
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
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.95);

  h1 {
    font-size: 36px;
  }
`;

function App() {
  const baseUrl = 'http://localhost:5000';
  // setState initially to empty array, until use Effect fetches data from the server
  const [guestList, setGuestList] = useState([]);
  // define filters to show attending and not attending guests, initially set to show all
  const showAll = 'showAll';
  const showAttending = 'showAttending';
  const showNotAttending = 'showNotAttending';
  const [filter, setFilter] = useState(showAll);

  // function to fetch GuestList form the server
  const fetchGuestList = async () => {
    const response = await fetch('http://localhost:5000/');
    const data = await response.json();
    setGuestList(data);
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

  // function to delete one guest from the server
  const deleteGuestFromServer = (id) => {
    fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
  };

  // function to patch attendance for one guest
  const patchAttendance = (id, newAttendance) => {
    fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: newAttendance.toString() }),
    });
  };

  // call this function in use effect on rendering to fetch guest list from server
  useEffect(() => {
    fetchGuestList();
  }, []);

  // class contructor for new guest
  class Guest {
    constructor(firstName, lastName, confirmationDueDate, attending) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.confirmationDueDate = confirmationDueDate;
      this.attending = attending;
    }
  }
  // add a new guest by creating a new guest object with the class guest, push it to the guestlist and update guest list state
  const addGuest = (first, last, confirmationDueDate) => {
    const newGuest = new Guest(first, last, confirmationDueDate, false);
    const guestListWithAddedGuest = guestList.slice();
    guestListWithAddedGuest.push(newGuest);
    setGuestList(guestListWithAddedGuest);
    postGuest(first, last);
  };

  const deleteAllGuests = (guestList) => {
    for (let i = 0; i < guestList.length; i++) {
      deleteGuestFromServer(guestList[i].id);
      console.log(guestList[i].id);
    }
    setGuestList([]);
  };
  // two different methods to change one guest and update the guest list
  // change attending status of one guest. filter guest list by id and get attenting status of that guest.
  // patch inverse of that boolean to the server
  // first not quite working
  // const toggleAttendance2 = (id) => {
  //   const guestById = guestList.filter((guest) => guest.id === id);
  //   const newAttendance = !guestById[0].attending;
  //   patchAttendance(id, newAttendance);
  //   const updatedGuestList = guestList.map((guest) =>
  //     guest.id !== id ? guest : { ...guest, attending: !guest.attending },
  //   );
  //   setGuestList(updatedGuestList);
  // };

  const toggleAttendance = (id) => {
    //first filter out guest I want to modify, inialize index varible outside of filter
    // if the filter condition is true, get the index of that element, return the filtered element
    let index;
    const guestToModify = guestList.filter((guest, ind) => {
      if (guest.id === id) {
        index = ind;
      }
      return guest.id === id;
    });
    // change the value of the attending property in the  element the filter returned
    const modifiedGuest = {
      ...guestToModify[0],
      attending: !guestToModify[0].attending,
    };
    // make a copy of the guest list with slice
    const guestListWithModifiedGuest = guestList.slice();
    //replace the element in the list with the modified element
    guestListWithModifiedGuest[index] = modifiedGuest;
    // set the guest List state to that new array
    setGuestList(guestListWithModifiedGuest);
    // patch with the id and modified attending status
    patchAttendance(id, modifiedGuest.attending);
  };

  const deleteGuest = (id) => {
    const updatedGuestListGuestDeleted = guestList.filter(
      (guest) => guest.id !== id,
    );
    setGuestList(updatedGuestListGuestDeleted);
    deleteGuestFromServer(id);
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
      <button onClick={() => deleteAllGuests(guestList)}>
        Delete Guest List
      </button>
    </main>
  );
}

export default App;
