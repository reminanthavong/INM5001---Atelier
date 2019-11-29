//***********************************************************//
const { mockReq, mockRes } = require('sinon-express-mock');
var sinon = require('sinon');
var assert = require('Chai').assert;
const expect = require('chai').expect;
//***********************************************************//
var {recupererListeSemaine} = require('../afficherhoraire'); //Destructuration : recupere seulement recupererListeSemaine
//***********************************************************//

describe('test', function (done) {
   it('should return 000, 001', async () => {

    const listeSemaine = await recupererListeSemaine();
    expect(listeSemaine).to.equal(6);


      });


});
