//***********************************************************//
const { mockReq, mockRes } = require('sinon-express-mock');
var sinon = require('sinon');
var assert = require('chai').assert;
const expect = require('chai').expect;
//***********************************************************//
var AfficherHoraire = require('../afficherhoraire'); //Destructuration : recupere seulement recupererListeSemaine et fonctions1
//***********************************************************//
 var Horaire00120191007Gestion3525 = { horaires:
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
         const listeSemaine = await AfficherHoraire.recupererListeSemaine();
         expect(listeSemaine).to.deep.equal({choixSemaines: [{ idtablehoraire: '001' }]});
      });
   });
    describe('fonctions1', function (done) {
     //Pour reinitilialiser le stub
     //afterEach(() => {
     //   sinon.restore();
     //});     
    it('devrait retourner vrai', async function() {
    const req = mockReq();
    const res = mockRes();
    //const recupererListeSemaineSTUB = sinon.stub(AfficherHoraire,'recupererListeSemaine');
    await AfficherHoraire.fonctions1(req, res); 
    //sinon.assert.calledOnce(res.json); //res.json a ete appellee une fois
    //sinon.assert.calledOnce(recupererListeSemaineSTUB);
    //sinon.assert.calledWithExactly(recupererListeSemaineSTUB, null); //recupererListeSemaine a bien ete appelle dans fonctions1
    });
       
    describe('recupererHoraire', function (done) {
   it('devrait retourner le bon horaire', async () => {
         const horaire = await AfficherHoraire.recupererHoraire('001','2019-10-07','Gestion3525');
         console.log(horaire);
         expect(horaire).to.deep.equal(Horaire00120191007Gestion3525);
      });
   });
       
 });

});






