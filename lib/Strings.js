/**
 * Copyright (c) 2012 Vladimir's Software. All rights reserved.
 *
 * @fileoverview Set of strings specified by a range
 * @author vladimir.darmin@gmail.com
 *
 * @created Sun, Sep 23 2012 - 07:51:34 -0700
 * @updated Sun, Sep 23 2012 - 07:51:34 -0700
 */

var RegExpTree = require('./RegExpTree');

//            1             2   3    4
//             string str s   ( reg    mod    )
var REGEX = /^(STRING|STR|S)(\(/(.*)/([img]*)\))?$/i;

var Strings = module.exports = function Strings ( type ) {
  if ( type = type.match(REGEX) ) {
    this.regex = type[2] ? new RegExp(type[3], type[4]) : /.*/;
    this.tree = new RegExpTree(this.regex);
  }
}

Strings.prototype.contain = function contain ( string ) {
  return string.match(this.regex);
}

Strings.prototype.bounds = function bounds ( ) {
  return this.tree.bounds();
}

Strings.prototype.random = function random ( ) {
  return undefined;
}

Strings.prototype.toString = function toString ( ) {
  return 'S(' + String(this.regex) + ')';
}

Strings.check = function check ( type ) { return type.match(REGEX); }
