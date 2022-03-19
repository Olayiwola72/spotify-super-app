import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(config);

// export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserLibraryDocument = async (clientId, payload) => {
    const createdAt = new Date();
    const firbaseArray = [];
    const userRef = firebase.firestore().doc(`library/${clientId}`);
    
    for(let payloadObj of payload){
        const { id, image_url, images, name, release_date } = payloadObj;
        const image_url_req = image_url || images[0].url;

        firbaseArray.push({
            id: id,
            image_url: image_url_req,
            name: name,
            release_date: release_date,
            createdAt: createdAt
        })
    }

    const firbaseObj = firbaseArray.map((obj)=> {return Object.assign({}, obj)});

    try{
        await userRef.set({ firbaseObj })
        return { type: 'success', data: '', message:'' }
    }catch(error){
       return { type: 'error', message: error.message, data: ''}
    }
}

export const getUserLibraryDocument = async (clientId) => {
    const userRef = firebase.firestore().doc(`library/${clientId}`);
    const doc = await userRef.get();

    if (!doc.exists) {
        return [];
    } else {
        return doc.data()['firbaseObj'];
    }
}