import {projectFirestore} from '../firebase/config.js'
import {ref, watchEffect} from 'vue'
const getCollection = (collection)=>{
    var error = null;
    var docs = ref(null)
    
    let collectionRef =  projectFirestore.collection(collection)
    .orderBy('createdAt');
    const unsub = collectionRef.onSnapshot((snap)=>{
        let results = []
        snap.docs.forEach((doc)=>{
            doc.data().createdAt && results.push({...doc.data(), id: doc.id});
        });
        docs.value = results;
        error = null;
    }, (err)=>{
        error = err;
        console.log(err);
    })
    
    watchEffect((onInvalidate)=>{
        onInvalidate(()=>{
            unsub();
        })
    })
    return {error, docs};
}

export default getCollection;