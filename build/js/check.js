"use strict";

function getMessage(a, b) {
if(typeof a=="number") {return("Я прыгнул на " + a*100 + " сантиметров");
} if(typeof a=="boolean" && a==true) {return("Я попал в " + b);
//тут, видимо, еще должно быть условие, что typeof b=="number"? или если а не массив, то и b не будет массивом в нашем случае?
} if (typeof a=="boolean" && a==false) {return("Я никуда не попал");
 } if (Array.isArray(a) && Array.isArray(b)) {
 var length=0;
 for (var i = 0; i < a.length; i++) {
   length += a[i]*b[i];
 } return ("Я прошёл " + length + " метров");
     } if (Array.isArray(a)) { 
 var sum=0;
 for (var i = 0; i < a.length; i++)  {
   sum += a[i];
 } return ("Я прошёл " + sum + " шагов"); 
 }
 }