import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
} from 'react-router-dom';

import './App.css';

import Navbar from './Components/Navbar';
import People from './Components/People';
import Submissions from './Components/Submissions/Submissions';

function PersonPage() {
  const { email } = useParams();
  return <h1>{email}</h1>
}

const homeHeader = "Journal of React";

function Home() {
  const styles = {
    'textAlign': 'center',
  }
  return <h1 style={styles} >{homeHeader}</h1>
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="people" element={<People />} />
        <Route path="people/:email" element={<PersonPage />} />
        <Route path="submissions" element={<Submissions /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export {
  homeHeader,
};