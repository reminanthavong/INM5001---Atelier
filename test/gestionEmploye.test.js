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
