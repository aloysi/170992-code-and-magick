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

var reviewForm = document.getElementsByClassName('overlay review-form')[0];
var reviewAuthor = reviewForm['review-name'];
var reviewText = reviewForm['review-text'];
var reviewMarks = reviewForm.elements['review-mark'];
var submitButton = reviewForm['submit-btn'];
var reviewAuthorLabel = document.getElementsByClassName('review-fields-name')[0];
var reviewTextLabel = document.getElementsByClassName('review-fields-text')[0];
var allLabelsBlock = document.getElementsByClassName('review-fields')[0];
submitButton.setAttribute('disabled', 'disabled');

var removeDisabled = function() {
  if ((reviewAuthor.value !== '' ) && (reviewMarks.value > 3)) {
    submitButton.removeAttribute('disabled', 'disabled');
  }
  if ((reviewAuthor.value !== '') && (reviewText.value !== '')) {
    submitButton.removeAttribute('disabled', 'disabled');
  }
};

var removeLabel1 = function() {
  if (reviewAuthor.value !== '') {
    reviewAuthorLabel.style.display = 'none';
  }
};

var removeLabel2 = function() {
  if (reviewText.value !== '') {
    reviewTextLabel.style.display = 'none';
  }
};

var removeAllLabels = function() {
  if ((reviewAuthor.value !== '') && (reviewText.value !== '')) {
    allLabelsBlock.style.display = 'none';
  }
};

reviewMarks.onclick = function() {
  removeDisabled(reviewAuthor, reviewMarks, reviewText);
};

reviewAuthor.oninput = function() {
  removeDisabled(reviewAuthor, reviewMarks, reviewText);
  removeLabel1(reviewAuthor);
  removeAllLabels(reviewAuthor, reviewText);
};

reviewText.oninput = function() {
  removeDisabled(reviewAuthor, reviewMarks, reviewText);
  removeLabel2(reviewText);
  removeAllLabels(reviewAuthor, reviewText);
};

removeDisabled(reviewAuthor, reviewMarks, reviewText);
removeLabel1(reviewAuthor);
removeLabel2(reviewText);
removeAllLabels(reviewAuthor, reviewText);
