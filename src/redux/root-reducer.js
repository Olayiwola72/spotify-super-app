import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createWhitelistFilter } from 'redux-persist-transform-filter';

import userReducer from './user/user.reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user'],
	transforms: [
		createWhitelistFilter('user', ['userData','userProfile','newReleases','library', 'errorMessage', 'authorizationCode']),
	]
};

const rootReducer = combineReducers({
	user: userReducer
});

export default persistReducer(persistConfig, rootReducer);