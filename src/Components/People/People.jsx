import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
 
import { BACKEND_URL } from '../../constants';

import './People.css';

const PEOPLE_READ_ENDPOINT = `${BACKEND_URL}/people`;
const PEOPLE_CREATE_ENDPOINT = `${BACKEND_URL}/people/create`;
const ROLES_ENDPOINT = `${BACKEND_URL}/roles`

function AddPersonForm({
  visible,
  cancel,
  fetchPeople,
  setError,
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const changeName = (event) => { setName(event.target.value); };
  const changeEmail = (event) => { setEmail(event.target.value); };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: name,
      email: email,
      roles: 'ED',
      affiliation: '',
    }
    axios.put(PEOPLE_CREATE_ENDPOINT, newPerson)
      .then(fetchPeople)
      .catch((error) => { setError(`There was a problem adding the person. ${error}`); });
  };

  const getRoles = () => {
    axios.get(ROLES_ENDPOINT)
      .then(({ data }) => console.log(data))
      .catch((error) => { setError(`There was a problem getting roles. ${error}`); });
  }
  getRoles();

  if (!visible) return null;
  return (
    <form>
      <label htmlFor="name">
        Name
      </label>
      <input required type="text" id="name" value={name} onChange={changeName} />
      <label htmlFor="email">
        Email
      </label>
      <input required type="text" id="email" onChange={changeEmail} />
      <button type="button" onClick={cancel}>Cancel</button>
      <button type="submit" onClick={addPerson}>Submit</button>
    </form>
  );
}
AddPersonForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchPeople: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
};

function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      {message}
    </div>
  );
}
ErrorMessage.propTypes = {
  message: propTypes.string.isRequired,
};

function Person({ person, fetchPeople }) {
  const { name, email } = person;

  const deletePerson = () => {
    axios.delete(`${PEOPLE_READ_ENDPOINT}/${email}`)
      .then(fetchPeople)
  }

  return (
    <div>
      <Link to={email}>
        <div className="person-container">
          <h2>{name}</h2>
          <p>
            Email: {email}
          </p>
        </div>
      </Link>
      <button onClick={deletePerson}>Delete person</button>
    </div>
  );
}
Person.propTypes = {
  person: propTypes.shape({
    name: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
  }).isRequired,
  fetchPeople: propTypes.func,
};

function peopleObjectToArray(Data) {
  const keys = Object.keys(Data);
  const people = keys.map((key) => Data[key]);
  return people;
}

function People() {
  const [error, setError] = useState('');
  const [people, setPeople] = useState([]);
  const [addingPerson, setAddingPerson] = useState(false);

  const fetchPeople = () => {
    axios.get(PEOPLE_READ_ENDPOINT)
      .then(
        ({ data }) => { setPeople(peopleObjectToArray(data)) }
    )
      .catch((error) => setError(`There was a problem retrieving the list of people. ${error}`));
  };

  const showAddPersonForm = () => { setAddingPerson(true); };
  const hideAddPersonForm = () => { setAddingPerson(false); };

  useEffect(fetchPeople, []);

  return (
    <div className="wrapper">
      <header>
        <h1>
          View All People
        </h1>
        <button type="button" onClick={showAddPersonForm}>
          Add a Person
        </button>
      </header>
      <AddPersonForm
        visible={addingPerson}
        cancel={hideAddPersonForm}
        fetchPeople={fetchPeople}
        setError={setError}
      />
      {error && <ErrorMessage message={error} />}
      {people.map((person) => <Person key={person.email} person={person} fetchPeople={fetchPeople} />)}
    </div>
  );
}

export default People;
