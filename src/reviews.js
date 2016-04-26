'use strict';
/* global reviews */
var reviewsFilter = document.getElementsByClassName('reviews-filter')[0];
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
//var filtersContainer = document.querySelector('.reviews-filter');
var elementToClone;
var reviewsBlock = document.getElementsByClassName('reviews')[0];

/** @constant {string} */
var ACTIVE_FILTER_CLASSNAME = 'review-filter-active';

var ratingStarsClassName = {
  '1': 'review-rating-one',
  '2': 'review-rating-two',
  '3': 'review-rating-three',
  '4': 'review-rating-four',
  '5': 'review-rating-five'
};

reviewsFilter.classList.add('invisible');

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

/** @constant {number} */
var IMAGE_LOAD_TIMEOUT = 10000;

var getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);

  var image = element.querySelector('img');

  element.querySelector('.review-rating').classList.add(ratingStarsClassName[data['rating']]);
  element.querySelector('.review-text').textContent = data.description;
  container.appendChild(element);

  var userpic = new Image(124, 124);

  userpic.onload = function() {
    clearTimeout(userpicLoadTimeout);
    image.setAttribute('src', data.author.picture);
  };

  userpic.src = data.author.picture;

  var userpicLoadTimeout = setTimeout(function() {
    image.src = '';
    image.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  userpic.onerror = function() {
    element.classList.add('review-load-failure');
  };

  return element;
};

reviews.forEach(function(review) {
  getReviewElement(review, reviewsContainer);
});

reviewsFilter.classList.remove('invisible');


/** @param {function(Array.<Object>)} callback */
var getReviews = function(callback) {
  var xhr = new XMLHttpRequest();

  /** @param {ProgressEvent} */
  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);

  };
  var REVIEWS_LOAD_TIMEOUT = 10000;
  //xhr.timeout = 1000;
  //xhr.ontimeout = function() {
  //  reviewsBlock.classList.add('reviews-list-loading');
  //};

  var ReviewsLoadTimeout = setTimeout(function() {
    reviewsBlock.classList.add('reviews-list-loading');
  }, REVIEWS_LOAD_TIMEOUT);

  xhr.onerror = function() {
    reviewsBlock.classList.add('reviews-load-failure');
  };

  xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
  xhr.send();
  clearTimeout(ReviewsLoadTimeout);
};

/** @param {Array.<Object>} reviews */
var renderReviews = function(reviews) {
  reviewsContainer.innerHTML = '';
  reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
};

/**
 * @param {Array.<Object>} reviews
 * @param {string} filter
 */
var getFilteredReviews = function(reviews, filter) {
  var reviewsToFilter = reviews.slice(0);

  switch (filter) {
    case 'reviews-popular':
      reviewsToFilter.sort(function(a, b) {
        return a.review_usefulness - b.review_usefulness;
      });
      break;
    case 'reviews-bad':
      reviewsToFilter.filter(function(rev) {
        return rev.rating < 3;
      });
      break;
  }
  return reviewsToFilter;
};


/** @param {string} filter */
var setFilterEnabled = function(filter) {
  var filteredReviews = getFilteredReviews(reviews, filter);
  renderReviews(filteredReviews);

  var activeFilter = reviewsFilter.querySelector('.' + ACTIVE_FILTER_CLASSNAME);
  if (activeFilter) {
    activeFilter.classList.remove(ACTIVE_FILTER_CLASSNAME);
  }
  var filterToActivate = document.getElementById(filter);
  filterToActivate.classList.add(ACTIVE_FILTER_CLASSNAME);

};

var setFiltrationEnabled = function() {
  var filters = reviewsFilter.querySelectorAll('.reviews-filter-item');
  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function(evt) {
      setFilterEnabled(this.id);
    };
  }
};

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  setFiltrationEnabled();
  renderReviews(reviews);
});
