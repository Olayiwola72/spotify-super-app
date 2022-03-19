import { Routes, Route, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Helmet from "react-helmet";
import Header from "../../components/header/header.component";
import Home from '../home/home.component';
import MyLibrary from '../my-library/my-library.component';
import '../index.css';
import './layout.styles.scss';

const App = ({ userData }) => {
  const location = useLocation();
  const pathname = location.pathname;
  
  return (
    <div className="App">
      <Helmet titleTemplate={`%s - Spotify App`}>
        <title>{ pathname === '/' ? 'Home' : 'My Library' }</title>
      </Helmet>

      <Header />
      
      <Routes>
        <Route path="/" element={<Home /> } exact></Route>
        <Route path="/my-library" element={<MyLibrary />} exact></Route>
      </Routes>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  userData: user.userData
});

export default connect(mapStateToProps)(App);