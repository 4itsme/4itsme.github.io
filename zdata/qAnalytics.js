var qAnalytics = (function(){
	var publicApi = {};

	
	function _getWordsScores(S){ //external depends: V, qRootLemDict
		var data = {  
			words:
			(
				_.map(_.range(1, S.length - 1), function(index){
					return V.init(S[index]) || _.map(V.parse(S[index]), 0);
				})
			)

			,scores:
			(
				_.map(_.range(1, S.length - 1), function(index){
					var o = V.init(S[ index ]) || V.parseEx( S[ index ] ),
						queries = _.map(o, function(i){ return {lem: i.lem, root: i.root}; });

					return _.map(queries, function(i){
						return qRootLemDict.lookup(i).score; //.verbScore;
					});
				})
			)		
		};
		return data;
	}


	function _getScoredWords( oWordsScores ){
		//print the scored words to console
		var data2 = 
			_.chain(oWordsScores.words)
			 .map(function(verse, i){
				return _.map(verse, function(word, j){
					return oWordsScores.scores[i][j] != 0 ? word +' '+ oWordsScores.scores[i][j] : '-';
				});
			  })
			  //.tap( alert ) 
			  .tap(function( obj ){console.log(JSON.stringify( obj )); })
			  .value();
			  
			// sort and show the words in order of score.
			_.chain( data2 )
			 .flatten()
			 .reject(function(s){ return s === '-'; })
			 .sortBy(function(s){ if(s){ return -1 * parseInt( s.split(' ')[1] ); } } )
			 .value();
		 return data2;
	}

 
 	function analyze( S ){//expects a S (Sura) object
		var oWordsScores, oScoredWords;
		oWordsScores = _getWordsScores(S);
		oScoredWords = _getScoredWords( oWordsScores );
		return oScoredWords;
	}
	
	function test(){
		var o = qAnalytics.analyze( S ); //qAnalytics.getWordsScores( S );
		return 
		_.chain( o )
		 .tap( function(x){ console.log( JSON.stringify( x ) ); } )
		 .value();
	}
	
	publicApi = {
		analyze: analyze,
		getWordsScores: _getWordsScores,
		getScoredWords: _getScoredWords,
		test: test
	};
	return publicApi;

})();


