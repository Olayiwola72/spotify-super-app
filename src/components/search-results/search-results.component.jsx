import { connect } from 'react-redux';
import { saveToLibrary, removeFromLibrary } from '../../redux/user/user.actions';
import './search-results.styles.scss';

const SearchResults = ({ userData, searchResults, library, saveToLibrary, removeFromLibrary }) => {
  return (
    <div>
      { userData && searchResults && searchResults?.length ? 
        <div className="jumbotron text-center mt-2 mb-2">
          <h2>Search Results</h2>
        </div>
      : ''}
      
      <div>
        <div className="album py-3 bg-light">
          <div className="container">
            <table className="table">
              <tbody>  
                {searchResults && searchResults.map((newRelease) => (
                  <tr key={newRelease?.id}>
                    <td><img src={newRelease?.images[0]?.url} alt="Avatar Logo" loading='lazy' className="rounded-pill avatar"/> </td>
                    <td>{newRelease?.name}</td>
                    <td>{newRelease?.artists[0].name}</td>
                    <td>{newRelease?.release_date}</td>
                    <td>
                      {library.filter(library => library.id === newRelease.id).length ? 
                          <button type="button" className="btn btn-sm" onClick={() => removeFromLibrary(newRelease)}>
                            <img loading='lazy' src="https://img.icons8.com/ios/28/000000/minus.png" alt='minus-icon'/>
                          </button>
                        : 
                          <button type="button" className="btn btn-sm" onClick={() => saveToLibrary(newRelease)}>
                            <img loading='lazy' src="https://img.icons8.com/external-tanah-basah-detailed-outline-tanah-basah/28/000000/external-plus-user-interface-tanah-basah-detailed-outline-tanah-basah.png" alt='plus-icon'/>
                        </button>
                        }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
  searchResults: user.searchResults,
  library: user.library
});

const mapDispatchToProps = dispatch => ({
  saveToLibrary: (data) => dispatch(saveToLibrary(data)),
  removeFromLibrary: (data) => dispatch(removeFromLibrary(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);