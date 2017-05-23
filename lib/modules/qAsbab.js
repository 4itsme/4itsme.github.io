define(['Q'], function(Q){
//var qAsbab = (function(){
	var publicApi = {};

	var url = "./zdata/asbabNuzulDataRaw.txt",
		asbabData,
		asbabRawData,
		asbabDataKeys,
		_REGEX_REFSMAP_STRING_SEARCH_PATTERN = ' $SURA\:$AYAH(?:\-\\d+)? ',
		_REGEX_RAWFILE_SEARCH_REFS = /^\[\d+\:\d+(?:\-\d*)?\]$/gm;
		

	var _asbabNuzulRefsData = ' 1:1-7 2:1-2 2:6 2:14 2:21 2:26 2:44 2:45 2:62 2:75 2:79 2:80 2:89 2:97 2:98 2:99 2:102 2:104 2:105 2:106 2:108 2:109 2:113 2:114 2:115 2:116 2:119 2:120 2:121 2:133 2:135 2:138 2:142 2:143 2:144 2:146 2:154 2:158 2:159 2:164 2:168 2:174 2:177 2:178 2:187 2:188 2:189 2:190 2:194 2:195 2:196 2:197 2:198 2:199 2:200 2:204 2:207 2:208 2:214 2:215 2:217 2:219 2:220 2:221 2:222 2:223 2:224 2:226 2:229 2:232 2:234 2:256 2:260 2:262 2:267 2:271 2:272 2:274 2:278 2:280 2:285 3:12 3:18 3:23 3:26 3:28 3:31 3:59 3:61 3:68 3:69 3:72 3:77 3:79 3:83 3:86 3:90 3:93 3:96 3:100 3:101 3:110 3:111 3:113 3:118 3:121 3:128 3:135 3:139 3:140 3:144 3:151 3:152 3:161 3:165 3:169 3:172 3:173 3:179 3:180 3:181 3:183 3:186 3:188 3:190 3:195 3:196 3:199 3:200 4:2 4:3 4:6 4:7 4:10 4:11 4:19 4:22 4:24 4:32 4:33 4:34 4:37 4:43 4:49 4:51 4:52 4:58 4:59 4:60 4:65 4:69 4:77 4:78 4:88 4:92 4:93 4:94 4:95 4:97 4:100 4:102 4:116 4:123 4:125 4:127 4:128 4:135 4:136 4:148 4:153 4:166 4:171 4:172 4:176 5:2 5:3 5:4 5:11 5:33 5:38 5:41-47 5:49 5:51 5:55 5:57 5:58 5:59 5:67 5:82-86 5:87 5:90 5:93 5:100 5:101 5:105 5:106 6:7 6:13 6:19 6:25 6:26 6:33 6:52 6:54 6:57 6:91 6:93 6:100 6:108 6:109-111 6:121 6:122 7:31 7:175 7:187 7:188 7:189-191 7:204 8:1 8:17 8:19 8:27 8:32-33 8:35 8:36 8:64 8:67-69 8:70 9:12 9:17 9:19 9:23-24 9:34 9:38 9:41 9:42-47 9:49 9:58 9:61-62 9:64 9:65 9:74 9:75 9:79 9:84 9:92 9:97 9:101 9:102-103 9:106 9:107-108 9:111 9:113-114 9:122 10:2 10:15 11:5 11:114 12:3 13:13 13:30 13:31 13:38 15:24 15:47 15:49 15:87 16:1 16:4 16:38 16:41 16:43 16:75-76 16:90 16:101-102 16:103 16:106 16:110 16:125-127 17:29 17:53 17:59 17:60 17:73 17:76 17:80 17:85 17:90 17:110 18:28 18:83 18:90 18:109 18:110 19:64 19:66 19:77 20:1-2 20:131 21:101 22:11 22:19 22:39 22:52 23:1 23:2 23:14 23:76 24:3 24:6 24:11 24:16 24:27-29 24:33 24:48 24:55 24:58 24:61 25:10 25:27 25:68-70 28:56 28:57 28:61 28:68 29:1-2 29:8 29:10 29:60 30:1-3 31:6 31:15 31:27 31:34 32:16 32:18 33:1 33:4 33:23 33:33 33:35 33:43 33:51 33:53 33:56 33:58 36:12 36:78 38:5-11 39:9 39:17 39:22 39:23 39:53 39:67 41:22 41:30 42:23 42:27 42:51 43:57 44:49 45:14 46:9 46:15 48:1 48:5 48:24 49:1 49:2 49:3 49:4 49:6-8 49:9 49:11 49:13 49:14 50:38 53:32 53:33-34 53:43 54:1 54:47-49 56:13-14 56:28 56:39-40 56:82 57:10 57:16 58:1 58:2 58:8 58:11 58:12-13 58:14-18 58:22 58:22 59:1-6 59:9 60:1 60:6-8 60:10 60:13 61:1-4 62:11 63:7 64:14 65:1 65:3 65:4 66:1 66:4 67:13 68:4 68:51 69:12 70:1 70:38-39 74:1-4 74:11-24 75:3 76:8 80:1-2 80:37 81:29 83:1 86:1-3 92:5-6 93:1-3 93:4-5 93:6 96:17-19 97:1-3 99:7-8 100:1-11 102:1-2 105:1-5 106:1-4 107:1-2 108:1-3 109:1-6 110:1-3 111:1-5 112:1-4 113:1-5 114:1-6 ';
	
	var setData = function(data){ //for syns, passed in data is: {synonyms: synonyms, synonymsTopicsAyahsMap: synonymsTopicsAyahsMap, synonymsdetails: synonymsdetails,});
		asbabRawData = data;
		processRawData();
	}
	
	function processRawData(){
		if(!asbabRawData){ throw new Error('asbabRawData is null! cant proceed'); }
		var r = '^\[[0-9]*\:[0-9]*-?[0-9]*?\]$',
			r = new RegExp( r, 'gm'),
			text = asbabRawData,
			result,
			results = [];
		while (result = r.exec(text)) {
			results.push( result );
		}
		asbabData = results;
		asbabDataKeys = _.map(results, '0');
	}

	//find all asbab for this surah
	var findAsbabForSura = function(surah){
		var regexp, ret, refsData;
		regexp = new RegExp(" " + surah + "\:[0-9]*-?[0-9]*[^ ]", 'g');
		refsData = _asbabNuzulRefsData;
		ret = refsData.match( regexp );
		//ret = ret.join('') + '';
		return ret;	
	}
	
	var checkExistsAsbabForAyah = function(sura, ayah){
		return RegExp(	_REGEX_REFSMAP_STRING_SEARCH_PATTERN
						.replace('$SURA', sura)
						.replace('$AYAH', ayah ) 
					).test(_asbabNuzulRefsData);
	}
	
	var lookupAsbabKeyForAyah = function(sura, ayah){
		var tmp = _.first( _asbabNuzulRefsData.match(RegExp(	_REGEX_REFSMAP_STRING_SEARCH_PATTERN
						.replace('$SURA', sura)
						.replace('$AYAH', ayah ) 
					))
				); //returns undefined if no hits.
		return (tmp || '').replace(/^ /, '[').replace(/ $/, ']');
	}
	
	var findAsbabForPage = function(pageno){
		var ayahsList = Q.ayah.listFromPage( pageno );
		var temp =  _.chain( ayahsList )
					 .filter( function(o){ 
						return checkExistsAsbabForAyah(o.surah, o.ayah);
					  })
					 .map( function(o){
						 return o.surah +':'+ o.ayah;
					  })
					 .value();
		return ' '+ temp.join(' ') + ' ';
	}

	
	var findAsbabForPageAsync = function(page){
		var promise = new Promise( function(resolve, reject){
			window.setTimeout(function(){
				var results = findAsbabForPage(page);
				resolve( results );
			}, 0);
		});
		return promise;
	}
	
	
	var getAsbabNuzul = function(sura, ayah){
		var asbabRef = lookupAsbabKeyForAyah(sura, ayah);
		var responseObj = {ref: asbabRef, raw: null};
		if(!asbabData || !asbabRawData){
			$.get(url, function(data){
				asbabRawData = data;
				processRawData();
				//TODO: handle this later.. the first call needs to be handled either thru init, or by returning a promise?
				//return; ///TODO: debugger;///showAsbabNuzul( asbabRef );
			});
		}else{
			var i = _.indexOf(asbabDataKeys, asbabRef),
				response;
			if(i != -1 && i < asbabData.length){
				//Bug fix: the refactored code line below is coz the last asbab wasnt showing up. 
				var endIndex = (i + 1 >= asbabData.length) ? (asbabRawData.length-1) : asbabData[ 1 + i ].index;
				response = asbabRawData.substring( asbabData[i].index, endIndex );
			}else{
				console.log('no asbab found for ' + asbabRef + 'in asbabDataKeys'); debugger;
			}
			responseObj.raw = response; //returns null if no match found
		}
		return responseObj;
	}

	var getAsbabNuzulPrettified = function(sura, ayah){
		var responseObj = getAsbabNuzul(sura, ayah);
		if(responseObj.raw){
			//first add Surah name at top of entry
			var ref = responseObj.ref,
				refPlain = ref.replace(/^\[/, '').replace(/\]$/, ''),
				suraNo = parseInt( refPlain.split(':')[0] ) || -1,
				suraDetail = Q.surah.detail( suraNo ) || {},
				compiled = _.template('Sura: <%= suraNo %>. <%=  english_name %> <%=  arabic_name %> <%= english_meaning %> (<%= type %>)<HR><BR>'),
				suraHeader = compiled( _.extend( suraDetail, {suraNo: suraNo}) ),
				rawSemiFormatted = responseObj.raw.replace( /^\d+$/gm, '<!--$0 -->' ); //replace any lines with just page nos like 3 in asbab for 2:98 pg 15 with it commented out.


			if(suraHeader){
				responseObj.pretty = suraHeader + rawSemiFormatted; //responseObj.raw;
			}

		}
		return responseObj;
	}
	
	var test = function(){
		debugger;
		console.log([
			qAsbab.get(2, 6),
			qAsbab.findForSura( 2 ),
			qAsbab.findForPage( 10 ),
			//qAsbab.get('[2:62]')
		]);
	}
	
	publicApi = {
		find:		 findAsbabForSura,
		findForSura: findAsbabForSura,
		findForPage: findAsbabForPage,
		findForPageAsync: findAsbabForPageAsync,
		checkExistsAsbabForAyah: checkExistsAsbabForAyah,
		lookupAsbabKeyForAyah: lookupAsbabKeyForAyah,
		get:		 getAsbabNuzulPrettified,
		getAsbabNuzul: 	getAsbabNuzul,
		getAsbabNuzulPrettified: getAsbabNuzulPrettified,
		setData:	 setData,
		test: test,
		
		//comment below ones after API stable
		data: _asbabNuzulRefsData, //comment this out once API stable. provides raw data access.
		asbabData: asbabData,
		asbabRawData: asbabRawData,
		asbabDataKeys: asbabDataKeys,
	}
	return publicApi;
//})();

});