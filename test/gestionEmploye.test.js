var PostgREST = require('postgrest-client')
var Api = new PostgREST ('http://testpostgrest-calendrier.herokuapp.com')
//***********************************************************//
const { mockReq, mockRes } = require('sinon-express-mock');
const sinon = require('sinon');
const assert = require('chai').assert;
const expect = require('chai').expect;
//***********************************************************//
const GestionEmploye = require('../src/backend/gestionemploye'); 
//***********************************************************//

describe('test de GestionEmploye', function (done) {
 /**********/
   describe('creerIdEmploye', function (done) {
   it('devrait retourner 001', async () => {
         const ID = await GestionEmploye.creerIdEmploye('nomdelemploye', 'prenomdelemploye');
         expect(ID).to.deep.equal('npren');
      });
   });
  /**********/
});
