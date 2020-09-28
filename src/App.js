/** @jsx jsx */
/** @jsxFrag React.Fragment */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import './App.css';
import GuestList from './GuestList';
import GuestInviteForm from './GuestInviteForm';

const MainStyles = css`
  width: 80%;
  max-width: 1000px;
  height: 1000px;
  background-color: white;
  padding: 2em;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.95);

  h1 {
    font-size: 42px;
  }
`;

function App() {
  const baseUrl = 'https://express-rest-guest-list-api.herokuapp.com';
  // setState initially to empty array, until use Effect fetches data from the server
  const [guestList, setGuestList] = useState([]);
  // define filters as variables to enable autocomplete to show attending and not attending guests, initially set to show all
  const showAll = 'showAll';
  const showAttending = 'showAttending';
  const showNotAttending = 'showNotAttending';
  const [filter, setFilter] = useState(showAll);
  // initialize emoji to local storage, otherwise to empty string
  const [emoji, setEmoji] = useState(
    localStorage.getItem('emojiInLocalStorage' || ''),
  );

  const handleEmojiChange = (e) => {
    setEmoji(e.currentTarget.value);
  };
  // when emoji state changes, update local storage
  useEffect(() => {
    localStorage.setItem('emojiInLocalStorage', emoji);
  }, [emoji]);

  // function to fetch GuestList form the server and set guestList
  const fetchGuestList = async () => {
    const response = await fetch('http://localhost:5000/');
    const data = await response.json();
    setGuestList(data);
  };

  // function to post new Guest to the server
  const postGuest = (first, last, deadline) => {
    fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: first,
        lastName: last,
        deadline: deadline,
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
      body: JSON.stringify({ attending: newAttendance }),
    });
  };
  // function to patch new value for names
  const patchName = (id, newValue, keyToUpdate) => {
    if (keyToUpdate === 'firstName') {
      fetch(`${baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName: newValue }),
      });
    } else if (keyToUpdate === 'lastName') {
      fetch(`${baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lastName: newValue }),
      });
    }
  };

  // call this function in use effect on rendering to fetch guest list from server on first render and whenever guestList changes
  useEffect(() => {
    fetchGuestList();
  }, []);
  useEffect(() => {
    fetchGuestList();
  }, [guestList]);

  // class contructor for new guest
  class Guest {
    constructor(firstName, lastName, deadline) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.deadline = deadline;
    }
  }
  // add a new guest by creating a new guest object with the class guest, push it to the guestlist and update guest list state
  const addGuest = (first, last, deadline) => {
    const newGuest = new Guest(first, last, deadline);
    const guestListWithAddedGuest = guestList.slice();
    guestListWithAddedGuest.push(newGuest);
    setGuestList(guestListWithAddedGuest);
    postGuest(first, last, deadline);
  };

  const deleteAllGuests = (guestList) => {
    for (let i = 0; i < guestList.length; i++) {
      deleteGuestFromServer(guestList[i].id);
    }
    setGuestList([]);
  };

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

  const updateFirstName = (id, value) => {
    const updatedGuestList = guestList.map((guest) =>
      guest.id !== id ? guest : { ...guest, firstName: value },
    );
    setGuestList(updatedGuestList);
    patchName(id, value, 'firstName');
    fetchGuestList();
  };
  const updateLastName = (id, value) => {
    const updatedGuestList = guestList.map((guest) =>
      guest.id !== id ? guest : { ...guest, lastName: value },
    );
    setGuestList(updatedGuestList);
    patchName(id, value, 'lastName');
    fetchGuestList();
  };

  return (
    <>
      <main css={MainStyles}>
        <h1>RSVP Guest List</h1>
        <div> Invited Guests: {guestList.length} </div>
        <div>
          {' '}
          Attending Guests:{' '}
          {guestList.filter((guest) => guest.attending === true).length}
        </div>
        <GuestInviteForm addGuest={addGuest} />
        <div>Add some decoration: </div>
        <select onChange={(e) => handleEmojiChange(e)}>
          <option value={'🎩'}>🎩</option>
          <option value={'👒'}>👒</option>
          <option value={'🎉'}>🎉</option>
        </select>
        <div>Filter:</div>
        <button onClick={() => setFilter(showAttending)}>attending</button>
        <button onClick={() => setFilter(showNotAttending)}>
          not attending
        </button>
        <button onClick={() => setFilter(showAll)}>Reset Filter</button>

        <GuestList
          guestList={guestList}
          toggleAttendance={toggleAttendance}
          deleteGuest={deleteGuest}
          updateFirstName={updateFirstName}
          updateLastName={updateLastName}
          filter={filter}
          emoji={emoji}
        />
        <button onClick={() => deleteAllGuests(guestList)}>
          Delete Guest List
        </button>
      </main>
      <a className="credit" href="http://www.freepik.com">
        Background designed by 0melapics / Freepik
      </a>
    </>
  );
}

export default App;
