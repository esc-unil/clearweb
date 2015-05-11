'use strict';
/**
 * Created by tpineau
 *
 * Script de recherche sur Twitter
 *
 * Chaques tweets correspond � un objet avec les param�tres suivants:
 *  {
 *    _id :         le num�ro d'identification de l'objet
 *    keywords:     le/les mots-clefs utilis�s lors de la requ�te ou l'id de l'utilisateur pour la recherche de poste par utilisateur
 *    date:         la date de la requ�te
 *    type:         "post" pour les tweets
 *    args:         le/les arguments utilis�s lors de la requ�te
 *    result:       les donn�es du tweet
 *    integrate:    indique si l'objet � d�j� �t� pars� et int�gr� dans la collection d'URLs (0 si non)
 *  }
 *
 *  Les fonctions searchOld et searchNew permettent de rechercher les postes plus vieux ou plus r�cents (respectivement)
 *  que ceux contenus dans la DB pour un mot-clef sp�cifique.
 *
 */

var mongo = require('./../mongodb.js');
var mongoClient = require('mongodb').MongoClient;
var twitter = require('./../api_request/twitter.js');

function statusSearch(keyword, num, opt_args, callback){
    if (typeof opt_args === 'function') {
        callback = opt_args;
        opt_args = {};
    }
    twitter.statusSearch(keyword, num, opt_args, function(err, response){
        if (err) {callback(err);}
        else {
            var results = [];
            for (var i = 0; i < response.length; i++) {
                response[i].integrate = 0;
                results.push(response[i]);
            }
            if (results.length != 0) {
                mongo.insert('twitter', results, callback);
           }
        }
    });
}

function searchOld(keyword, num, opt_args, callback){
//Recherche de postes ant�rieur au plus vieux stock�s dans la base de donn�e MongoDB
    if (typeof opt_args === 'function') {
        callback = opt_args;
        opt_args = {};
    }
    maxid(keyword, function(err, max_id){
        if (err) {callback(err);}
        else {
            opt_args.max_id = max_id;
            statusSearch(keyword, num, opt_args, callback);
        }
    })
}

function searchNew(keyword, num, opt_args, callback){
//Recherche de postes ant�rieur au plus vieux stock�s dans la base de donn�e MongoDB
    if (typeof opt_args === 'function') {
        callback = opt_args;
        opt_args = {};
    }
    sinceid(keyword, function(err, since_id){
        if (err) {callback(err);}
        else {
            opt_args.since_id = since_id;
            statusSearch(keyword, num, opt_args, callback);
        }
    })
}

function sinceid(keyword, callback){
    cursor(-1, keyword, callback);
}

function maxid(keyword, callback){
    cursor(1, keyword, callback);
}

function cursor(cible, keyword, callback){
    mongoClient.connect(mongo.mongoPath, function(err, db) {
        if (err) {callback(err);}
        else {
            var collection = db.collection('twitter');
            collection.count(function(err, n){
                if (n === 0){
                    db.close();
                    callback(null, null);
                }
                else{
                    collection.count({keywords:keyword, type: 'post'}, function(err, n1){
                        if (n1 === 0){
                            db.close();
                            callback(null, null);
                        }
                        else{
                            collection.find({keywords: keyword, type: 'post'}).sort({'result.created_at': cible}).limit(1).toArray(function (err, res) {
                                if (err) {callback(err);}
                                else {
                                    db.close();
                                    console.log(res[0].result.id_str);
                                    callback(null, res[0].result.id_str);
                                }
                            });

                        }
                    });

                }
            });
        }
    });
}

exports.statusSearch = statusSearch;
exports.searchNew = searchNew;
exports.searchOld = searchOld;


searchNew('steroid',1000, function(err,res){console.log(err);});