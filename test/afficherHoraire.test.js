//***********************************************************//
const { mockReq, mockRes } = require('sinon-express-mock');
const sinon = require('sinon');
const assert = require('chai').assert;
const expect = require('chai').expect;
//***********************************************************//
const AfficherHoraire = require('../src/backend/afficherhoraire'); 
const Ressources = require('../src/backend/ressources'); 
const GenererHoraire = require('../src/backend/GenererHoraire'); 
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
 const HoraireGenere00120191007Gestion3525 =  {horaires:
          [ { idtablehoraire: '001',
              dateparam: '2019-10-07',
              idemployeur: 'Gestion3525',
              idemploye: 'DPURN',
              joursemaine: '4',
              typequart: 'N',
              selection: '1' },
            { idtablehoraire: '001',
              dateparam: '2019-10-07',
              idemployeur: 'Gestion3525',
              idemploye: 'EBECK',
              joursemaine: '3',
              typequart: 'S',
              selection: '1' },
            { idtablehoraire: '001',
              dateparam: '2019-10-07',
              idemployeur: 'Gestion3525',
              idemploye: 'EBECK',
              joursemaine: '6',
              typequart: 'N',
              selection: '1' },
            { idtablehoraire: '001',
              dateparam: '2019-10-07',
              idemployeur: 'Gestion3525',
              idemploye: 'EBECK',
              joursemaine: '7',
              typequart: 'J',
              selection: '1' },
            { idtablehoraire: '001',
              dateparam: '2019-10-07',
              idemployeur: 'Gestion3525',
              idemploye: 'JNASH',
              joursemaine: '4',
              typequart: 'S',
              selection: '1' },
            { idtablehoraire: '001',
              dateparam: '2019-10-07',
              idemployeur: 'Gestion3525',
              idemploye: 'JNASH',
              joursemaine: '6',
              typequart: 'S',
              selection: '1' },
            { idtablehoraire: '001',
              dateparam: '2019-10-07',
              idemployeur: 'Gestion3525',
              idemploye: 'JNASH',
              joursemaine: '7',
              typequart: 'J',
              selection: '2' } ]
}
//***********************************************************//

describe('test de AfficherHoraire', function (done) {
 /**********/
   describe('recupererListeSemaine', function (done) {
   it('devrait retourner 001', async () => {
         const listeSemaine = await Ressources.recupererListeSemaine();
         expect(listeSemaine).to.deep.equal({choixSemaines: [{ idtablehoraire: '001' }]});
      });
   });
  /**********/

    describe('afficherChoixHoraire', function (done) {
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
    await AfficherHoraire.afficherChoixHoraire(req, res); 
    sinon.assert.calledOnce(res.json); //res.json a ete appellee une fois
    sinon.assert.calledOnce(recupererListeSemaineSTUB);
    });
    
    });

  /**********/
    describe('recupererHoraire', function (done) {
   it('devrait retourner le bon horaire', async () => {
         const horaire = await Ressources.recupererHoraire('001','2019-10-07','Gestion3525');
         expect(horaire).to.deep.equal(Horaire00120191007Gestion3525);
      });
     it('devrait retourner vrai', async function() {
    const req = mockReq({ body: {}});
    const res = mockRes();
    recupererHoraireSTUB = sinon.stub(Ressources,'recupererHoraire');
    await AfficherHoraire.afficherHoraire(req, res); 
    sinon.assert.calledOnce(res.json); //res.json a ete appellee une fois
    sinon.assert.calledOnce(recupererHoraireSTUB);
    sinon.assert.calledWithExactly(recupererHoraireSTUB, '000', '01-01-1899', undefined);
   });   
 });
 /**********/
     describe('recupererHoraire', function (done) {
   it('devrait retourner le bon horaire', async () => {
         const horaire = await GenererHoraire.GenererHoraire('001','2019-10-07','Gestion3525');
         expect(horaire).to.deep.equal(HoraireGenere00120191007Gestion3525);
      });
      
     it('devrait appeller la fonction', async function() {
    const req = mockReq({ body: {}});
    const res = mockRes();
    GenererHoraireSTUB = sinon.stub(GenererHoraire,'GenererHoraire');
    await AfficherHoraire.GenererHoraireReponse(req, res); 
    sinon.assert.calledOnce(res.json); //res.json a ete appellee une fois
    sinon.assert.calledOnce(GenererHoraireSTUB);
    sinon.assert.calledWithExactly(GenererHoraireSTUB, '000', '01-01-1899', undefined);
   });   
 });
 /**********/
 
});
