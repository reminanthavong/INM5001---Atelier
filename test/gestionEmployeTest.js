/*const assert = require('chai').assert;
const sinon = require('sinon');
const chai = require('chai');
const gestionEmploye = require('../gestionemploye');
const request = require('request');
chai.should();

//Resultats
//ajoutetEmployeResultat = gestionEmploye.fajouterEmploye()
let ajout = {};
ajout.nomemploye = "Louis";
ajout.prenomEmploye = "Kayla";
ajout.idemploye = "LKAYL";
ajout.nbrheuresmax = 40;
ajout.dateembauche = Date.now();
ajout.motdepasse = "abc123";
var sessEmp = "Gestion";

const envoye = {body: JSON.stringify(ajout) };

describe('gestionEmploye', function(){
	describe('fajouterEmploye()', function(){
		//TODO
	});	
	
	describe('fafficherEmployes()', function(){
		
		beforeEach(()=>{
			sinon
			.stub(request, "get")
			.yields(undefined, {}, JSON.stringify({rows: 
				[{idemploye: "LKAYL", nomemploye: "Louis", prenomemploye: "Kayla", nbrheuresmax: 40, dateembauche: "2019-10-02"},
				{idemploye: "BMICH", nomemploye: "Beaudoin", prenomemploye: "Michel", nbrheuresmax: 40, dateembauche: "2019-12-02"}]
			}));
		})
		
		afterEach(()=>{
			request.get.restore();
		})

		it("La liste des employés devrait être retournée.", done => {
			let req = {session: {username: "Gestion"}}
			let response = {setHeader: sinon.stub(), send: sinon.stub()};
			gestionEmploye.fafficherEmployes(req, response)
			.then(result =>{
				result.rows.should.exist;
				console.log(result.rows);
				done();
			})
			.catch(done);
			
		});
	});
	
	
});
			
*/
