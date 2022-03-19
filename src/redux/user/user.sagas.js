import { select, takeLatest, put, all, call } from 'redux-saga/effects';
import axios from 'axios';
import { Buffer } from 'buffer';
import UserActionTypes from './user.types';
import { signInSuccess, signInFailure, getUserProfileSuccess, getUserProfileFailure, getNewReleasesSuccess, getNewReleasesFailure, searchAlbumSuccess, searchAlbumFailure, setErrorMessage, updateLibrarySuccess } from './user.actions';
import { createUserLibraryDocument, getUserLibraryDocument } from '../../firebase/firebase.utils';

const qs = require('qs');


export const getAuthorizationCode = (state) => state.user.authorizationCode;
export const getUserData = (state) => state.user.userData;
export const getUserProfileData = (state) => state.user.userProfile;
export const getLibrary = (state) => state.user.library;

export function* AuthWithSpotify(){ 
    const authorizationCode = yield select(getAuthorizationCode);

    const config = {
        method: 'post',
        url: process.env.REACT_APP_AUTH_API+'api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded' 
        },
        data: qs.stringify({
            'grant_type':'authorization_code',
            'code': authorizationCode,
            'redirect_uri': process.env.REACT_APP_REDIRECT_URI
        })
    }; 

    try {
        const { data } = yield axios(config);
        yield put(signInSuccess(data));
    } catch (error) {
        yield put(signInFailure(error.response?.data));
    }
}

export function* getUserProfile(){
    const userData = yield select(getUserData);

    const config = {
        method: 'get',
        url: process.env.REACT_APP_API_BASE_URL+'me',
        headers: {
            'Authorization': 'Bearer ' + userData.access_token,
            'Content-Type': 'application/json' 
        },
    };

    try {
        const { data } = yield axios(config);
        yield put(getUserProfileSuccess(data));
    } catch (error) {
        yield put(getUserProfileFailure(error?.response?.data));
    }
}

export function* getNewReleases(){
    const token = yield select(getUserData);

    const config = {
        method: 'get',
        url: process.env.REACT_APP_API_BASE_URL+'browse/new-releases',
        headers: {
            'Authorization': 'Bearer ' + token.access_token,
            'Content-Type': 'application/json' 
        },
    };
    
    try {
        const { data } = yield axios(config);
        yield put(getNewReleasesSuccess(data));
    } catch (error) {
        yield put(getNewReleasesFailure(error?.response?.data));
    }
}

export function* searchAlbum({ payload }){
    const token = yield select(getUserData);

    const config = {
        method: 'get',
        url: process.env.REACT_APP_API_BASE_URL+'search?type=album&include_external=audio&q='+payload,
        headers: {
            'Authorization': 'Bearer ' + token.access_token,
            'Content-Type': 'application/json' 
        },
    };

    try {
        const { data } = yield axios(config);
        yield put(searchAlbumSuccess(data));
    } catch (error) {
        yield put(searchAlbumFailure(error?.response?.data));
    }
}

export function* updateFirebase(){
    const userProfile = yield select(getUserProfileData);
    const library = yield select(getLibrary);
    const data = yield createUserLibraryDocument(userProfile.id, library);

    if(data.message){
        yield put(setErrorMessage(data.message));
    }
}

export function* getFirebaseLibraryData(){
    const userProfile = yield select(getUserProfileData);
    const data = yield getUserLibraryDocument(userProfile.id);
    yield put(updateLibrarySuccess(data));
}

export function* onSpotifyAuthStart() {
    yield takeLatest(UserActionTypes.GET_AUTHORIZATION_CODE, AuthWithSpotify);
}

export function* onGetUserProfile() {
    yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, getUserProfile);
}

export function* onGetNewReleasesCall() {
    yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, getNewReleases);
}

export function* onSearchAlbumStart() {
    yield takeLatest(UserActionTypes.SEARCH_ALBUM_START, searchAlbum);
}

export function* onSaveToLibrary() {
    yield takeLatest(UserActionTypes.SAVE_TO_LIBRARY, updateFirebase);
}

export function* onRemoveFromLibrary() {
    yield takeLatest(UserActionTypes.REMOVE_FROM_LIBRARY, updateFirebase);
}

export function* onGetFirebaseLibraryData(){
    yield takeLatest(UserActionTypes.GET_USER_PROFILE_SUCCESS, getFirebaseLibraryData);
}

export function* userSagas() {
    yield all([
        call(onSpotifyAuthStart),
        call(onGetUserProfile),
        call(onGetNewReleasesCall),
        call(onSearchAlbumStart),
        call(onSaveToLibrary),
        call(onRemoveFromLibrary),
        call(onGetFirebaseLibraryData),
    ]); 
}