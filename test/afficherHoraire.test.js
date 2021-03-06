//***********************************************************//
const { mockReq, mockRes } = require('sinon-express-mock');
const sinon = require('sinon');
const assert = require('chai').assert;
const expect = require('chai').expect;
//***********************************************************//
const AfficherHoraire = require('../src/backend/afficherhoraire'); 
const Ressources = require('../src/backend/ressources'); 
const GenererHoraire = require('../src/backend/genererhoraire');
//***********************************************************//
const TestScenarii = require('./TestScenarii/AfficherHoraireTests'); 
//***********************************************************//

describe('test de AfficherHoraire', function (done) {
 /**********/
   describe('recupererListeSemaine', function (done) {
   it('devrait retourner 001', async () => {
         const listeSemaine = await Ressources.recupererListeSemaine('Gestion3525');
         expect(listeSemaine).to.deep.equal({choixSemaines: [{ idtablehoraire: '001' }]});
      });
   });
  /**********/

    describe('afficherChoixHoraire', function (done) {
     //Pour reinitilialiser le stub
     let recupererListeSemaineSTUB;
     beforeEach(() => {
      recupererListeSemaineSTUB = sinon.stub(Ressources,'recupererListeSemaine').returns({choixSemaines: [{ idtablehoraire: '001' }]});
     })
     afterEach(() => {
        sinon.restore();
     });
    it('devrait retourner vrai', async function() {
    const req = mockReq();
    const res = mockRes();
    await AfficherHoraire.afficherChoixHoraire(req, res); 
    sinon.assert.calledOnce(res.send); //res.send a ete appellee une fois
    sinon.assert.calledOnce(recupererListeSemaineSTUB);
    });
    
    });

  /**********/
    describe('recupererHoraire', function (done) {
   it('devrait retourner le bon horaire', async () => {
         const horaire = await Ressources.recupererHoraire('001','2019-10-07','Gestion3525');
         expect(horaire).to.deep.equal(TestScenarii.Horaire00120191007Gestion3525);
      });
     it('devrait retourner vrai', async function() {
    const req = mockReq({ body: {}});
    const res = mockRes();
    recupererHoraireSTUB = sinon.stub(Ressources,'recupererHoraire').returns(TestScenarii.Horaire00120191007Gestion3525);
    await AfficherHoraire.afficherHoraire(req, res); 
    sinon.assert.calledOnce(res.send); //res.json a ete appellee une fois
    sinon.assert.calledOnce(recupererHoraireSTUB);
    sinon.assert.calledWithExactly(recupererHoraireSTUB, '000', '01-01-1899', undefined);
   });   
 });
 /**********/
describe('GenererHoraire', function (done) {
    it('devrait retourner le bon horaire', async () => {
        const horaire = await Ressources.genererHoraire('001','2019-10-07','Gestion3525');
        expect(horaire).to.deep.equal(TestScenarii.HoraireGenere00120191007Gestion3525);
    });
      afterEach(() => {
        sinon.restore();
     });
      
    it('devrait appeller la fonction', async function() {
        const req = mockReq({ body: {}});
        const res = mockRes();
        GenererHoraireSTUB = sinon.stub(Ressources,'genererHoraire').returns(TestScenarii.HoraireGenere00120191007Gestion3525);
        await GenererHoraire.genererHoraireReponse(req, res);
        sinon.assert.calledOnce(res.json); //res.json a ete appellee une fois
        sinon.assert.calledOnce(GenererHoraireSTUB);
        sinon.assert.calledWithExactly(GenererHoraireSTUB, '000', '01-01-1899', undefined);
    });
 });
 /**********/
 
});
