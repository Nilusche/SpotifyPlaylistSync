import {projectAuth} from '../firebase/config.js'
var error = null;
const useLogout = async ()=>{
    
    try{
        await projectAuth.signOut();
        return {error};
    }catch(err){
        error = err.message;
        return {error};
    }    
}


export default useLogout;