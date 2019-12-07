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
   it('devrait retourner les disponibilites de lemploye', async () => {
         const Disponibilite = await PageEmploye.getDisponibilite('TREIK');
         console.log(Disponibilite);
         expect(Disponibilite).to.deep.equal();
      });
   });
  /**********/
});
