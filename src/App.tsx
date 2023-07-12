import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import {Fragment} from 'react';
import Navbar from './components/header/navbar';
import Home from './pages/home';
import Footer from './components/footer/foot';
import Appbar from './components/header/appbar';

function App() {
  return (
    <Router>
      <Fragment>
          <Navbar />
          <Appbar />
          <Routes>
            <Route path='/' element={<Home/>} />
          </Routes>
          <Footer />
      </Fragment>
    </Router>
  );
}

export default App;
