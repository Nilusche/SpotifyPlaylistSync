import {projectAuth} from '../firebase/config.js'

var user = projectAuth.currentUser;
projectAuth.onAuthStateChanged((_user)=>{
    user = _user;
});

const getUser = ()=>{
    return user;
}

export default getUser;
