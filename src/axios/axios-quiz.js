import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-8481e-default-rtdb.firebaseio.com/'
});