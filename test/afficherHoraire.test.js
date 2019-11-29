//***********************************************************//
const { mockReq, mockRes } = require('sinon-express-mock');
var sinon = require('sinon');
var assert = require('chai').assert;
const expect = require('chai').expect;
//***********************************************************//
var {recupererListeSemaine} = require('../afficherhoraire'); //Destructuration : recupere seulement recupererListeSemaine
//***********************************************************//

describe('test', function (done) {
   it('should return 000, 001', async () => {

    const listeSemaine = await recupererListeSemaine();
    expect(listeSemaine).to.equal({ choixSemaines: [ { idtablehoraire: '001' } ] });


      });


});
