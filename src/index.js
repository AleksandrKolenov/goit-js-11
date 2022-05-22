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

 async function getFetch() {
  const parseData = await dataJson.onFetch() 
  // .then(console.log)
  const markUp = await renderMarcup(parseData)
   const render = await onRender(markUp)
   return render;
}

 function onSubmit(e) {
  e.preventDefault();
  button.removeAttribute('disabled');
  dataJson.query = e.currentTarget.elements.searchQuery.value.trim();
  if (dataJson.query=== ''){
    button.setAttribute('disabled', true);
    return Notify.warning('Please enter your request');
    checkEndOfResult(object);
   }
   
  function checkEndOfResult(object) {
     if (object.hits.length < dataJson.per_page) {
       button.setAttribute('disabled', true);
       return Notify.info("We're sorry, but you've reached the end of search results.");
     }
   }

  onClear();
  dataJson.resetPage();
  
  try {
    dataJson.onFetch()
      .then((object) =>{
        checkResponse(object);
        return renderMarcup(object);
      })
    .then(onRender)
  } catch {
    onError();
  }
};

function checkResponse(object) {
  if (object.total === 0) {
    button.setAttribute('disabled', true);
  return  Notify.failure('Sorry, there are no images matching your search query. Please try again.')
  }
  button.removeAttribute('disabled');
  Notify.success(`Hooray! We found ${object.totalHits} images`);
  checkEndOfResult(object);
}

function checkEndOfResult(object) {
     if (object.hits.length < dataJson.per_page) {
       button.setAttribute('disabled', true);
       return Notify.info("We're sorry, but you've reached the end of search results.");
     }
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
   dataJson.onFetch()
      .then((object) =>{
        checkEndOfResult(object);
        return renderMarcup(object);
      })
    .then(onRender)
}

function onError() {
  button.setAttribute('disabled', true);
 return Notify.failure('Ooops, that went wrong. Please try again later')
};