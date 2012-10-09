/**
 * Copyright (c) 2012 Vladimir's Software. All rights reserved.
 *
 * @fileoverview Type specified by a range
 * @author vladimir.darmin@gmail.com
 *
 * @created Tue, Sep 18 2012 - 12:53:09 -0700
 * @updated Tue, Sep 18 2012 - 12:53:09 -0700
 */

var Type = module.exports = function Type ( type ) {
  var match;

  if ( type instanceof RegExp ) {
    this.name = 'string';
    this.regex = type;
  }
  else if ( match = type.match(/^(boolean|bool)$/i) ) {
    this.name = 'boolean';
  }
  else if ( match = type.match(/^(number|real|float|double)?()$/i) ) {
  }
  else if ( match = type.match(/^(integer|int)()?$/i) ) {
  }
}

Type.prototype.contains = function contains ( value ) {

}

Type.prototype.bounds = function bounds ( ) {
}

Type.prototype.random = function random ( ) {
}
