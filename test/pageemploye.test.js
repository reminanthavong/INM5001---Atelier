//***********************************************************//
const { mockReq, mockRes } = require('sinon-express-mock');
const sinon = require('sinon');
const assert = require('chai').assert;
const expect = require('chai').expect;
//***********************************************************//
const PageEmploye = require('../src/backend/pageemploye.js'); 
//***********************************************************//
 
//***********************************************************//

describe('test de PageEmploye', function (done) {
 
 /**********/
   describe('getDisponibilite', function (done) {
   xit('devrait retourner les disponibilites de lemploye', async () => {
         const Disponibilite = await PageEmploye.getDisponibilites('TREIK');
         console.log(Disponibilite);
         expect(Disponibilite).to.deep.equal();
      });
   });
  /**********/

 it('devrait retourner vrai', async function() {
    const req = mockReq();
    const res = mockRes();
    getDisponibilitesSTUB = sinon.stub(PageEmploye,'getDisponibilites');
    await PageEmploye.afficherDisponibilites(req, res); 
    //sinon.assert.calledOnce(res.json); //res.json a ete appellee une fois
    sinon.assert.calledOnce(getDisponibilitesSTUB);
    });
   /**********/
});
