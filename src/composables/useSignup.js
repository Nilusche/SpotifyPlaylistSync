import {projectAuth} from '../firebase/config.js'
var error = null;
const useSignup = async (email, password, displayName)=>{
    
    try{
        const res= await projectAuth.createUserWithEmailAndPassword(email, password);
        if(!res) 
            throw new Error('User not created');
        const user = res.user;
        await user.updateProfile({displayName});
        error = null;
        return {error, user} ;
    }catch(err){
        error = err;
        return {error, user: null};
    }    
}


export default useSignup;