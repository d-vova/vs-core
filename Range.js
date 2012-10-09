/**
 * Copyright (c) 2012 Vladimir's Software. All rights reserved.
 *
 * @fileoverview Range of values
 * @author vladimir.darmin@gmail.com
 *
 * @created Sat, Sep 22 2012 - 14:59:04 -0700
 * @updated Sat, Sep 22 2012 - 14:59:04 -0700
 */

var Values = require('./lib/Values');
var Numbers = require('./lib/Numbers');
var Strings = require('./lib/Strings');

var Range = module.exports = function Range ( types ) {
  types = types instanceof Array ? types : [ types ];

  this.types = [ ];

  var type, i, length = types.length, values = [ ];
  for ( i = 0; i < length; i += 1 ) {
    type = types[i];
    
    if ( type instanceof Array ) {
      values = Array.prototype.concat(values, type);
    }
    else if ( type instanceof Object ) {
      // this.types.push(new Instance(type));
    }
    else if ( Numbers.check(type) ) {
      this.types.push(new Numbers(type));
    }
    else if ( Strings.check(type) ) {
      this.types.push(new Strings(type));
    }
    else if ( type.match(/^(BOOLEAN|BOOL|B)$/i) ) {
      values.push(false, true);
    }
    else values.push(type);
  }

  this.types.push(new Values(values));
}
