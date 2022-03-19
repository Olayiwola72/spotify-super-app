import UserActionTypes from './user.types';

const INITIAL_STATE = {
	isFetching: false,
	authorizationCode: undefined,
	userData: undefined,
	userProfile: undefined,
	client_id: process.env.REACT_APP_CLIENT_ID,
	client_secret: process.env.REACT_APP_CLIENT_SECRET,
	errorMessage: undefined,
	newReleases: [],
	searchResults: [],
	library: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type){
		case UserActionTypes.SIGN_IN_SUCCESS:
			return {
				...state,	
				userData: action.payload,
				searchResults: [],
				errorMessage: undefined
			}
		case UserActionTypes.SIGN_IN_FAILURE:
			return {
				...state,	
				userData: undefined,
				userProfile: undefined,
				authorizationCode: undefined,
				newReleases: [],
				errorMessage: action.payload,
				searchResults: [],
				library: []
			}
		case UserActionTypes.GET_USER_PROFILE_SUCCESS:
			return {
				...state,	
				userProfile: action.payload
			}
		case UserActionTypes.GET_USER_PROFILE_FAILURE:
			return {
				...state,	
				userProfile: undefined,
				errorMessage: action.payload
			}
		case UserActionTypes.GET_NEW_RELEASES_SUCCESS:
		return {
			...state,	
			newReleases: action.payload.albums.items
		}
		case UserActionTypes.GET_NEW_RELEASES_FAILURE:
			return {
				...state,	
				newReleases: [],
				errorMessage: action.payload
			}
		case UserActionTypes.UPDATE_LIBRARY_SUCCESS:
			return {
				...state,	
				library: action.payload
			}
		case UserActionTypes.SAVE_TO_LIBRARY:
		return {
			...state,	
			library: state.library.concat(action.payload)
		}
		case UserActionTypes.REMOVE_FROM_LIBRARY:
			return {
				...state,	
				library: state.library.filter(library => library.id !== action.payload.id)
			}
		case UserActionTypes.SIGN_OUT_SUCCESS:
			return {
				...state,	
				userData: undefined,
				userProfile: undefined,
				token: undefined,
				authorizationCode: undefined,
				client_id: undefined,
				client_secret: undefined,
				errorMessage: undefined,
				newReleases: [],
				searchResults: [],
				library: []
			}
		case UserActionTypes.SEARCH_ALBUM_SUCCESS:
			return {
				...state,	
				searchResults: action.payload.hasOwnProperty('albums') ? action.payload.albums.items : []
			}
		case UserActionTypes.SEARCH_ALBUM_FAILURE:
			return {
				...state,	
				searchResults: [],
				errorMessage: action.payload
			}
		case UserActionTypes.SET_ERROR_MESSAGE:
			return {
				...state,
				errorMessage: action.payload
			}
		case UserActionTypes.GET_AUTHORIZATION_CODE:
			return {
				...state,
				authorizationCode: action.payload
			}
		default:
			return state;
	}
}

export default userReducer;