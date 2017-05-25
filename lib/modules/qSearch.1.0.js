define(['underscore', 'qUtil', 'Q'], function(_, qUtil, Q){
//var qSearch = (function(){
	var publicApi = {};	
	var repo = {
		BUCK: {raw: null, final: null, arr: []},
		BARE: {raw: null, final: null, arr: []},
		TRANS: {raw: null, final: null, arr: []},
		TRANSLIT: {raw: null, final: null, arr: []},
		CORPUS: {raw: null, final: null, arr: []},
	}
	var isInited = false;
	
	function lookup(verseNo, key){ //debugger;
		init();
		var result;
		if(key){
			switch(key){
				case 'BUCK': 
					result = !repo.BUCK.final ? null : repo.BUCK.arr[ +verseNo - 1];
					break;
				case 'BARE':
					result = !repo.BARE.final ? null : repo.BARE.arr[ +verseNo - 1];
					break;
				case 'TRANS':
					result = !repo.TRANS.final ? null : repo.TRANS.arr[ +verseNo - 1];
					break;
				case 'TRANSLIT':
					result = !repo.TRANSLIT.final ? null : repo.TRANSLIT.arr[ +verseNo - 1];
					break;
				case 'CORPUS':
					result = !repo.CORPUS.final ? null : repo.CORPUS.arr[ +verseNo - 1 + 1];
					break;
				default:
					break;
				
			}
		}else{
			result = {
				BUCK: lookup(verseNo, 'BUCK'),
				BARE: lookup(verseNo, 'BARE'),
				TRANS: lookup(verseNo, 'TRANS'),
				TRANSLIT: lookup(verseNo, 'TRANSLIT'),
				CORPUS: lookup(verseNo, 'CORPUS'),
			}
		}
		return result;
	}


	function initData(qBuck, qTrans, qTransLit){
		var iArguments = arguments;
		if(isInited){ return; }
		var filesKey = [
			 'BUCK'
			,'TRANS'
			,'TRANSLIT'
		];
		
		_.each(filesKey, function(key, index){
			if(!repo[ key ].final && (repo[ key ].raw = iArguments[ index ]) ){
				 repo[ key ].final = prepareData(key, repo[key].raw );
			}
		});
		///initCorpus(serverPath, dataPath);
		isInited = true;
	}

	
	function init(serverPath, dataPath){
		if(isInited){ return; }
		var filesKey = [
			 'BUCK'
			,'TRANS'
			,'TRANSLIT'
		];
		
		_.each(filesKey, function(key, index){
			if(!repo[ key ].final && (repo[ key ].raw = getData( key )) && getData( key ).length){
				 repo[ key ].final = prepareData(key, repo[key].raw );
			}
		});
		///initCorpus(serverPath, dataPath);
		isInited = true;
	}
	
	function initCorpus(serverPath, dataPath){
		window.gq = window.gq || {cookdata: function(){} };
		var _serverPath = serverPath ? serverPath : 'http://localhost:8080/',
			_dataPath = dataPath ? dataPath : 'data/',
			scripts = ['manzil1,7.js', 'manzil5,6.js', 'manzil2,3,4.js'];
		$getMultiScripts(scripts, _serverPath + _dataPath).done(function() {
			// all scripts loaded
			console.log( 'all Corpus scripts downloaded' );
			
			window.gq.Q = gq.MANZIL1.concat( 
				gq.MANZIL234.slice(1),
				gq.MANZIL56.slice(1),
				gq.MANZIL7.slice(1)
			)

			repo.CORPUS.final = 1;
			repo.CORPUS.arr = window.gq.Q;
			
			/*_.each([gq.MANZIL1, gq.MANZIL234, gq.MANZIL56, gq.MANZIL7, gq.Q], function(m){
				console.log( [ m[0], m.length], +m[0] + m.length - 1 );
			});*/
		});

		//$.getScript('http://localhost:8080/zdata/manzil1,7.js');
		//$.getScript('http://localhost:8080/zdata/manzil5,6.js');
		//$.getScript('http://localhost:8080/zdata/manzil2,3,4.js');
		//TODO: wrap above in a promise... getAll
	}
	
	var $getMultiScripts = function(arr, path) {
			var _arr = $.map(arr, function(scr) {
				return $.getScript( (path||"") + scr );
			});

			_arr.push($.Deferred(function( deferred ){
				$( deferred.resolve );
			}));

			return $.when.apply($, _arr);
	}
	
	
	//external data dependencies: qBuck
	//external function dependencies: qUtil.BuckToBare, qUtil.escapeForRegex
	
	//var keyword1 = 'min', keyword2 = 'mino', keyword3 = 'heaven';
	
	///////////////////////////////////////////////////////////////////
	var //results = {}, qBare, qBareArr, 
		_log = console.log,
		BuckToBare = qUtil.BuckToBare,
		escapeForRegex = qUtil.escapeForRegex;
	
	var _prefixData = function(DATA){           //profile('PREFIX-start');
	  if(!DATA) return;
	   var ARRAY = DATA.split('\n'), SEP='|'; //TODO: split using a regex, to account for /r/n
	   for(var n=0; n<ARRAY.length; ++n){
		 var o = Q.ayah.fromVerse(n + 1);
		 ARRAY[n] = o.surah +'|'+ o.ayah + '|' + ARRAY[n];
	   } /*console.log( ARRAY );*/              //profile('PREFIX-end');
	   return ARRAY.join('\n');
	};

	var handleError = function(e, msg){
		console.log([e, msg]);
		debugger;
		return msg;
	}
	
	function search(keyword){
		var qBuck, qBare,
			keyword1, keyword2, keyword3, results = {},
			minKeywordLength = 3;
		if(!keyword){ return; }
		
		qBuck = repo.BUCK.final || ( repo.BUCK.final = prepareData( 'BUCK', getData('BUCK') ) );
		if(!qBuck){ return; }
		
		qBare = repo.BARE.final || ( repo.BARE.final = BuckToBare( repo.BUCK.final) );
		
		keyword1 = keyword2 = keyword3 = keyword;
		//TODO: check if keyword is arabic and if so convert to Buck
		//keyword2 shud have buck in the end.
		
		keyword1 = BuckToBare(keyword2);
		results.keyword = keyword;
		results.results = [];
		results.matchesCount = 0;
		
		if(keyword1.length >= minKeywordLength){
			title='Arabic';
			regexp = new RegExp(".*(?:" + escapeForRegex(word=keyword1) + ").*", "g");
			var hits = search2(word, regexp, qBare);
			if(hits && hits.length > 0){
				results.results.push({ category: title, keyword: qUtil.EnToAr(word), keywordEn: word, matches: hits, }); results.matchesCount += hits.length;
			} 
		}

		if(keyword3.length >= minKeywordLength){
			title='Translation';
			regexp = new RegExp(".*(?:" + escapeForRegex(word=keyword3) + ").*", "gi");
			var hits = searchTrans(word, regexp);
			if(hits && hits.length > 0){
				results.results.push({ category: title, keyword: word, matches: hits }); results.matchesCount += hits.length;
			} 
		}

		if(keyword2.length >= minKeywordLength){
			title = 'arabicBuckTranslit';
			regexp = new RegExp(".*(?:" + escapeForRegex(word=keyword2) + ").*", "g");
			var hits = search2(word, regexp, qBuck);
			if(hits && hits.length > 0){
				results.results.push({ category: 'Arabic with tashkeel', keyword: qUtil.EnToAr(word), keywordEn: word, matches: hits }); results.matchesCount += hits.length;
			} 
		}

		if(keyword3.length >= minKeywordLength){
			title='Transliteration';
			regexp = new RegExp(".*(?:" + escapeForRegex(word=keyword3) + ").*", "gi");
			var hits = searchTransLit(word, regexp);
			if(hits && hits.length > 0){
				results.results.push({ category: title, keyword: word, matches: hits }); results.matchesCount += hits.length;
			} 
		}

		//TODO: if(keyword1.indexOf(' ')!=-1){ } //has spaces - break them apart and search.
		return results;
	}	
	
	function searchAsync(keyword){//debugger;
		var promise = new Promise( function(resolve, reject){
			window.setTimeout(function(){
				var results = search(keyword);
				resolve( results );
			}, 0);
		});
		return promise;
	}
	///////////////////////////////////////////////////////////////////

	
	

	//DEPENDENCIES: qBuck, qTrans, qTransLit, BuckToBare(), _prefixData
	///////////////////////////////////////////////////////////////////
	var _bPROFILE_SEARCH = false;
	var qBare2, qBuck2, RESET=false;
	var search2 = function(word, regexp, DATA){ var results;
	  var qBuck, qBare;
	  qBuck = repo.BUCK.final || ( repo.BUCK.final = prepareData('BUCK', getData('BUCK') ) );
	  if(!qBuck){ return; }		
	  qBare = repo.BARE.final || ( repo.BARE.final = BuckToBare( repo.BUCK.final) );		
	  //if(qBare == null)		qBare = BuckToBare(qBuck);
	  //if(qBareArr == null)	qBareArr = qBare.split(/\r?\n/);
	  //if(!qBare2 || RESET){ qBare2 = _prefixData( qBare ); RESET=false;}
	  //if(!qBuck2 || RESET){ qBuck2 = _prefixData( qBuck ); RESET=false;}
	  if(DATA == qBuck) results = qBuck.match(regexp);
	  else if(DATA == qBare) results = qBare.match(regexp);
	  if(!results){if(_bPROFILE_SEARCH) _log('no hits');}else{ if(_bPROFILE_SEARCH) _log(results.length + ' hits');}
	  return results;
	}

	var searchTrans = function(word, regexp){ var results;
	  var qTrans = repo.TRANS.final || (repo.TRANS.final = prepareData( 'TRANS', getData('TRANS') ) );
	  if(typeof(qTrans) === 'undefined' || !qTrans){ console.log('Search: skipping translation - unavailable'); return;}
	  results = qTrans.match(regexp);
	  if(!results){if(_bPROFILE_SEARCH) _log('no hits'); }else{ if(_bPROFILE_SEARCH) _log(results.length + ' hits') };
	  return results;
	}

	var searchTransLit = function(word, regexp){ var results;
	  var qTransLit = repo.TRANSLIT.final || (repo.TRANSLIT.final = prepareData( 'TRANSLIT', getData('TRANSLIT') ) );
	  if(typeof(qTransLit) === 'undefined' || !qTransLit){ console.log('Search: skipping transliteration - unavailable'); return;}
	  results = qTransLit.match(regexp);
	  if(!results){if(_bPROFILE_SEARCH) _log('no hits');}else{ if(_bPROFILE_SEARCH) _log(results.length + ' hits') };
	  return results;
	}
	///////////////////////////////////////////////////////////////////
		
	
	
	//
	// DEPENDENCIES: depends on jQuery $ object or similar's .html().text() API.
	//
	function prepareData(key, data){
		var response = data;
		switch(key){
			case 'TRANS':
			repo[key].arr = data.split('\n'); //strip out the ayah prefixes
			break;
			
			case 'TRANSLIT':
			response = $('<div />').html( data ).text(); //strip out html tags from the transliteration
			repo[key].arr = data.split('\n'); //strip out the ayah prefixes
			break;

			case 'BUCK':
			response = _prefixData(data);
			repo[key].arr = data.split('\n');
			repo.BARE.raw = BuckToBare( repo.BUCK.raw );
			repo.BARE.final = BuckToBare( repo.BUCK.final );
			repo.BARE.arr = repo.BARE.raw.split('\n');
			break;
			
			default:
			break;
		}
		return response;
	}
	
	////////////////////////////////////////////////////////////////////////////
	//Global Data Loads
	var oBuck, oTrans, dataType, dontcache, oTransLit, NULL;
	
	var initOld = function(){
		var key="BUCK", url = 'data/qBuck.txt';
		var success = function(data, textStatus, jqXHR){	qBuck = data; data = null; }
		var error = function(jqXHR, textStatus, errorThrown){ console.log('Search: ERROR: unable to load ' + url); }
		if(oBuck == null)
			oBuck = getData(key, url, success, error);


		var key="TRANS", url = 'data/TANZIL.en.sahih.txt', url2 = 'data/TANZIL.en.transliteration.txt', url3 = 'data/TANZIL.ur.maududi.txt';
		var success= function(data, textStatus, jqXHR){	qTrans = data; data = null; qTransArr = qTrans.split(/\r?\n/); },
			error= function(jqXHR, textStatus, errorThrown){ console.log('Search: ERROR: unable to load ' + url); }
		if(oTrans == null)
			oTrans = getData(key, url, success, error);
		///onTranslitInit();


		var key = "TRANSLIT", url = 'data/TANZIL.en.transliteration.txt';
		var success= function(data, textStatus, jqXHR){	
				qTransLit = $('<div />').html( data ).text(); //strip out html tags from the transliteration
				qTransLitArr = data.split(/\r?\n/); data=null; delete data; }, //temporarily we overwrite the trans data

			error= function(jqXHR, textStatus, errorThrown){ console.log('Search: ERROR: unable to load ' + url); }
		if(!oTransLit)
			var oTransLit = getData(key, url, success, error, dataType, dontcache);
	}
	

	function getData(key, url, fn, errorFn, dataType, dontcache) {
		var value = localStorage.getItem(key);
		fn = fn || function(data){ console.log(data ? {length: data.length, snippet: data.substring(0, 101) } : '-NULL-'); return data; }; //if a fn isnt passed in, just display the data to console.
		//if (value != null) {
		return fn(value);
		/*} else {
			$.ajax({
				type: "get",
				url: url,
	//			dataType: dataType,
				cache: true,
				success: function (data, textStatus, jqXHR) {
					if(typeof(dontcache) == NULL || !dontcache) setData(key, data);
					fn(data, textStatus, jqXHR);
				},
				error: function(jqXHR, textStatus, errorThrown){
					errorFn(jqXHR, textStatus, errorThrown);
				}
			});
		}*/
	}

	function setData(key, value) {
		try {
			localStorage.setItem(key, value);
			repo[key] = repo[key] || {};
			repo[key].raw = value;
		} catch (e) { debugger; //var msg = handleError(e, 'Local storage exceeded. Flushing old contents to make space.');
			//if (e == QUOTA_EXCEEDED_ERR) 
			{
				localStorage.clear();
				try {
					localStorage.setItem(key, value);
				} catch (e) {
					debugger; //msg = handleError(e, 'ERROR when flushing out Local storage contents. See console for more info.'); alert(msg);
				}
			}
		}
	}
	
	function test(keyword){ debugger;
		var results = [];
		if(keyword){
			results.push( qSearch.search(keyword) );
		}else{
			results.push( _.clone( qSearch.search('dawood') ) ); // 1 hits	 	no hits	 no hits	 16 hits
			results.push( _.clone( qSearch.search('dukhan') ) ); // no hits	no hits	 no hits	 2 hits
			results.push( _.clone( qSearch.search('beard')  ) );  // 57 hits	1 hits	 1 hits	 	 no hits
		}
		return results;
	}
	////////////////////////////////////////////////////////////////////////////

	publicApi ={
		search: search,
		searchAsync: searchAsync,
		lookup: lookup,
		help: function(){ console.log( test ); },
		init: init, //loads data up the usual way
		initData: initData,
		initCorpus: initCorpus,
		test: test,
		
		//comment below out once API is stable
		getData: getData,
		setData: setData,
		repo: repo,
		// oBuck: oBuck,
		// oTrans: oTrans,
		// oTransLit: oTransLit,
	};
	
	return publicApi;
//})();
});

//qSearch.search();