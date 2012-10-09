/**
 * Copyright (c) 2012 Vladimir's Software. All rights reserved.
 *
 * @fileoverview Single command line option presentation
 * @author vladimir.darmin@gmail.com
 *
 * @created Fri, Sep 14 2012 - 11:56:51 -0700
 * @updated Fri, Sep 14 2012 - 11:56:51 -0700
 */

var Option = module.exports = function Option ( option ) {
  var fields = [ 'name', 'type', 'help', 'value', 'group', 'limit' ];

  var i, length = fields.length;
  for ( i = 0; i < length; i += 1 ) {
    this[fields[i]] = option[fields[i]];
  }

  this.limit = this.limit || 0;
}

Option.prototype.parse = function parse ( tokens, values ) {
  values = this.limit ? [ ] : values || [ ];

  var i, length = Math.min(this.limit || tokens.length, tokens.length);
  for ( i = 0; i < length; i += 1 ) {
    if ( tokens[0] instanceof Option ) break;
    if ( this.type && !tokens[0].match(this.type) ) break;

    values.push(tokens.shift());
  }

  return this.limit == 1 ? values[0] === undefined ? true : values[0] : values;
}

Option.prototype.valueOf = function valueOf ( option ) {
  option = option || { }

  var result = {
    name: '--' + this.name,
    type: this.type === undefined ? '' : this.type,
    value: this.value === undefined ? '' : JSON.stringify(this.value),
    help: this.help === undefined ? '' : this.help
  };

  result.n = option[this.name[0]] == this ? '-' + this.name[0] : '';

  if ( this.limit > 1 ) result.type += ':' + this.limit;
  if ( this.limit != 1 ) result.type = '[' + result.type + ']';

  return result;
}

Option.prototype.toArray = function toArray ( option ) {
  var value = this.valueOf(option);

  return [ value.n, value.name, value.type, value.value, value.help ];
}

Option.titles = function titles ( ) {
  return [ 'Short', 'Option', 'Type', 'Default', 'Description' ];
}
