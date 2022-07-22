import { projectStorage } from "@/firebase/config";
import { ref,} from "vue";
import getUser from "@/composables/getUser";

const {user} = getUser();

const useStorage = () => {
    const error = ref(null);
    const url  = ref(null);
    const filePath = ref(null);

    const uploadFile = async (file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`;
        const storageRef = projectStorage.ref(filePath.value);
        try{
            const res = await storageRef.put(file);
            url.value = await res.ref.getDownloadURL();
        }catch(err){
            error.value = err;
            console.log(error.value)
        }
    }


    return {url, filePath, error, uploadFile};

}

export default useStorage;