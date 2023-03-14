import axios from 'axios';
export class ApiPixabay {
  #KEY = '34406459-24c39aaac56fd7e550f7caf78';
  #BASE_URL = 'https://pixabay.com/api/';
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async getImages() {
    return axios.get(this.#BASE_URL, {
      params: {
        key: this.#KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: this.perPage,
      },
    });
  }
  setSearchQuery(newQuery) {
    this.searchQuery = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
