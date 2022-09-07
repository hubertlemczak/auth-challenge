import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';

const apiUrl = 'http://localhost:4000';

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
    };
    fetch(`${apiUrl}/movies`, opts)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          return alert(res.error);
        }
        setMovies(res.data);
      });
  };

  useEffect(fetchMovies, []);

  const handleRegister = async ({ username, password }) => {
    const opts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    };

    const res = await fetch(`${apiUrl}/users/register`, opts);
    const data = await res.json();

    if (data.error) {
      return alert(data.error);
    }
  };

  const handleLogin = async ({ username, password }) => {
    const opts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    };

    const res = await fetch(`${apiUrl}/users/login`, opts);
    const data = await res.json();

    if (data.error) {
      return alert(data.error);
    }

    const token = 'Bearer ' + data.data;

    localStorage.setItem('accessToken', token);
    fetchMovies();
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({ title, description, runtimeMins }),
    };

    const res = await fetch(`${apiUrl}/movies`, opts);
    const data = await res.json();

    if (data.error) {
      return alert(data.error);
    }

    setMovies(curr => [...curr, data.data]);
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />

      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />

      <h1>Create a movie</h1>
      <MovieForm handleSubmit={handleCreateMovie} />

      <h1>Movie list</h1>
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Description: {movie.description}</p>
              <p>Runtime: {movie.runtimeMins}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
