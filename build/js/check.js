"use strict";

function getMessage(a, b) {
  if (typeof a=="number") {
return ("Я прыгнул на " + a*100 + " сантиметров");
} 
    if (typeof a=="boolean" && a===true) {
return("Я попал в " + b);
} 
    if (typeof a=="boolean" && a===false) {
    return("Я никуда не попал");
}
    if (Array.isArray(a) && Array.isArray(b)) {
 var distance=0;
 for (var i = 0; i < a.length; i++) {
   distance += a[i]*b[i];
 } return ("Я прошёл " + distance + " метров");
}
    if (Array.isArray(a)) { 
 var sum=0;
 for (var i = 0; i < a.length; i++)  {
 sum += a[i];
 } return ("Я прошёл " + sum + " шагов"); 
 }
 }