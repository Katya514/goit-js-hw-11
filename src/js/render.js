export function renderImages(array, ref) {
  const markup = array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <a href=${largeImageURL} class="photo-card">
  <div class="img-box"> <img class="image" src="${webformatURL}" alt="${tags}" height="150" loading="lazy" /></div>
  <div class="info">
    <p class="info-item">
      <b>Likes: <span class="value"> ${likes}</span></b>
    </p>
    <p class="info-item">
      <b>Views: <span class="value"> ${views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments: <span class="value"> ${comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads: <span class="value"> ${downloads}</span></b>
    </p>
  </div>
</a>
  `
    )
    .join('');

  ref.insertAdjacentHTML('beforeend', markup);
}
