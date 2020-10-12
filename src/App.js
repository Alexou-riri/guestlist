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
const baseUrl = 'https://react-guestlist-api.herokuapp.com';
function App() {
  // setState initially to empty array, until use Effect fetches data from the server
  const [guestList, setGuestList] = useState([]);
  // define filters as variables to enable autocomplete to show attending and not attending guests, initially set to show all
  const showAll = 'showAll';
  const showAttending = 'showAttending';
  const showNotAttending = 'showNotAttending';
  const [filter, setFilter] = useState(showAll);

  // initialize emoji to local storage, otherwise to empty string
  const [emoji, setEmoji] = useState(
    localStorage.getItem('emojiInLocalStorage' || ' '),
  );
  const [loading, setLoading] = useState(false);

  const handleEmojiChange = (e) => {
    setEmoji(e.currentTarget.value);
  };
  // when emoji state changes, update local storage
  useEffect(() => {
    localStorage.setItem('emojiInLocalStorage', emoji);
  }, [emoji]);

  // function to fetch GuestList form the server and set guestList
  async function fetchGuestList() {
    const response = await fetch(`${baseUrl}/`);
    const data = await response.json();
    setGuestList(data);
  }

  useEffect(() => {
    if (loading === false) {
      fetchGuestList();
    }
  }, [loading]);

  // function to post new Guest to the server
  async function postGuest(first, last, deadline) {
    setLoading(true);
    await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: first,
        lastName: last,
        deadline: deadline,
      }),
    });
    setLoading(false);
  }

  // function to delete one guest from the server
  async function deleteGuestFromServer(id) {
    setLoading(true);
    await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    setLoading(false);
  }

  // function to patch attendance for one guest
  async function patchAttendance(id, newAttendance) {
    setLoading(true);
    await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: newAttendance }),
    });
    setLoading(false);
  }
  // function to patch new value for names
  async function patchName(id, newValue, keyToUpdate) {
    setLoading(true);
    if (keyToUpdate === 'firstName') {
      await fetch(`${baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName: newValue }),
      });
      setLoading(false);
    } else if (keyToUpdate === 'lastName') {
      await fetch(`${baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lastName: newValue }),
      });
      setLoading(false);
    }
  }

  const deleteAllGuests = (guestList) => {
    for (let i = 0; i < guestList.length; i++) {
      deleteGuestFromServer(guestList[i].id);
    }
  };

  const toggleAttendance = (id) => {
    const guestToModify = guestList.find((guest, ind) => {
      if (guest.id === id) {
      }
      return guest.id === id;
    });
    // change the value of the attending property in the  element the filter returned
    const modifiedGuest = {
      ...guestToModify,
      attending: !guestToModify.attending,
    };

    patchAttendance(id, modifiedGuest.attending);
  };

  const deleteGuest = (id) => {
    deleteGuestFromServer(id);
  };

  const updateFirstName = (id, value) => {
    patchName(id, value, 'firstName');
  };
  const updateLastName = (id, value) => {
    patchName(id, value, 'lastName');
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
        <GuestInviteForm postGuest={postGuest} />
        <div>Add some decoration: </div>
        <select onChange={(e) => handleEmojiChange(e)}>
          <option value={'🎩'}>{'🎩'}</option>
          <option value={'👒'}>{'👒'}</option>
          <option value={'🎉'}>{'🎉'}'</option>
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
