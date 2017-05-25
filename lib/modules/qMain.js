define([  'jquery'
		, 'Q', 'qUtil'
		//, 'qAsbab', 'qCorpus', 'qRoot'
		//, 'qRootLemDict', 'qRootMeanings'
		, 'qSearch'//, 'qSynonyms'
		, 'qBuck', 'qTrans', 'qTranslit'
//		, 'asbabDATA', 'synonymsDATA'
	], function( $
		, Q, qUtil
		//, qAsbab, qCorpus, qRoot
		//, qRootLemDict, qRootMeanings
		, qSearch//, qSynonyms
		, qBuck, qTrans, qTranslit
//		, asbabDATA, synonymsDATA
		){
//var qMain = (function(){
	var publicApi = {},
		_serverPath = '', //like http://localhost:8080
		_dataPath   = '/data/', //like zdata	

		files = [
		//	 'qBuckFull.txt'
		//	,'TANZIL.en.sahih.txt'
		//	,'TANZIL.en.transliteration.txt'
		//	,'synonymsDATA.js'
		//	,'asbabDATA.js'
			//,'qBuck.txt'
		],
		
		filesKey = [
		//	 'BUCK'
		//	,'TRANS'
		//	,'TRANSLIT'
		//	,'SYNONYMS'
		//	,'ASBAB'
			//,'BUCK'
		],

		filesFns = [
			function(key, data){ qSearch.setData(key, data); },
			function(key, data){ qSearch.setData(key, data); },
			function(key, data){ qSearch.setData(key, data); },
			function(key, data){ qSynonyms.setData(data); /* Intentionally not caching */ },
			function(key, data){ qSearch.setData(key, data); qAsbab.setData(data); },
		],
		
		scripts = [/*
			 'qUtil.js'
			,'Q.js'
			//,'qS.js'
			//,'qV.0.2.js'
			,'qRoot.js'
			,'qSearch.1.0.js'
			,'qRootLemDict.js'
			,'qRootMeanings.js'
			,'qCorpus.0.4.js'
			//,'qAnalytics.js'
			,'qAsbab.js'
			,'qSynonyms.js'*/
		],


		//Initial approach
		//_.each(scripts, function(s){ $.getScript('zdata/' + s, function(content, responseCode){ console.log('Received: ' + s); }); /*console.log('Requested: ' + s);*/ });

		
		//better approach: see https://stackoverflow.com/questions/11803215/how-to-include-multiple-js-files-using-jquery-getscript-method
		// $.when(
			// $.getScript( "/zdata/Q.js" ),
			// $.getScript( "/zdata/qS.js" ),
			// $.getScript( "/zdata/qUtil.js" ),
			// $.Deferred(function( deferred ){
				// $( deferred.resolve );
			// })
		// ).done(function(){
			// console.log( 'all scripts downloaded' );
			// //place your code here, the scripts are all loaded
			// vm.go();
		// });

		
		//even better approach
		$getMultiScripts = function(arr, path) {
			var _arr = $.map(arr, function(scr) {
				return $.getScript( (path||"") + scr );
			});

			_arr.push($.Deferred(function( deferred ){
				$( deferred.resolve );
			}));

			return $.when.apply($, _arr);
		},
		
		
		init = function(serverPath, dataPath){
			_serverPath = serverPath;
			if(dataPath){ _dataPath = dataPath; }
			if(typeof(qSearch) !== 'undefined' && qSearch){
				//qSearch.init(_serverPath, _dataPath);
				qSearch.initData(qBuck, qTrans, qTranslit);
			}
		},
		
		
		go = function(fnCallbackWhenAllDone){
			$getMultiScripts(scripts, _serverPath + _dataPath).done(function() {
				// all scripts loaded
				console.log( 'all scripts downloaded' );
				qSearch.init(_serverPath, _dataPath);
				///vm.go();
				
				/*if(!_serverPath || _serverPath === ''){
					_.each(files, function(f){
						var cb = function(data){
							console.log(f + ' ' + data.length);
							window.f = data; 
						}
						var eh = function(arg){ debugger; }
						$.get(_serverPath + _dataPath + f, cb, eh);
					});
				}else*/
				{
					//use alt approach: load the data files as scripts.
					var dataScripts = [];
					_.each(_.range(0, files.length), function(i){
						if(qSearch.getData( filesKey[i] ) && qSearch.getData( filesKey[i] ).length){
							if('ASBAB' === filesKey[i]){ qAsbab.setData( qSearch.getData( filesKey[i] ) ); }
							return; //if already cached in localstorage, dont redownload
						}
						dataScripts.push( files[i].replace(/\.txt/g, '.js') );
						///debugger;
						window[ 'fnJsonCallback' + filesKey[i] ] = function(data){ 
								console.log('data script loaded: ' + filesKey[i] +' ' /*+ files[i]*/ +' bytes: '+ data.length);
								//qSearch.setData(filesKey[i], data);
								if(filesFns[i]){
									filesFns[i](filesKey[i], data);
								}else{console.log( ['null filesFn', i, filesFns[i] ] );}
							};
					});
					$getMultiScripts(dataScripts, _serverPath + _dataPath).done(function(){
						console.log( 'all data scripts downloaded' );
						if(fnCallbackWhenAllDone && typeof(fnCallbackWhenAllDone) === 'function'){
							fnCallbackWhenAllDone();
						}
					});
				}
			});


			$(document).ready(function(){
				console.log('document ready');
			});
			
			/*_.each(scripts, function(s){ $.getScript(_serverPath + _dataPath + '/' + s); console.log('Loaded: ' + s); });

			_.each(files, function(f){
				var cb = function(data){
					debugger;
					console.log(f + ' ' + data.length);
					window.f = data; 
				}
				var eh = function(arg){ debugger; }
				$.get(_serverPath + _dataPath + '/' + f, cb, eh);
			});*/
		}
	;

	publicApi = {
		init: init,
		go: go
	};
	return publicApi;
//})();
});


// main usage:
//qMain.go();

// alternate usage:
/*
$.getScript('http://localhost:8080/zdata/Main.js')
 .then(function(){
	qMain.init('http://localhost:8080/');
	qMain.go()
 });
 */