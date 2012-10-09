/**
 * Copyright (c) 2012 Vladimir's Software. All rights reserved.
 *
 * @fileoverview Expanded representation of a module
 * @author vladimir.darmin@gmail.com
 *
 * @created Tue, Sep 11 2012 - 19:32:35 -0700
 * @updated Wed, Sep 12 2012 - 12:26:46 -0700
 */

var OptionParser = require('./OptionParser');

var Unit = module.exports = function Unit ( module ) {
  if ( !(this instanceof Unit) ) return new Unit(module);

  this.module = module;

  this.options = [
    { name: 'help', limit: 1 },
    { name: 'verbose', limit: 1 },
    { name: 'test' }
  ];

  this.tests = [ ];
}

Unit.prototype.test = function test ( method, args, pre, post, description ) {
  this.tests.push(aTest);
}

Unit.prototype.run = function run ( main ) {
  var parser = new OptionParser(this.options);
  var command = parser.parse(process.argv.slice(2));

  if ( command.optional.help ) console.log( parser.toString() );

//  if ( command.optional.verbose ) console.log( JSON.stringify(command, null, 2) );

  if ( command.optional.test ) {
    console.log( 'testing ' + command.optional.test.join(', ') );
    //execute tests
  }

  if ( require.main === this.module ) {
    console.log( 'running' );
    if ( main instanceof Function ) main(command);
  }
}
