import UserActionTypes from './user.types';

export const spotifyAuthStart = () => ({
	type: UserActionTypes.SPOTIFY_AUTH_START,
});

export const getAuthorizationCode = (data) => ({
	type: UserActionTypes.GET_AUTHORIZATION_CODE,
	payload: data
});

export const signInSuccess = (data) => ({
	type: UserActionTypes.SIGN_IN_SUCCESS,
	payload: data
});

export const signInFailure = (data) => ({
	type: UserActionTypes.SIGN_IN_FAILURE,
	payload: data
});

export const signOutSuccess = () => ({
	type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const getUserProfileSuccess = (data) => ({
	type: UserActionTypes.GET_USER_PROFILE_SUCCESS,
	payload: data
});

export const getUserProfileFailure = (data) => ({
	type: UserActionTypes.GET_USER_PROFILE_FAILURE,
	payload: data
});

export const getNewReleasesSuccess = (data) => ({
	type: UserActionTypes.GET_NEW_RELEASES_SUCCESS,
	payload: data
});

export const getNewReleasesFailure = (data) => ({
	type: UserActionTypes.GET_NEW_RELEASES_FAILURE,
	payload: data
});

export const getFireBaseLibrary = () => ({
	type: UserActionTypes.GET_FIREBASE_LIBRARY,
});

export const saveToLibrary = (data) => ({
	type: UserActionTypes.SAVE_TO_LIBRARY,
	payload: data
});

export const removeFromLibrary = (data) => ({
	type: UserActionTypes.REMOVE_FROM_LIBRARY,
	payload: data
});

export const updateLibrarySuccess = (data) => ({
	type: UserActionTypes.UPDATE_LIBRARY_SUCCESS,
	payload: data
});

export const searchAlbumStart = (data) => ({
	type: UserActionTypes.SEARCH_ALBUM_START,
	payload: data
});

export const searchAlbumSuccess = (data) => ({
	type: UserActionTypes.SEARCH_ALBUM_SUCCESS,
	payload: data
});

export const searchAlbumFailure = (data) => ({
	type: UserActionTypes.SEARCH_ALBUM_FAILURE,
	payload: data
});

export const setErrorMessage = (data) => ({
	type: UserActionTypes.SET_ERROR_MESSAGE,
	payload: data
});