/**
 * Created by amarshanand on 28/7/17.
 */

'use strict';
var expect = require('chai').expect;

// ensure that the file exists
describe('Compute', function() {
    it('should exist', function() {
        var compute = require('./compute');
        expect(compute).to.not.be.undefined;
    });
});
