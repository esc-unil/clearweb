'use strict';
/**
 * Created by tpineau
 */

var async = require("async");
var urlparse = require('url').parse;

function getURL(db, col, target, callback) {
    db.collection('bing').find(target).toArray(function (err, res) {
        if (err) {
            callback(err);
        }
        else {
            async.eachSeries(
                res,
                function (obj, cbObj) {
                    db.collection('bing').update({_id: obj._id}, {$set: {integrate: 1}}, function (err) {
                        if (err) console.log(obj._id, err);
                    });
                    async.eachSeries(
                        obj.result,
                        function (item, cbItem) {
                            if (obj.type === 'web') {var url = item.Url;}
                            else if (obj.type === 'images' || obj.type === 'videos') {var url = item.MediaUrl;}
                            var hostname = urlparse(url).hostname;
                            var id = 'bing;' + obj.type + ';' + hostname;
                            db.collection(col).find({_id:id}).toArray(function (err, elem) {
                                if (err) cbItem();
                                else {
                                    elem = elem[0];
                                    if (elem === undefined){ // pas encore le hostname/type
                                        var result = {
                                            _id: id,
                                            urls: [url],
                                            hostname: hostname,
                                            keywords: [obj.keywords],
                                            date: obj.date,
                                            platform: 'bing',
                                            type: obj.type,
                                            info: {
                                                date1: obj.date,
                                                date2: obj.date
                                            },
                                            integrate: 0
                                        };
                                        db.collection(col).insert(result, function(err){cbItem();});
                                    }
                                    else { //mise a jour pour le hostname/type
                                        var add = {$addToSet: {urls: url, keywords: obj.keywords}};
                                        if (elem.info.date2 < obj.date){add['$set'] = {'info.date2': obj.date}}
                                        db.collection(col).update({_id: id}, add, function(err){cbItem();});
                                    }
                                }
                            });
                        },
                        function (err) {
                            if (err) {console.log(err);}
                            cbObj()
                        }
                    );
                },
                function (err) {callback(err);}
            );
        }
    });
}

exports.getURL = getURL;
