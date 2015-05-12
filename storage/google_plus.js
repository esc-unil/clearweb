'use strict';
/**
 * Created by tpineau
 *
 * Script de recherche sur Google+
 *
 * Pour statusSearch et userStatus (recherche de postes (activit�s) par mots-clefs ou par utilisateur, respectivement):
 * Chaques postes correspond � un objet avec les param�tres suivants:
 *  {
 *    _id :         le num�ro d'identification de l'objet
 *    keywords:     le/les mots-clefs utilis�s lors de la requ�te ou l'id de l'utilisateur pour la recherche de postes
 *    date:         la date de la requ�te
 *    type:         "post"
 *    args:         le/les arguments utilis�s lors de la requ�te
 *    result:       les donn�es du poste
 *    integrate:    indique si l'objet � d�j� �t� pars� et int�gr� dans la collection d'URLs (0 si non)
 *  }
 *
 *  Les fonctions statusSearchOld / userStatusOld et statusSearchNew / userStatusNew permettent de rechercher les postes
 *  plus vieux ou plus r�cents (respectivement) que ceux contenus dans la DB pour un mot-clef ou un utilisateur sp�cifique.
 *
 *
 * Pour la recherche d'utilisateurs ou de pages, une recherche correspond � un objet avec les param�tres suivants:
 * *  {
 *    _id :         le num�ro d'identification de l'objet
 *    keywords:     le/les mots-clefs utilis�s lors de la requ�te
 *    date:         la date de la requ�te
 *    type:         "users"
 *    args:         le/les arguments utilis�s lors de la requ�te
 *    result:       le r�sultat de la requ�te (array contenant les donn�es sur les utilisateurs)
 *    integrate:    indique si l'objet � d�j� �t� pars� et int�gr� dans la collection d'URLs (0 si non)
 *  }
 */

var mongo = require('./../mongodb.js');
var mongoClient = require('mongodb').MongoClient;
var gplus = require('./../api_request/google_plus.js');

function statusSearch(keyword, num, opt_args, callback){
// Fonction de recherche d'activit�s sur Google+ et stockage dans la DB dans la collection google_plus
    if (typeof opt_args === 'function') {
        callback = opt_args;
        opt_args = {};
    }
    gplus.statusSearch(keyword, num, opt_args, function(err, response){
        if (err) {callback(err);}
        else {
            var results = [];
            for (var i = 0; i < response.length; i++) {
                response[i].integrate = 0;
                results.push(response[i]);
            }
            if (results.length != 0) {
                mongo.insert('google_plus', results, callback);
            }
        }
    });
}

function usersSearch(keyword, num, opt_args, callback){
// Fonction de recherche d'utilisateurs ou de pages sur Google+ et stockage dans la DB dans la collection twitter
    if (typeof opt_args === 'function') {
        callback = opt_args;
        opt_args = {};
    }
    gplus.usersSearch(keyword, num, opt_args, function(err, response){
        if (err) callback(err);
        else {
            response.integrate = 0;
            mongo.insert('google_plus', response, callback);
        }
    });
}

function userStatus(id, num, opt_args, callback){
// Fonction de recherche d'activit�s d'un utilisateur particulier sur Google+ et stockage dans la DB dans la collection google_plus
    if (typeof opt_args === 'function') {
        callback = opt_args;
        opt_args = {};
    }
    gplus.userStatus(id, num, opt_args, function(err, response){
        if (err) {callback(err);}
        else {
            var results = [];
            for (var i = 0; i < response.length; i++) {
                response[i].integrate = 0;
                results.push(response[i]);
            }
            if (results.length != 0) {
                mongo.insert('google_plus', results, callback);
            }
        }
    });
}



exports.statusSearch = statusSearch;
exports.usersSearch = usersSearch;
exports.userStatus = userStatus;

//statusSearch('steroid',15,function(a,b){console.log(a);});
//userStatus('102090703178046743178',10,function(a,b){console.log(a);});
//usersSearch('steroid',10,function(a,b){console.log(a);});
