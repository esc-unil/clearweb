'use strict';
/**
 * Created by tpineau
 */


var async = require("async");

function getURL(target, callback) {
    mongoClient.connect(mongo.mongoPath, function(err, db) {
        db.collection('bing').find(target).toArray(function (err, res) {
            if (err) {
                callback(err);
            }
            else {
                async.eachLimit(
                    res,
                    20,
                    function (obj, cbObj) {
                        db.collection('bing').update({_id: mongo.ObjectId(obj._id)}, {$set: {integrate: 1}}, function (err) {
                            if (err) console.log(obj._id, err);
                        });
                        var rank = 1;
                        async.eachSeries(
                            obj.result,
                            function (item, cbItem) {
                                if (obj.type === 'web') {
                                    var url = item.Url;
                                }
                                else if (obj.type === 'images' || obj.type === 'videos') {
                                    var url = item.MediaUrl;
                                }
                                var result = {
                                    url: url,
                                    keywords: obj.keywords,
                                    date: obj.date,
                                    platform: 'bing',
                                    type: obj.type,
                                    info: {
                                        ranking: rank
                                    }
                                };
                                db.collection('urls').insert(result, function (err) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    rank++;
                                    cbItem();
                                })
                            },
                            function (err) {
                                if (err) {
                                    console.log(err);
                                }
                                cbObj()
                            }
                        );
                    },
                    function (err) {
                        db.close();
                        callback(err);
                    }
                );
            }
        });
    });
}

exports.getURL = getURL;
