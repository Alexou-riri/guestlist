// const t_est = 1;

// function GuestList() {
//   const baseUrl = 'http://localhost:5000';
//   const [guestList, setGuestList] = useState({});

//   // useEffect(() => {
//   //   async function fetchData(url) {
//   //     const response = await fetch(url);
//   //     setGuestList(await response.json());
//   //   }
//   //   fetchData(`${baseUrl}/`);
//   // }, []);
//   const createGuest = () => {
//     fetch(`${baseUrl}/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ firstName: 'Karl', lastName: 'Horky' }),
//     });
//   };

//   createGuest();

//   useEffect(() => {
//     fetch('http://localhost:5000/')
//       .then((response) => response.json())
//       .then((data) => setGuestList(JSON.stringify(data)));
//   }, []);
