module.exports.paginate = (start, limit, total, req) =>  {

    var host = req.headers.host;

    let pagination = {};
    pagination.totalItems = total;
    pagination.currentItems = currentItems(start, limit, total);
    pagination.totalPages = numberOfPages(start, limit, total);
    pagination.currentPage = currentPage(start, limit);

    pagination._links = {};
    pagination._links.first = {"href ": getFirstPageLink(start, limit, total, host)};
    pagination._links.last  = {"href ": getLastPageLink(start, limit, total, host)};
    pagination._links.next  = {"href ": getNextPageLink(start, limit, total, host)};

    pagination._links.previous  = {"href ": getPreviousPageLink(start, limit, total, host)};


    return pagination;
}


function currentItems(start, limit, total){
    if( (limit == 0) && (start == 0) ){
        return total;
    }

    else if((start + limit) < total){
        return limit;
    }
    
    else{
        return total-start;
    } 
}

function numberOfPages(start, limit, total){
    if( (limit == 0) && (start == 0) ){
        return 1;
    }

    else if( (limit == 0) && (start !=1) ){
        return 2;
    }

    else{
        let pages = total/limit;
        pages = Math.ceil(pages);
            /*
        if(start != 0){
            let pagesPast = start/limit;
        
            if(pagesPast => 1){
                pages-= Math.floor(pagesPast);
            }
        }*/

        return pages;
    }
}

function currentPage(start, limit){
    if(start == 0){
        return 1;
    }

    else if(limit == 0){
        return 2;
    }

    else{
        let page = (Math.ceil(start/limit)) + 1;
        return page;
    }
}

function getFirstPageLink(start, limit, total, host){
    if(numberOfPages(start, limit, total) == 1){
        return "";
    }
    else{
        let firstPage = 'http://' + host + '/characters/?start=' + 0 + '&limit=' + limit;
        return firstPage;
    }
}

function getLastPageLink(start, limit, total, host){
    if(numberOfPages(start, limit, total) == 1){
        return "";
    }
    else{
        if(limit !=0){
            start = total - limit;
        }

        let lastPage = 'http://' + host + '/characters/?start=' + start + '&limit=' + limit;
        return lastPage;
    }
}

function getNextPageLink(start, limit, total, host){
    if( (numberOfPages(start, limit, total) == 1) || ((start + limit) > total)){
        return "";
    }
    else{
        let nextPage = 'http://' + host + '/characters/?start=' + (start+limit) + '&limit=' + limit;
        return nextPage;
    }
}

function getPreviousPageLink(start, limit, total, host){
    if( (numberOfPages(start, limit, total) == 1) || (start < limit)){
        return "";
    }
    else{
        let previousPage = 'http://' + host + '/characters/?start=' + (start-limit) + '&limit=' + limit;
        return previousPage;
    }
}