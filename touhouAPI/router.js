const EXPRESS = require('express');
const ROUTER = EXPRESS.Router(); 
const CHARACTER = require('./models/character');
const OPTIONS = require('./options');

ROUTER.route('/').get(getRoot);
ROUTER.route('/characters/').get(CHARACTER.get).post(CHARACTER.post).options(OPTIONS.collectionOptions);
ROUTER.route('/characters/:id').get(CHARACTER.get).patch(CHARACTER.update).put(CHARACTER.rewrite).delete(CHARACTER.delete).options(OPTIONS.detailOptions);
    
function getRoot(req, res){
    let query = {};
    let start = 0;
    let limit = 0;
    res.send('<a href="/characters">Touhou Charater Collection</a>');
}

module.exports = ROUTER;
