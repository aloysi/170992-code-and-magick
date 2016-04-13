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
var myMark = 0;
submitButton.setAttribute('disabled', 'disabled');

var removeDisabled = function() {
  for (var i = 0; i < 5; i++) {
    if (reviewMark[i].checked) {
      myMark = i;
    } }

  if ((names.value !== '' ) && (myMark > 3)) {
    submitButton.removeAttribute('disabled', 'disabled');
    namesLabel.style.display = 'none';
  }
  if ((names.value !== '') && (description.value !== '')) {
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

reviewMark.onclick = function() {

  removeDisabled(names, reviewMark, description);
};

names.oninput = function() {
  removeDisabled(names, reviewMark, description);
  removeAllLabels(names, description);
};

description.oninput = function() {
  removeDisabled(names, reviewMark, description);
  removeLabel(description);
  removeAllLabels(names, description);
};



removeDisabled(names, reviewMark, description);

removeLabel(description);

removeAllLabels(names, description);
