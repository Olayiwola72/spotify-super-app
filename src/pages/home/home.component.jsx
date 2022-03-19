import { connect } from 'react-redux';
import NewReleases from '../../components/new-releases/new-releases.component';
import SearchResults from '../../components/search-results/search-results.component';
import './home.styles.scss';

const Home = ({ userData ,searchResults  }) => {
  return (
    <div className="home">
      { userData ? 
        <div>
          <NewReleases />
          <SearchResults searchResults={searchResults}/>
        </div>
      : ''}
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
  searchResults: user.searchResults,
});

export default connect(mapStateToProps)(Home);