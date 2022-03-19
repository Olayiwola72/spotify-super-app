import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getAuthorizationCode, signOutSuccess, searchAlbumStart, searchAlbumSuccess, setErrorMessage } from '../../redux/user/user.actions';
import './header.styles.scss';

const Header = ({ userData, userProfile, getAuthorizationCode, signOutSuccess, searchAlbumStart, searchAlbumSuccess, errorMessage, setErrorMessage  }) => {
  const [Value, setValue] = useState("")

  const location = useLocation();
  const pathname = location.pathname;

  const getCode = () => {
    let code = null;
    const queryString = location.search;
    if(queryString.length > 0){
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get('code')
    }
    return code;
  }

  useEffect(() => {
    if(location.search.length > 0){
      let code = getCode();

      !userProfile && getAuthorizationCode(code);
    }
  }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

  const handleLogin = () => {
    let url = process.env.REACT_APP_AUTH_API+'authorize';
    url += `?client_id=${process.env.REACT_APP_CLIENT_ID}`
    url += `&response_type=code`
    url += `&redirect_uri=${encodeURI('http://localhost:3000')}`
    url += `&show_dialog=true`
    url += `&state=${process.env.REACT_APP_CLIENT_ID}`
    url += `&scope=user-read-private user-read-email`

    window.location.href=url; // Show spotify Authorization's page
  }

  const handleChange = (ele) => {
    setErrorMessage(undefined);
    setValue(ele.target.value);
    if(ele.target.value){
      searchAlbumStart(ele.target.value);
    }else{
      searchAlbumSuccess([]);
    }
  }

  return (
    <div className="home">
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center align-items-center">
        <div className="container-fluid align-items-center">
        { userData ?
          <ul className="navbar-nav align-items-center">
            <img src={userProfile?.images.length ? userProfile?.images[0] : `https://ui-avatars.com/api/name=${userProfile?.display_name}?background=random` } alt="Avatar Logo" loading='lazy' className="rounded-pill avatar"/> 
            
           <span className='text-white ms-2'>{userProfile?.display_name}</span>
          </ul> : ''}

          { userData ?
          <form className="d-flex">
            <input className="form-control navbar-search" type="text" placeholder="Search" value={Value} onChange={handleChange}/>
          </form> : ''}

          { userData ?
            pathname === '/' ?
            <Link to="/my-library"className="text-decoration-none" >
              <div className='text-white' component={ Link } to={'my-library'}>My Library</div> 
            </Link>
            : 
            <Link to="/"className="text-decoration-none" >
              <div className='text-white' component={ Link } to={'my-library'}>Home</div> 
            </Link>
          : ''}
        
          { userData ?
            <button className="btn btn-danger" type="button" onClick={signOutSuccess}>Logout</button>
            :
            <button className="btn btn-success" type="button" onClick={handleLogin}>Login</button>
          }
          </div>
      </nav>
      
      { errorMessage ?
        <div className="alert alert-danger text-center" role="alert">
          <img src="https://img.icons8.com/color/48/000000/error--v1.png" loading='lazy' alt="error-icos"/>
          { errorMessage?.error?.message  }
        </div>
      : '' }
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
  userProfile: user.userProfile,
  searchResults: user.searchResults,
  errorMessage: user.errorMessage
});

const mapDispatchToProps = dispatch => ({
  getAuthorizationCode: (data) => dispatch(getAuthorizationCode(data)),
  signOutSuccess: () => dispatch(signOutSuccess()),
  searchAlbumStart: (data) => dispatch(searchAlbumStart(data)),
  searchAlbumSuccess: (data) => dispatch(searchAlbumSuccess(data)),
  setErrorMessage: (data) => dispatch(setErrorMessage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);