import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
// import Image from './image.jsx';

//properties from the react object

// javascript is async which will finish at an unknwon time in the future (can be inconvenient)
// when we get data from server, we will change state so we use it inside of a useEffect, it can be done at a time that wont cause problems
// fetching data in react we will use useEffect
// new way theres library called request

function App() {
    const [events, setEvents] = useState([]);  
    useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/events")
      const eventData = await response.json()
      console.log(eventData)

      setEvents(eventData)
    }
    fetchData()
  })

  const eventLis = events.map((event) => {
      return <li>{event.name}</li>
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          HELLO <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          {eventLis}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* <Image /> */}
    </div>
  );
}

export default App;
