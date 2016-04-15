'use strict';
/* global reviews */
var reviewsFilter = document.getElementsByClassName('reviews-filter')[0];
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;

reviewsFilter.setAttribute('invisible', 'invisible');

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

var getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-author').textContent = data.author;
  container.appendChild(element);
  return element;
};

reviews.forEach(function(review) {
  getReviewElement(review, reviewsContainer);
});
