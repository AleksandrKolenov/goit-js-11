import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const button = document.querySelector('.load-more');

form.addEventListener('submit', onSubmit);

const URL = 'https://pixabay.com/api/';
const KEY = '27271391-ec9e700146a6d73283b9a81ee';

const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: 1,
  per_page: 5,	
});


function onSubmit(e) {
  e.preventDefault();
  const inp = e.currentTarget.elements.searchQuery.value;
  return fetch(`${URL}?key=${KEY}&q=${inp}&${searchParams}`)
  .then(r => r.json())
    .then(data=>data.hits)
    .then(renderMarcup)
    .then(onRender)
};


function renderMarcup(marcup) {
  return marcup.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</${downloads}
    </p>
  </div>
</div>`
  }).join('');
};

function onRender(cart) {
  gallery.insertAdjacentHTML('beforeend', cart);
}
