var PostgREST = require('postgrest-client')
var Api = new PostgREST ('http://testpostgrest-calendrier.herokuapp.com')
const bodyParser = require('body-parser')
const session = require('express-session');
//***********************************************************//
const { mockReq, mockRes } = require('sinon-express-mock');
const sinon = require('sinon');
const expect = require('chai').expect;
const assert = require('chai').assert;
//***********************************************************//
const PageEmploye = require('../src/backend/pageemploye.js'); 
//***********************************************************//
 const TestScenarii = require('./TestScenarii/PageEmployeTests.js');
//***********************************************************//

describe('test de PageEmploye', function (done) {
 
 /**********/
   describe('getDisponibilite', function (done) {
   it('devrait retourner les disponibilites de lemploye', async () => {
         const Disponibilite = await PageEmploye.getDisponibilites('TREIK');
         expect(Disponibilite).to.deep.equal(TestScenarii.DisponibilitesTREIK);
      });
   });
  /**********/
 describe('afficherDisponibilites', function (done) {
   afterEach(() => {
        sinon.restore();
     });
 it('devrait retourner vrai', async function() {
    const req = mockReq();
    const res = mockRes();  getDisponibilitesSTUB = sinon.stub(PageEmploye,'getDisponibilites');
    await PageEmploye.afficherDisponibilites(req, res); 
    sinon.assert.calledOnce(res.send); //res.send a ete appellee une fois
    sinon.assert.calledOnce(res.set); //res.send a ete appellee une fois
    sinon.assert.calledOnce(getDisponibilitesSTUB);

    });
   });
   /**********/
});
