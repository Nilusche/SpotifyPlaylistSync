import {projectAuth} from '../firebase/config.js'
var error = null;
const useLogin = async (email, password)=>{
    
    try{
        const res= await projectAuth.signInWithEmailAndPassword(email, password);
        if(!res) 
            throw new Error('User not created');
        const user = res.user;
        error = null;
        return {error, user} ;
    }catch(err){
        error = err;
        return {error, user: null};
    }    
}


export default useLogin;