import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import {Fragment} from 'react';
import Navbar from './components/header/navbar';
import Main from './components/body/mainContainer';

function App() {
  return (
    <Router>
      <Fragment>
          <Navbar />
          <Routes>
            <Route path='/' element={<Main/>}>
            </Route>
          </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
