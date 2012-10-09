/**
 * Copyright (c) 2012 Vladimir's Software. All rights reserved.
 *
 * @fileoverview Regular expression tree for string generation
 * @author vladimir.darmin@gmail.com
 *
 * @created Sun, Sep 23 2012 - 08:59:53 -0700
 * @updated Sun, Sep 23 2012 - 08:59:53 -0700
 */

var NAMED_RANGE = {
  '\\w': '', '\\W': '', '\\d': '', '\\D': '',
  '\\s': '', '\\S': '', '\\b': '', '\\B': '',
  '\\n': '', '\\f': '', '\\r': '', '\\t': '',
  '\\v': '', '\\0': ''//, '.': '', '^': '', '$': ''
}

var code, character, name, quantity = 128;
for ( code = 0; code < quantity; code += 1 ) {
  character = String.fromCharCode(code);

  for ( name in NAMED_RANGE ) {
    if ( character.match(new RegExp(name)) ) {
      NAMED_RANGE[name] += code + ', ';
    }
  }
}

for ( name in NAMED_RANGE ) {
  console.log( name + ':' + NAMED_RANGE[name] );
}



/*

    <regex> = <sequence> ( '|' <sequence> )*

    <sequence> = <element>*

    <element> = <value> <quantifier>

    <quantifier> = '{' number '}' | ( '?' | '*' | '+' | '{' number ',' number? '}' ) '?'?

    <value> = <group> | <range> | <named range> | <special> | character

    <group> = '(' <regex> ')'

    <range> = '[' '^'? ( <named range> | character ( '-' character )? )* ']'

    <named range> = '\' character

    <special> = '.' | '^' | '$'

*/

/*

    regex, element
    match(string), length() -> min, max

*/



// <regex> = <sequence> ( '|' <sequence> )*
var RegExpTree = module.exports = function RegExpTree ( regex, index ) {
  var isMain = !!index, stream = { regex: regex, index: index || 0 }

  this.sequences = [ ];

  do {
    this.sequnces.push(RegExpTree.sequence(stream));
  } while ( stream.regex[stream.index] == '|' );

  if ( isMain && index != regex.length ) return null;
}


RegExpTree.prototype.match = function match ( text ) {
}

RegExpTree.prototype.bounds = function bounds ( ) {
}

RegExpTree.prototype.random = function random ( length ) {
}

RegExpTree.prototype.length = function length ( ) {
}

// <sequence> = <element>*
RegExpTree.sequence = function sequence ( stream ) {
  var element, elements = [ ];

  while ( element = RegExpTree.element(stream) ) {
    elements.push(element);
  }
}

// <element> = <value> <quantifier>
RegExpTree.element = function element ( stream ) {
}

// <value> = <group> | <range> | <named range> | <special> | character
RegExpTree.value = function value ( stream ) {
}

// <quantifier> = '{' number '}' | ( '?' | '*' | '+' | '{' number ',' number? '}' ) '?'?
RegExpTree.quantifier = function quantifier ( stream ) {
}

// <group> = '(' <regex> ')'
RegExpTree.group = function group ( stream ) {
  if ( stream.regex[stream.index] == '(' ) {
    return new RegExpTree(stream.regex, stream.index);
  }
}

// <range> = '[' '^'? ( <named range> | character ( '-' character )? )* ']'
RegExpTree.range = function range ( stream ) {
  var index = stream.index, subrange = '';

  if ( stream.regex[index] == '[' ) index += 1; else return;

  while ( stream.regex[index] != ']' ) {
  }

  if ( stream.regex[index] == ']' ) {
    stream.index = index + 1;
    return subrange;
  }
}

// <named range> = '\' character
RegExpTree.namedRange = function namedRange ( stream ) {
  var name, index = stream.index;

  if ( stream.regex[stream.index] == '\\' ) {
    stream.index = index + 2;
    name = stream.regex.slice(index, stream.index);
    return NAMED_RANGE[name] || name[1];
  }
}

// <special> = '.' | '^' | '$'
RegExpTree.special = function special ( stream ) {
  if ( stream.regex[stream.index].match(/\.|\^|\$/) ) {
    stream.index += 1;
    return stream.regex[stream.index];
  }
}
