const MONGOOSE = require('mongoose');
const CRUDS = require('../cruds/charaterCruds');

MONGOOSE.Promise = global.Promise;

var CharacterSchema = MONGOOSE.Schema(
    {
        name:{
            type: String,
            required: true
            },

        species:{
            type: String,
            required: true
        },

        capable_of:{
            type: String,
            required: true    
        },

        residence:{
            type: String,
            required: true
        },

        eye_color:{
            type: String,
            required: true
        },

        hair_color:{
            type: String,
            required: true
        },

        last_updated:{
            type: Date,
            default: Date.now
        }
    },
    
    {versionKey: false}
);

module.exports.model = MONGOOSE.model('Touhou Character', CharacterSchema);
module.exports.get = CRUDS.getCharacter;
module.exports.post = CRUDS.postCharacter;
module.exports.update = CRUDS.updateCharacter;
module.exports.rewrite = CRUDS.rewriteCharacter;
module.exports.delete = CRUDS.deleteCharacter;
