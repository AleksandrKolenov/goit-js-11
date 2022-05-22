import axios from "axios";

const URL = 'https://pixabay.com/api/';
const KEY = '27271391-ec9e700146a6d73283b9a81ee';
// const API_URL = 'https://pixabay.com/api/';
// const MY_KEY = '27271391-ec9e700146a6d73283b9a81ee';
// const FILTER = '&image_type=photo&orientation=horizontal&safesearch=true';
// export default async function getElements(name, page) {
//     const item = await axios
//         .get(`${API_URL}?key=${MY_KEY}&q=${name}${FILTER}&page=&{page}&per_page=40`)
//         .then(function (response) {
//             console.log(response)
//             return response
//         });
//     return item;
// }

  

export default class ApiService{
    constructor() {
      this.searchQuery = '';
      this.page = 1;
      this.per_page = 40;
    }
    onFetch() {
return axios.get(URL, {
            params: {
              key: KEY,
              q: this.searchQuery,
              image_type: 'photo',
             orientation: 'horizontal',
             safesearch: 'true',
              page: this.page,
             per_page: this.per_page,
        
            }
          })
        .then(response => {
          this.incrementPage();
          return response.data;
       })
  };
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    return this.searchQuery = newQuery;
  }
}
