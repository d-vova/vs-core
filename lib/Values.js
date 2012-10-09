/**
 * Copyright (c) 2012 Vladimir's Software. All rights reserved.
 *
 * @fileoverview Set of values specified by a range
 * @author vladimir.darmin@gmail.com
 *
 * @created Tue, Sep 18 2012 - 12:43:20 -0700
 * @updated Tue, Sep 18 2012 - 12:43:20 -0700
 */

var Values = module.exports = function Values ( values ) {
  values = values instanceof Array ? values : [ values ];

  this.set = values.slice();
}

Values.prototype.contain = function contain ( value ) {
  return this.set.indexOf(value) != -1;
}

Values.prototype.bounds = function bounds ( ) {
  return this.set.slice();
}

Values.prototype.random = function random ( ) {
  return this.set[Math.floor(this.set.length * Math.random())];
}

Values.prototype.toString = function toString ( ) {
  return this.set.join('|');
}
