define([], function(){
//var qRoot = (function(){
	var publicApi = {};

	function query( s ){
        var re = /[wAy]/g, 
            scoreWeights = [10, 20, 30],//of faa-ayn-laam positions
            names = ['mithal', 'ajwaf', 'naqis'],
            m, res = [];
        while (m = re.exec(s)) {
            res.push({ l: m['0'], index: m.index }); 
        }
        result = {
			root: s,
            name: res.length > 0 ? names[ _.last(res).index ] : null,
            score: _.reduce(_.map(res, function(a){ return scoreWeights[ a.index ]; }, 0), function(a,b){return a+b;}, 0),
            matches: res
        };
        return result;
    }

	function test(){
		return JSON.stringify( result = qRoot.query('AAm', '$rr', 'rmy', 'wqy') ); 		
	}
	
	
	publicApi = {
		query: query,
		test: test
    };
	return publicApi;
//})();

});