//***********************************************************//
const { mockReq, mockRes } = require('sinon-express-mock');
var sinon = require('sinon');
var assert = require('chai').assert;
const expect = require('chai').expect;
//***********************************************************//
var {recupererListeSemaine} = require('../afficherhoraire'); //Destructuration : recupere seulement recupererListeSemaine
//***********************************************************//

describe('test de AfficherHoraire', function (done) {
   describe('recupererListeSemaine', function (done) {
   it('devrait 001', async () => {
         const listeSemaine = await recupererListeSemaine();
         expect(listeSemaine).to.deep.equal({choixSemaines: [{ idtablehoraire: '001' }]});
      });
   });
    describe('fonctions1', function (done) {
    it('devrait retourner vrai', async function() {
    const req = mockReq();
    const res = mockRes();
    const recupererListeSemaineSTUB = sinon.stub(recupererListeSemaine).returns({choixSemaines: [{ idtablehoraire: '001' }]});

    await fonctions1(req, res); 
    sinon.assert.calledOnce(res.json); //res.json a ete appellee une fois
    sinon.assert.calledOnce(recupererListeSemaine);
    sinon.assert.calledWithExactly(recupererListeSemaine, null); //recupererListeSemaine a bien ete appelle dans fonctions1
    });
 });

});






