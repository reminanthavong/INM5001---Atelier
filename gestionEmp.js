"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var url = "/Employe";
var btnCreer = document.getElementById("btncreeremploye");
var btnAfficher = document.getElementById("btnchercheremploye");
var btnCongedier = document.getElementById("btncongediement");
btnCreer.addEventListener("click", function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonEmp, nbrHeures, result, success;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonEmp = {};
                jsonEmp.IDEmploye = creerIDEmploye();
                jsonEmp.NomEmploye = document.getElementById('nomemployeid').innerText;
                jsonEmp.PrenomEmploye = document.getElementById('prenomemployeid').innerText;
                nbrHeures = document.getElementById('nbheuresmaxid').innerText;
                jsonEmp.NBRHeuresMax = +nbrHeures;
                jsonEmp.DateEmbauche = document.getElementById('dateembauche').innerText;
                jsonEmp.MotDePasse = document.getElementById('motdepasse').innerText;
                return [4 /*yield*/, fetch(url, { method: "POST",
                        headers: { "content-type": "application/json" }, body: JSON.stringify(jsonEmp) })];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, result.json()];
            case 2:
                success = _a.sent();
                if (success) {
                    alert("L'employé a été ajouté!");
                }
                else {
                    console.log("impossible d'afficher les employés");
                }
                return [2 /*return*/];
        }
    });
}); });
function creerIDEmploye() {
    var ID;
    var nom = document.getElementById('nomemployeid').innerText;
    var nomQuatre = nom.substring(0, 3);
    var prenom = document.getElementById('prenomemployeid').innerText;
    var prenomUn = prenom.charAt(0);
    ID = prenomUn.concat(nomQuatre);
    return ID;
}
btnAfficher.addEventListener("click", function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var tableEmploye_1, resultat, employes, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                alert("B");
                tableEmploye_1 = document.getElementById("tableEmploye");
                return [4 /*yield*/, fetch(url, { method: "GET" })];
            case 1:
                resultat = _a.sent();
                return [4 /*yield*/, resultat.json()];
            case 2:
                employes = _a.sent();
                employes.forEach(function (t) {
                    var tr = document.createElement("tr");
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    var td3 = document.createElement("td");
                    var td4 = document.createElement("td");
                    var td5 = document.createElement("td");
                    td1.textContent = t.IDEmploye;
                    td2.textContent = t.NomEmploye;
                    td3.textContent = t.PrenomEmploye;
                    td4.textContent = t.NBRHeuresMax;
                    td5.textContent = t.DatEmbauche;
                    tableEmploye_1.appendChild(tr);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                });
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.log("Impossible d'afficher les employes");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
btnCongedier.onclick = function (event) {
    alert("Message d'alerte");
};
