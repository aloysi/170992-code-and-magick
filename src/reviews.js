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
var filtersCollection = {
  'ALL': 'reviews-all',
  'RECENT': 'reviews-recent',
  'GOOD': 'reviews-good',
  'BAD': 'reviews-bad',
  'POPULAR': 'reviews-popular'
};

/*var ratingStarsClassName = {
  '1': 'review-rating-one',
  '2': 'review-rating-two',
  '3': 'review-rating-three',
  '4': 'review-rating-four',
  '5': 'review-rating-five'
};*/

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

  element.querySelector('.review-rating').textContent = data.rating;
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

  xhr.timeout = 1000;
  xhr.ontimeout = function() {
    reviewsBlock.classList.add('reviews-list-loading');
  };


  xhr.onerror = function() {
    reviewsBlock.classList.add('reviews-load-failure');
  };

  xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
  xhr.send();

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
    case filtersCollection.POPULAR:
      reviewsToFilter.sort(function(a, b) {
        return a.review_usefulness - b.review_usefulness;
      });
      break;

    case filtersCollection.BAD:
      var badReviews = reviewsToFilter.filter(function(rev) {
        return rev.rating < 3;
      });
      reviewsToFilter = badReviews.sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;

    case filtersCollection.GOOD:
      var goodReviews = reviewsToFilter.filter(function(rev) {
        return rev.rating > 2;
      });
      reviewsToFilter = goodReviews.sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;

    case filtersCollection.RECENT:
      var dateTwoWeeksAgo = Date.now() - 60 * 60 * 24 * 14 * 1000;
      var newReviews = reviewsToFilter.filter(function(rev) {
        var reviewDate = new Date(rev.date).getTime();
        return reviewDate >= dateTwoWeeksAgo;
      });
      reviewsToFilter = newReviews.sort(function(a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
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
  var filters = document.forms[0].reviews;
  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function() {
      setFilterEnabled(this.id);
    };
  }
};

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  setFiltrationEnabled();
  renderReviews(reviews);
});
