/**
 * Copyright (c) 2012 Vladimir's Software. All rights reserved.
 *
 * @fileoverview Set of numbers specified by a range
 * @author vladimir.darmin@gmail.com
 *
 * @created Wed, Sep 19 2012 - 10:00:04 -0700
 * @updated Wed, Sep 19 2012 - 10:00:04 -0700
 */

//             1     2  3      4       5   6       7          8
//              set   :   ([   min  ;   max   ])    >= <= > <  num
var SUBSET = /^(\w*)?(:?(\(|\[)(.*)[;,](.*)(\)|\])|(>=|<=|>|<)(.*))?$/;

var INTEGERS = [ 'INTEGER', 'INT', 'NATURAL0', 'N0', 'NATURAL', 'N', 'Z' ];
var REALS = [ 'DOUBLE', 'D', 'FLOAT', 'F', 'NUMBER', 'NUM', 'REAL', 'R' ];

var NUMBERS = Array.prototype.concat(INTEGERS, REALS);

var REGEX = new RegExp('^' + NUMBERS.join('|') + ':[(<>$]', 'i');

var Numbers = module.exports = function Numbers ( type ) {
  this.isReal = true;

  this.excludeMin = true;
  this.excludeMax = true;

  this.min = -Infinity;
  this.max = +Infinity;

  this.subset(type);
}

Numbers.prototype.subset = function subset ( type ) {
  var set, min, max, excludeMin, excludeMax;

  console.log( type );

  if ( type = String(type).match(SUBSET) ) {
    set = String(type[1]).toUpperCase();

    min = type[4] || (type[7] && type[7][0] == '>' ? type[8] : -Infinity);
    max = type[5] || (type[7] && type[7][0] == '<' ? type[8] : +Infinity);

    excludeMin = type[3] == '(' || type[7] == '>';
    excludeMax = type[6] == ')' || type[7] == '<';

    if ( INTEGERS.indexOf(set) != -1 ) this.isReal = false;
    if ( set[0] == 'N' ) this.minimum(set[1] == '0' ? 0 : 1);

    if ( min !== undefined ) this.minimum(min, excludeMin); 
    if ( max !== undefined ) this.maximum(max, excludeMax);
  }
}

Numbers.prototype.minimum = function minimum ( number, exclude ) {
  if ( !number && number !== 0 ) return;

  if ( number == this.min ) {
    this.excludeMin = this.excludeMin || !!exclude;
  }
  else if ( number > this.min ) {
    this.min = +number;
    this.excludeMin = !!exclude;
  }
}

Numbers.prototype.maximum = function maximum ( number, exclude ) {
  if ( !number && number !== 0 ) return;

  if ( number == this.max ) {
    this.excludeMax = this.excludeMax || !!exclude;
  }
  else if ( number < this.max ) {
    this.max = +number;
    this.excludeMax = !!exclude;
  }
}

Numbers.prototype.contain = function contain ( number ) {
  if ( !this.isReal && number % 1 != 0 ) return false;

  if ( this.min > number || this.max < number ) return false;

  if ( this.excludeMin && this.min == number ) return false;
  if ( this.excludeMax && this.max == number ) return false;

  return true;
}

Numbers.prototype.bounds = function bounds ( ) {
  var values = [ ];

  if ( !this.excludeMin ) values.push(this.min);
  if ( !this.excludeMax ) values.push(this.max);

  return values;
}

Numbers.prototype.random = function random ( ) {
  if ( this.isReal ) {
    if ( this.min > this.max ) return NaN;
    if ( this.excludeMin && this.min == this.max ) return NaN;
    if ( this.excludeMax && this.min == this.max ) return NaN;
  }
  else {
    if ( Math.ceil(this.min) > this.max) return NaN;
  }

  var range = this.max - this.min, number = Math.random();

  if ( range < Infinity ) {
    number = this.min + range * number;
  }
  else {
    number *= Math.pow(10, (String(number).length - 2) * Math.random());

    if ( this.min > -Infinity ) number = this.min + number;
    else if ( this.max < Infinity ) number = this.max - number;
  }

  if ( !this.isReal ) {
    number = Math.round(number);

    if ( number < this.min ) number += 1;
    else if ( number > this.max ) number -= 1;
    else if ( number == this.min && this.excludeMin ) number += 1;
    else if ( number == this.max && this.excludeMax ) number -= 1;
  }

  return number;
}

Numbers.prototype.toString = function toString ( ) {
  var set = this.isReal ? 'R' : 'Z';
  var left = this.excludeMin ? '(' : '[';
  var right = this.excludeMax ? ')' : ']';

  return set + ':' + left + this.min + ';' + this.max + right;
}

Numbers.check = function check ( type ) { return type.match(REGEX); }
