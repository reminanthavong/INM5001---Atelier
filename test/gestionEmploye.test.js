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
const EmployesDeGestion3525=       [
         {
           idemployeur: 'Gestion3525',
           idemploye: 'EBECK',
           nomemploye: 'ELAINE R',
           prenomemploye: 'BECKER',
           nbrquartsmax: 40,
           dateembauche: '1970-04-07'
         },
         {
           idemployeur: 'Gestion3525',
           idemploye: 'JNASH',
           nomemploye: 'JENISSA C',
           prenomemploye: 'NASHEL',
           nbrquartsmax: 40,
           dateembauche: '1979-04-16'
         },
         {
           idemployeur: 'Gestion3525',
           idemploye: 'MSLAT',
           nomemploye: 'MASCHEAL',
           prenomemploye: 'SLATTON',
           nbrquartsmax: 40,
           dateembauche: '2000-04-17'
         },
         {
           idemployeur: 'Gestion3525',
           idemploye: 'DPURN',
           nomemploye: 'DESRI M',
           prenomemploye: 'PURNELL',
           nbrquartsmax: 40,
           dateembauche: '1984-10-16'
         }
       ]
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
    xit('devrait retourner le bon horaire', async () => {
    const req = mockReq();
    const res = mockRes();
    getEmployesSTUB = sinon.stub(GestionEmploye,'getEmployes');
    //await GestionEmploye.GenererHoraireReponse(req, res); 
    //sinon.assert.calledOnce(res.json); //setHeader
    //sinon.assert.calledOnce(getEmployesSTUB);
       });  
   });
  /**********/
    describe('getEmployes', function (done) {
   it('devrait retourner ???', async () => {
         const Employes = await GestionEmploye.getEmployes('Gestion3525');
    console.log(Employes)
         expect(Employes).to.deep.equal(EmployesDeGestion3525);
      });
   });
  /**********/
 
});
