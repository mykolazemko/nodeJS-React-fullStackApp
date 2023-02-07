import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import  fetchUser  from "./Redux/slice";
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const URL = "http://localhost:4000/api";
  const [data, setData] = useState(null);
  const [input, setInput] = useState('')
  
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user)
  console.log(users)

  useEffect(() => {
    // dispatch(fetchUser())
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const postMethod = () => {
    
    // console.log(input)
    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        input
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setData({...data, json}));

    setInput('')
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    postMethod()
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new user..."
          value={input}
          onChange={e => setInput(e.target.value)}>
        </input>
</form>
        <button onClick={() => postMethod()}>Create new user</button>
        {!data
          ? "Loading..."
          : data.map((user, index) => {
              return (
                <div>
                  <span>{`${index + 1}. ${user.name}`}</span>
                </div>
              );
            })}
      </header>
    </div>
  );
}

export default App;
