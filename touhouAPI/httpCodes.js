module.exports.serie500 = (err, req, res, next) => {
    console.log(err);
    res.status(500).send('Undefined Server Error' + err);
  }

module.exports.serie400 = (err, req, res, data) => {
    if(req.get('Accept')){
        if(req.get('Accept') != 'application/json'){ 
            res.status(406).send('Only JSON data will be send, but you only accept '+ req.get('Accept'));
            return true
        }
    }

    if(req.get('Content-Type')){
        if((req.get('Content-Type') != 'application/json') && (req.get('Content-Type') != 'application/x-www-form-urlencoded')){
            res.status(400).send('Content Type ' + req.headers['content-type'] + ' will not be Accepted');
            return true;
        }
    }

    data = JSON.stringify(data);
    
    if(data == '[]'){
        res.status(404).send("Can not Find the Requested")
        return true;
    }
                
    else if(err){
        console.log(err);
        res.status(400).send("Request not Accepted" + err);
        return true;
    }

    return false;
}

module.exports.serie300 = (err, res) => {
    
}

module.exports.serie200 = (req, res, data) => {
    if(req.method == 'DELETE'){
        res.status(204).send("Data removed"); 
    }

    else if(req.method == 'POST' || req.method == 'PATCH' | req.method == 'PUT'){
        res.status(201).send(data); 
    }

    else{
        res.status(200).send(data);
    }
}

