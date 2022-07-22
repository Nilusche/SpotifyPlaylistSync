import {projectFirestore} from '../firebase/config.js'

const useCollection = (collection)=>{
    var error = null;

    const addDoc = async (doc) => {
        error = null;
        try{
            await projectFirestore.collection(collection).add(doc);
        }
        catch(e){
            error = e;
            console.log(error)
        }
    }
    return {error, addDoc};
}

export default useCollection;