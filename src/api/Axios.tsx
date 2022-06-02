import Axios from 'axios';

export default Axios.create({
    baseURL:"http://143.198.234.42", // for production
    // baseURL:"http://localhost:3000", // only for local
    withCredentials: false,
    headers:{
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
});