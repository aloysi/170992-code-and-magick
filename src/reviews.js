'use strict';
/* global reviews */
var reviewsFilter = document.getElementsByClassName('reviews-filter')[0];
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;

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
