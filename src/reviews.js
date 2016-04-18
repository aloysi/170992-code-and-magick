'use strict';
/* global reviews */
var reviewsFilter = document.getElementsByClassName('reviews-filter')[0];
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;

reviewsFilter.classList.add('invisible');

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

var getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-rating').textContent = data.rating;
  element.querySelector('.review-text').textContent = data.description;
  container.appendChild(element);

  var userpic = new Image();
  //var userpic = element.querySelector('.review-author');

  userpic.onload = function() {
    element.style.background = 'url("../build/' + userpic.src + '")';
    element.style.width = '124px';
    element.style.height = '124px';
  };

  userpic.onerror = function() {
    element.classList.add('review-load-failure');
  };

  userpic.src = data.picture;

  return element;
};

reviews.forEach(function(review) {
  getReviewElement(review, reviewsContainer);
});

reviewsFilter.classList.remove('invisible');
