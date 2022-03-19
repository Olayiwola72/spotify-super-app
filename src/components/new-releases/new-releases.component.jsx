import { saveToLibrary, removeFromLibrary } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

import './new-releases.styles.scss';

const NewReleases = ({ userData, newReleases, saveToLibrary, removeFromLibrary, library }) => {
  return (
    <div>
      { userData ? 
        <div className="jumbotron text-center mt-2 mb-2">
          <h2>New Releases</h2>
        </div>
      : ''}

      <div>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              {newReleases && newReleases?.length ?
               newReleases.map((newRelease) => (
                <div className="col-md-3" key={newRelease?.id}>
                  <div className="card mb-4 box-shadow">
                    <img className="card-img-top" src={newRelease?.images[0]?.url} alt={newRelease?.name}/>
                    <div className="card-body">
                      <p className="card-text text-center">{newRelease?.name}</p>
                      <div className="text-center">
                        {library.filter(library => library.id === newRelease.id).length ? 
                          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => removeFromLibrary(newRelease)}>
                            <img loading='lazy' src="https://img.icons8.com/ios/50/000000/minus.png" alt='minus-icon'/>
                            &nbsp;
                            Remove from Library
                          </button>
                        : 
                          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => saveToLibrary(newRelease)}>
                            <img loading='lazy' src="https://img.icons8.com/external-tanah-basah-detailed-outline-tanah-basah/48/000000/external-plus-user-interface-tanah-basah-detailed-outline-tanah-basah.png" alt='plus-icon'/>
                            &nbsp;
                            Save to Library
                        </button>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )): ''}
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
  saveToLibrary: (data) => dispatch(saveToLibrary(data)),
  removeFromLibrary: (data) => dispatch(removeFromLibrary(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewReleases);