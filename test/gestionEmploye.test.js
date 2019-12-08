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
const TestScenarii = require('./TestScenarii/GestionEmployeTests.js');
//***********************************************************//
describe('test de GestionEmploye', function (done) {
 /**********/
   describe('creerIdEmploye', function (done) {
   it('devrait retourner npren', async () => {
         const ID = await GestionEmploye.creerIdEmploye('nomdelemploye', 'prenomdelemploye');
         expect(ID).to.deep.equal('npren');
      });
   });
  /**********/
    describe('afficherEmployes', function (done) {
    it('devrait retourner le bon horaire', async () => {
    const req = mockReq();
    const res = mockRes();
    getEmployesSTUB = sinon.stub(GestionEmploye,'getEmployes');
    await GestionEmploye.GenererHoraireReponse(req, res); 
    //sinon.assert.calledOnce(res.json); //setHeader
    //sinon.assert.calledOnce(getEmployesSTUB);
       });  
   });
  /**********/
    describe('getEmployes', function (done) {
   it('devrait retourner la liste des employes', async () => {
         const Employes = await GestionEmploye.getEmployes('Gestion3525');
         expect(Employes).to.deep.equal(TestScenarii.EmployesDeGestion3525);
      });
   });
  /**********/
 
});
