import API from './js/api.function';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';


const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const button = document.querySelector('.load-more');
const dataJson = new API();


form.addEventListener('submit', onSubmit);
button.addEventListener('click', onLoadMore)

button.setAttribute('disabled', true);

const lightbox = new SimpleLightbox('.gallery a', { loop: true, enableKeyboard: true, docClose: true }); 

function getFetch() {
  dataJson.onFetch() 
  // .then(console.log)
  .then(renderMarcup)
  .then(onRender)
}

function onSubmit(e) {
  e.preventDefault();
  button.removeAttribute('disabled');
  dataJson.query = e.currentTarget.elements.searchQuery.value;
  if (dataJson.query=== ''){
    button.setAttribute('disabled', true);
    return Notify.warning('Please enter your request');
  }

  onClear();
  dataJson.resetPage();
  
  try {
    dataJson.onFetch()
      .then((object) =>{
      checkResponse(object)
      })
    .then(onRender)
  } catch {
    onError();
  }
};

function checkResponse(object) {
  if (Object.total === 0) {
    button.setAttribute('disabled', true);
  return  Notify.failure('Sorry, there are no images matching your search query. Please try again.')
  }
  button.removeAttribute('disabled')
  Notify.seccuss('Hooray! We found ${object.totalHits} images');
}

function renderMarcup(marcup) {
  return marcup.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `<a class='gallery_item' href='${largeImageURL}'>
    <div class="photo-card">
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
</div>
</a>`
  }).join('');
};

function onRender(cart) {
  gallery.insertAdjacentHTML('beforeend', cart);
lightbox.refresh()
}

function onClear() {
  gallery.innerHTML = '';
}

function onLoadMore() {
  getFetch();
}

function onError() {
  // button.setAttribute('disabled', true);
 return Notify.failure('Ooops, that went wrong. Please try again later')
};