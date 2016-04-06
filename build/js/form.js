'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();

var names = document.querySelector('#review-name');
var description = document.getElementById('review-text');
var reviewMark = document.getElementsByName('review-mark');
var submitButton = document.getElementById('submit-btn');
var namesLabel = document.querySelector('#revew-name-label');
var descriptionLabel = document.querySelector('#revew-description-label');
var allLabelsBlock = document.querySelector('#review-fields');

submitButton.setAttribute('disabled', 'disabled');


var removeDisabled = function() {
  if (names.value !== '' ) {
  //if ((names.value !== '' ) && (reviewMark.value.checked > 3)) || ((names.value !== '') && (description.value !== '')) {
    submitButton.removeAttribute('disabled', 'disabled');
    namesLabel.style.display = 'none';
  }
};

var removeLabel = function() {
  if ( description.value !== '' ) {
    descriptionLabel.style.display = 'none';
  }
};

var removeAllLabels = function() {
  if (( names.value !== '' ) && ( description.value !== '' )) {
    allLabelsBlock.style.display = 'none';
  }
};

names.onchange = function() {
  removeDisabled(names, reviewMark, description);
  removeAllLabels(names, description);
};

description.onchange = function() {
  removeDisabled(names, reviewMark, description);
  removeLabel(description);
  removeAllLabels(names, description);
};

reviewMark.onclick = function() {
  removeDisabled(names, reviewMark, description);
};

removeDisabled(names, reviewMark, description);

removeLabel(description);

removeAllLabels(names, description);
