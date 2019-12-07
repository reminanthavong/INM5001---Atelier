var PostgREST = require('postgrest-client')
var Api = new PostgREST ('http://testpostgrest-calendrier.herokuapp.com')
const bodyParser = require('body-parser')
const session = require('express-session');
//***********************************************************//
const { mockReq, mockRes } = require('sinon-express-mock');
const sinon = require('sinon');
const assert = require('chai').assert;
const expect = require('chai').expect;
//***********************************************************//
const PageEmploye = require('../src/backend/pageemploye.js'); 
//***********************************************************//
 const DisponibilitesTREIK =       [
         {
           idemployeur: 'Gestion8768',
           idemploye: 'TREIK',
           idtablehoraire: '001',
           typequart: 'N',
           joursemaine: '6',
           disponibilite: '0',
           paramtype: '0'
         },
         {
           idemployeur: 'Gestion8768',
           idemploye: 'TREIK',
           idtablehoraire: '001',
           typequart: 'N',
           joursemaine: '7',
           disponibilite: '1',
           paramtype: '0'
         },
         {
           idemployeur: 'Gestion8768',
           idemploye: 'TREIK',
           idtablehoraire: '000',
           typequart: 'N',
           joursemaine: '1',
           disponibilite: '0',
           paramtype: '1'
         },
         {
           idemployeur: 'Gestion8768',
           idemploye: 'TREIK',
           idtablehoraire: '000',
           typequart: 'S',
           joursemaine: '1',
           disponibilite: '0',
           paramtype: '1'
         },
         {
           idemployeur: 'Gestion8768',
           idemploye: 'TREIK',
           idtablehoraire: '000',
           typequart: 'S',
           joursemaine: '2',
           disponibilite: '0',
           paramtype: '1'
         },
         {
           idemployeur: 'Gestion8768',
           idemploye: 'TREIK',
           idtablehoraire: '000',
           typequart: 'N',
           joursemaine: '2',
           disponibilite: '0',
           paramtype: '1'
         },
         {
           idemployeur: 'Gestion8768',
           idemploye: 'TREIK',
           idtablehoraire: '000',
           typequart: 'S',
           joursemaine: '3',
           disponibilite: '0',
           paramtype: '1'
         },
         {
           idemployeur: 'Gestion8768',
           idemploye: 'TREIK',
           idtablehoraire: '000',
           typequart: 'N',
           joursemaine: '3',
           disponibilite: '0',
           paramtype: '1'
         },
         {
           idemployeur: 'Gestion8768',
           idemploye: 'TREIK',
           idtablehoraire: '000',
           typequart: 'S',
           joursemaine: '4',
           disponibilite: '0',
           paramtype: '1'
         },
         {
           idemployeur: 'Gestion8768',
           idemploye: 'TREIK',
           idtablehoraire: '000',
           typequart: 'N',
           joursemaine: '4',
           disponibilite: '0',
           paramtype: '1'
         },
         {
           idemployeur: 'Gestion8768',
           idemploye: 'TREIK',
           idtablehoraire: '000',
           typequart: 'S',
           joursemaine: '5',
           disponibilite: '0',
           paramtype: '1'
         },
         {
           idemployeur: 'Gestion8768',
           idemploye: 'TREIK',
           idtablehoraire: '000',
           typequart: 'N',
           joursemaine: '5',
           disponibilite: '0',
           paramtype: '1'
         },
         {
           idemployeur: 'Gestion8768',
           idemploye: 'TREIK',
           idtablehoraire: '000',
           typequart: 'J',
           joursemaine: '1',
           disponibilite: '1',
           paramtype: '1'
         },
         {
           idemployeur: 'Gestion8768',
           idemploye: 'TREIK',
           idtablehoraire: '000',
           typequart: 'J',
           joursemaine: '2',
           disponibilite: '1',
           paramtype: '1'
         },
         {
           idemployeur: 'Gestion8768',
           idemploye: 'TREIK',
           idtablehoraire: '000',
           typequart: 'J',
           joursemaine: '3',
           disponibilite: '1',
           paramtype: '1'
         },
         {
           idemployeur: 'Gestion8768',
           idemploye: 'TREIK',
           idtablehoraire: '000',
           typequart: 'J',
           joursemaine: '4',
           disponibilite: '1',
           paramtype: '1'
         },
         {
           idemployeur: 'Gestion8768',
           idemploye: 'TREIK',
           idtablehoraire: '000',
           typequart: 'J',
           joursemaine: '5',
           disponibilite: '1',
           paramtype: '1'
         }
       ]
//***********************************************************//

describe('test de PageEmploye', function (done) {
 
 /**********/
   describe('getDisponibilite', function (done) {
   it('devrait retourner les disponibilites de lemploye', async () => {
         const Disponibilite = await PageEmploye.getDisponibilites('TREIK');
         expect(Disponibilite).to.deep.equal(DisponibilitesTREIK);
      });
   });
  /**********/
 describe('afficherDisponibilites', function (done) {
 it('devrait retourner vrai', async function() {
    const req = mockReq();
    const res = mockRes();
    getDisponibilitesSTUB = sinon.stub(PageEmploye,'getDisponibilites');
    .buffer(true)
    await PageEmploye.afficherDisponibilites(req, res); 
    //sinon.assert.calledOnce(res.send); //res.send a ete appellee une fois
    //sinon.assert.calledOnce(res.setHeader); //res.send a ete appellee une fois
    sinon.assert.calledOnce(getDisponibilitesSTUB);

    });
   });
   /**********/
});
