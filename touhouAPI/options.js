module.exports.collectionOptions = (req, res) => { 
    res.set({
        'Allow': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': ['application/json','application/x-www-form-urlencoded'],
        'Content-Type': 'application/json',
        'Accept': ['application/json','application/x-www-form-urlencoded']
    });

    if(req.method == 'OPTIONS'){
        res.end();
    }
    else{
        return res;
    }
}

module.exports.detailOptions = (req, res) => {
    res.header('Allow', 'GET, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', ['application/json application','application/x-www-form-urlencoded']);
    res.header('Content-Type','application/json');
    res.header('Accept', ['application/json', 'application/x-www-form-urlencoded']);

    
    if(req.method == 'OPTIONS'){
        res.end();
    }
    else{
        return res;
    }
}