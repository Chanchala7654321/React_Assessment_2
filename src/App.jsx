import { useState, useEffect } from "react";
import useDebounce from "./components/Debounce";
import './App.css';

function App() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);
  const [loding, setLoding] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(search, 500);

  const fatchUser = async (user) => {
    setLoding(true);
    setError(null);

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!res.ok) {
        throw new Error("User not found");
      }

      const data = await res.json();

      const filteredUsers = data.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );

      setUser(filteredUsers);
    } catch (error) {
      setError(error.message);
      setUser([]);
    } finally {
      setLoding(false);
    }
  };

  useEffect(() => {
    fatchUser();
  }, [debouncedSearch]);

  return (
    <div className="container">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter the Name"
      />

      {loding && <div>Loading...</div>}

      {error && <div>{error}</div>}

      {user.map((item) => (
        <div className="userCard" key={item.id}>
          <h3>{item.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
