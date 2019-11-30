//***********************************************************//
const { mockReq, mockRes } = require('sinon-express-mock');
const sinon = require('sinon');
const assert = require('chai').assert;
const expect = require('chai').expect;
//***********************************************************//
const AfficherHoraire = require('../afficherhoraire'); //Destructuration : recupere seulement fonctions1
const Ressources = require('../ressources'); //Destructuration : recupere seulement recupererListeSemaine 
//***********************************************************//
 const Horaire00120191007Gestion3525 = { horaires:
          [ { typequart: 'Nuit',
              joursemaine: 'Mercredi',
              nomemploye: 'ELAINE R BECKER' },
            { typequart: 'Jour',
              joursemaine: 'Jeudi',
              nomemploye: 'JENISSA C NASHEL' },
            { typequart: 'Soir',
              joursemaine: 'Jeudi',
              nomemploye: 'MASCHEAL SLATTON' },
            { typequart: 'Nuit',
              joursemaine: 'Jeudi',
              nomemploye: 'DESRI M PURNELL' } ] }
//***********************************************************//

describe('test de AfficherHoraire', function (done) {
   describe('recupererListeSemaine', function (done) {
   it('devrait retourner 001', async () => {
         const listeSemaine = await Ressources.recupererListeSemaine();
         expect(listeSemaine).to.deep.equal({choixSemaines: [{ idtablehoraire: '001' }]});
      });
   });
    describe('fonctions1', function (done) {
     //Pour reinitilialiser le stub
     let recupererListeSemaineSTUB;
     beforeEach(() => {
      recupererListeSemaineSTUB = sinon.stub(Ressources,'recupererListeSemaine');
     })
     afterEach(() => {
        sinon.restore();
     });     
    it('devrait retourner vrai', async function() {
    const req = mockReq();
    const res = mockRes();
    await AfficherHoraire.fonctions1(req, res); 
    sinon.assert.calledOnce(res.json); //res.json a ete appellee une fois
    sinon.assert.calledOnce(recupererListeSemaineSTUB);
    });
    });   
    describe('recupererHoraire', function (done) {
   it('devrait retourner le bon horaire', async () => {
         const horaire = await Ressources.recupererHoraire('001','2019-10-07','Gestion3525');
         expect(horaire).to.deep.equal(Horaire00120191007Gestion3525);
      });
     it('devrait retourner vrai', async function() {
    const req = mockReq({ body: {}});
    const res = mockRes();
    recupererHoraireSTUB = sinon.stub(Ressources,'recupererHoraire');
    await AfficherHoraire.fonctions2(req, res); 
    sinon.assert.calledOnce(res.json); //res.json a ete appellee une fois
    sinon.assert.calledOnce(recupererHoraireSTUB);
    sinon.assert.calledWithExactly(recupererHoraireSTUB, '000', '01-01-1899', undefined);
   });
       
 });

});






