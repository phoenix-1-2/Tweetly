import axios from 'axios';

const app = axios.create({
    baseURL : 'https://tweetly-d85db-default-rtdb.firebaseio.com/'
});

export default app;