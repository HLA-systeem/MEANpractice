const CHARACTER = require('../models/character');
const STATUS = require('../httpCodes');
const OPTIONS = require('../options');
const PAGINATION = require('../paginate'); 


module.exports.getCharacter = (req, res) => {//check of id is meegegeven voor detail anders alle resorces
    var search = {};
    var start = 0;
    var limit = 0;

    for (let query in req.query){
        switch(query) {
            case 'start':
                start = parseInt(req.query.start);
                break;
            case 'limit':
                limit = parseInt(req.query.limit);
                break;
            case 'name': 
                search.name = new RegExp(req.query.name, 'i');
                break;
            case 'species':
                search.species = new RegExp(req.query.species, 'i');
                break;
            case 'capable_of':
                search.capable_of = new RegExp(req.query.capable_of, 'i');
                break;
            case 'residence':
                search.residence = new RegExp(req.query.residence, 'i');
                break;
            case 'eye_color':
                search.eye_color = new RegExp(req.query.eye_color, 'i');
                break;
            case 'hair_color':
                search.hair_color = new RegExp(req.query.hair_color, 'i');
                break;
        }
    }
    
    if(req.params.id != null){
        res = OPTIONS.detailOptions(req,res);
        CHARACTER.model.find({_id:req.params.id}).lean().exec((err, data) => {
            if(!STATUS.serie400(err,req,res,data)){
                data[0]._links = {};
                data[0]._links.self = {'href':'http://' + req.headers.host + '/characters/' + data[0]._id};
                data[0]._links.collection = {'href':'http://' + req.headers.host + '/characters/'};
                STATUS.serie200(req, res, data[0]);
            }
        });
    } 
    else{
        res = OPTIONS.collectionOptions(req,res); 
        CHARACTER.model.find(search).skip(start).limit(limit).exec((err, data) => {
            if(!STATUS.serie400(err,req,res,data)){
                let collection= [];
                data.forEach((element, index, array) => {
                    let jsonData = element.toJSON();
                    jsonData._links = {self: {'href':'http://' + req.headers.host + '/characters/' + jsonData._id}};
                    collection.push(jsonData);
                });

                let resObject = {}
                resObject.items = collection;
                resObject._links = {self: {'href': 'http://' + req.headers.host + '/characters'}};

                CHARACTER.model.count({}).exec((err2, total) =>{
                    resObject.pagination = PAGINATION.paginate(start,limit,total,req);
                    STATUS.serie200(req, res, resObject); 
                });
            }
        });
    }  
}

module.exports.postCharacter = (req, res) =>{
    let data = new CHARACTER.model({
        name: req.body.name,
        species: req.body.species,
        capable_of: req.body.capable_of,
        residence: req.body.residence,
        eye_color: req.body.eye_color,
        hair_color: req.body.hair_color,
    });

    
    data.save( (err, data) => {
        if(!STATUS.serie400(err,req,res,data)){
            STATUS.serie200(req,res,data);
        } 
    });
}

module.exports.rewriteCharacter = (req, res) => { 
    CHARACTER.model.findOne({_id:req.params.id}).exec((err,data) => {
        data.name = req.body.name;
        data.species = req.body.species;
        data.capable_of = req.body.capable_of;
        data.residence = req.body.residence;
        data.eye_color = req.body.eye_color;
        data.hair_color = req.body.hair_color;

        data.save( (err, data) => {
            if(!STATUS.serie400(err,req,res,data)){
                STATUS.serie200(req,res,data);
            } 
        });
    });
}

module.exports.updateCharacter = (req, res) => {
    CHARACTER.model.findOneAndUpdate({_id:req.params.id}, req.body,{new: true}).exec((err,data) =>{ 
        if(!STATUS.serie400(err,req,res,data)){
            STATUS.serie200(req,res,data);
        }
    });
}

module.exports.deleteCharacter = (req, res) => {
    CHARACTER.model.findOneAndRemove({_id:req.params.id}).exec((err,data) =>{ 
        if(!STATUS.serie400(err,req,res,data)){
            STATUS.serie200(req,res,data);
        }
    });
}