//***********************************************************//
const { mockReq, mockRes } = require('sinon-express-mock');
var sinon = require('sinon');
var assert = require('chai').assert;
const expect = require('chai').expect;
//***********************************************************//
var AfficherHoraire = require('../afficherhoraire'); //Destructuration : recupere seulement recupererListeSemaine et fonctions1
//***********************************************************//

describe('test de AfficherHoraire', function (done) {
   describe('recupererListeSemaine', function (done) {
   it('devrait retourner 001', async () => {
         const listeSemaine = await AfficherHoraire.recupererListeSemaine();
         expect(listeSemaine).to.deep.equal({choixSemaines: [{ idtablehoraire: '001' }]});
      });
   });
    describe('fonctions1', function (done) {
    it('devrait retourner vrai', async function() {
    const req = mockReq();
    const res = mockRes();
    //const AfficherHoraireSTUB = sinon.stub(AfficherHoraire);
    const AfficherHoraireSTUB = sinon.spy(AfficherHoraire);
    await AfficherHoraire.fonctions1(req, res); 
    sinon.assert.calledOnce(res.json); //res.json a ete appellee une fois
    //sinon.assert.calledOnce(AfficherHoraireSTUB.recupererListeSemaine);
    //sinon.assert.calledWithExactly(recupererListeSemaineSTUB, null); //recupererListeSemaine a bien ete appelle dans fonctions1
    });
 });

});






