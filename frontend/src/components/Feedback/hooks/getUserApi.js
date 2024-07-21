
import axios from 'axios';

async function getUserApi(){
   const resp =  await axios
    .get("http://localhost:1337/api/forms")
    .then(({data})=>console.log(data))
    .catch((error)=>console.log(error));

    return {
        data: resp.data
    }
}