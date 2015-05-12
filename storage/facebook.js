'use strict';
/**
 * Created by tpineau
 *
 * Script de recherche sur Facebook et stockage des informations dans une banque de donn�e MongoDB
 * dans la collection facebook (les informations sur la DB sont stock�es dans le fichier keys.json).
 * une recherche correspond � un objet avec les param�tres suivants:
 *
 *  {
 *    _id :         le num�ro d'identification de l'objet
 *    keywords:     le/les mots-clefs utilis�s lors de la requ�te
 *    date:         la date de la requ�te
 *    type:         "pages" ou "places" selon si la requ�te cibl�e les pages ou les lieux
 *    args:         le/les arguments utilis�s lors de la requ�te
 *    result:       le r�sultat de la requ�te (array contenant les donn�es des pages/lieux)
 *    integrate:    indique si l'objet � d�j� �t� pars� et int�gr� dans la collection d'URLs (0 si non)
 *  }
 *
 */

var mongo = require('./../mongodb.js');
var facebook = require('./../api_request/facebook.js');

function pagesSearch(keyword, num, opt_args, callback){
// Fonction de recherche de page sur Facebook et stockage des r�sultats dans la DB, dans la collection facebook
    if (typeof opt_args === 'function') {
        callback = opt_args;
        opt_args = null;
    }
    facebook.pagesSearch(keyword, num, opt_args, function(err, response){
        if (err) callback(err);
        else {
            response.integrate = 0;
            mongo.insert('facebook', response, callback);
        }
    });
}

function placesSearch(keyword, num, opt_args, callback){
// Fonction de recherche de lieux sur Facebook et stockage des r�sultats dans la DB, dans la collection facebook
    if (typeof opt_args === 'function') {
        callback = opt_args;
        opt_args = null;
    }
    facebook.placesSearch(keyword, num, opt_args, function(err, response){
        if (err) callback(err);
        else {
            response.integrate = 0;
            mongo.insert('facebook', response, callback);
        }
    });
}

exports.pagesSearch = pagesSearch;
exports.placesSearch = placesSearch;