import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { ApiPixabay } from './js/ApiPixabay';
import { renderImages } from './js/render';

const refs = {
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
const apiPixabay = new ApiPixabay();
refs.loadMoreBtn.style.display = 'none';

async function onSearchFormSubmit(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  apiPixabay.resetPage();
  const value = event.target.elements.searchQuery.value.trim();
  if (!value) {
    return Notiflix.Notify.failure('Please enter the keyword');
  }
  apiPixabay.setSearchQuery(value);
  const {
    data: { hits, totalHits },
  } = await apiPixabay.getImages();

  if (apiPixabay.page >= Math.ceil(totalHits / apiPixabay.perPage)) {
    refs.loadMoreBtn.style.display = 'none';
  } else {
    refs.loadMoreBtn.style.display = 'block';
  }

  if (!hits.length) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  renderImages(normalizeHits(hits), refs.gallery);
  lightbox.refresh();
}

function normalizeHits(array) {
  return array.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      };
    }
  );
}

async function onLoadMoreBtnClick() {
  apiPixabay.incrementPage();
  const {
    data: { hits, totalHits },
  } = await apiPixabay.getImages();
  if (apiPixabay.page >= Math.ceil(totalHits / apiPixabay.perPage)) {
    refs.loadMoreBtn.style.display = 'none';
  } else {
    refs.loadMoreBtn.style.display = 'block';
  }
  renderImages(normalizeHits(hits), refs.gallery);
  onScroll();
  lightbox.refresh();
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

function onScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
