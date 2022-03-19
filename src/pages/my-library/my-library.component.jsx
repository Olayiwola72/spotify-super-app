import { useEffect } from 'react';
import { getFireBaseLibrary, removeFromLibrary } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

import './my-library.styles.scss';

const MyLibrary = ({ userData, getFireBaseLibrary, removeFromLibrary, library }) => {
  useEffect(() => {
    userData && getFireBaseLibrary();
  }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

  return (
    <div>
      { userData ? 
        <div className="jumbotron text-center mt-2 mb-2">
          <h2>My Library</h2>
        </div>
      : ''}

      <div>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              {library && library?.length ? 
                library.map((item) => (
                  <div className="col-md-3" key={item?.id}>
                    <div className="card mb-4 box-shadow">
                      <img className="card-img-top" src={item?.image_url || item.images[0]?.url} alt={item?.name}/>
                      <div className="card-body">
                        <p className="card-text text-center">{item?.name}</p>
                        <div className="text-center">
                          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => removeFromLibrary(item)}>
                            <img loading='lazy' src="https://img.icons8.com/ios/50/000000/minus.png" alt='minus-icon'/>
                            &nbsp;
                            Remove from Library
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )) :
                userData ? <p className='text-center'>You have not added any albums to your library yet.</p> : ''
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
  newReleases: user.newReleases,
  library: user.library
});

const mapDispatchToProps = dispatch => ({
  removeFromLibrary: (data) => dispatch(removeFromLibrary(data)),
  getFireBaseLibrary: (data) => dispatch(getFireBaseLibrary(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyLibrary);