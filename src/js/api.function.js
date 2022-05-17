const axios = require('axios');
const API_URL = 'https://pixabay.com/api/';
const MY_KEY = '27271391-ec9e700146a6d73283b9a81ee';
const FILTER = '&image_type=photo&orientation=horizontal&safesearch=true';
export default async function getElements(name, page) {
    const item = await axios
        .get(`${API_URL}?key=${MY_KEY}&q=${name}${FILTER}&page=&{page}&per_page=40`)
        .then(function (response) {
            console.log(response)
            return response
        });
    return item;
}
