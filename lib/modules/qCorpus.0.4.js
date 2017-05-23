define([], function(){
//var qCorpus = (function(){
	var publicApi = {},
	
	_c = null,
	_cParsed = null,
	ayahSeparator = '★',
	wordSeparator = '⚓',
	_INDICES = {buck: 0, en: 1, corpus: 2},
		
	FEATURES_MAPPING = {'GEN': 'Genitive case.', 'ACC': 'Accusative case.', 'NOM': 'Nominative case.', 'INDEF': 'Indefinte.', 
					'3MS': '3rd person Masculine Singular.', '3MP': '3rd person Masculine Plural.', 
					'2MP': '2nd person Masculine Plural.', '2MS': '2nd person Masculine Singular.',
					'M': 'Masculine.', 'F': 'Feminine.', 'S': 'Singular.', 'P': 'Plural.',
					'SP:kaAn': 'belongs to a special group of words known as <BR/>kāna and her sisters (كان واخواتها). <BR/>', 
					'SP:<in~': 'belongs to a special group of words known as <BR/>inna and her sisters (ان واخواتها). <BR/>',
					'SP:kaAd': 'belongs to a special group of words known as <BR/>kāda and her sisters (كاد واخواتها). <BR/>', 
					'MP': 'Masculine Plural', '1P': '1st person Plural', 
					'2MS': '2nd person Masculine Singular', '3FS': '3rd person Feminine Singular', 'MS': 'Masculine singular', 
					'FP': 'Feminine plural', 'FS': 'Feminine Singular', '1S': '1st person Singular', 
					'MD': 'Masculine Dual', 'FD': 'Feminine Dual', '3D': '3rd person Dual', '3FD': '', 
					'MOOD:JUS': 'Jussive mood.', 'MOOD:SUBJ': 'Subjunctive mood.'},
	
	TENSE_MAPPING = {"IMPV": "Imperative", "IMPF": "Imperfect", "PERF": "Perfect"},
					//{"IMPV": "Imperative (commanding etc tense)", "IMPF": "Imperfect (present, future tense)", "PERF": "Perfect (past tense)"},
					
	ACTIVEPASSIVEPCPL_MAPPING = {"PASS|PCPL": "Passive participle", "ACT|PCPL": "Active participle"},
	
	POS_MAPPING = { "N": "NOUN", "V": "VERB", 'PN': 'Proper Name', 'ADJ': 'Adjective', 'REL': 'Relative pronoun', 
						'PRON': 'Pronoun', 'CONJ': 'Conjunction', 'NEG': 'Negative particle', 'P': 'Preposition',
						'INL': 'Quranic initials', 'DEM': 'Demonstrative pronoun', 'ACC': 'accusative particle',
						'RES': 'restriction particle', 'T': 'time adverb', 'PRO': 'prohibition particle', 'PREV': 'preventive particle',
						'INC': 'inceptive particle', 'AMD': 'amendment particle', 'SUB': 'subordinating conjunction', 'LOC': 'Location adverb', 'COND': 'conditional particle'
					},
		//REM: prefixed resumption particle
		//EQ: prefixed equalization particle
		//INTG: prefixed interrogative alif
		//EMPH: emphatic prefix lām
		//VOC: prefixed vocative particle ya
					
	lookupPOS = function(pos){
		if( CORPUS.POS_MAPPING[pos]) return CORPUS.POS_MAPPING[pos];
		else return pos;
	},
	
	_regexStems = /.*?STEM[^\n]*/g,
	_regexMatchRef = "\\($REF.*$", //Ex: "\\(1:7:9.*$";
	_regexParse =							   /(([^\|\n]*))?(?:\|((?:ACT|PASS)\|PCPL))?(?:\|(IMPF|IMPV|PERF))?(?:\|(PASS))?(?:\|(VN))?(?:\|(\([IVX]*\)))?(?:\|LEM:([^\|\n]*))?(?:\|ROOT:([^\|\n]*))?(?:\|(.*?))?$/,
	_regexParseFullLine = /(.*?)?(?:STEM)(?:\|POS:([^\|\n]*))?(?:\|((?:ACT|PASS)\|PCPL))?(?:\|(IMPF|IMPV|PERF))?(?:\|(PASS))?(?:\|(VN))?(?:\|(\([IVX]*\)))?(?:\|LEM:([^\|\n]*))?(?:\|ROOT:([^\|\n]*))?(?:\|(.*?))?$/,
	_regexParseFullLine = /([^\|\n]*)(?:\|((?:ACT|PASS)\|PCPL))?(?:\|(IMPF|IMPV|PERF))?(?:\|(PASS))?(?:\|(VN))?(?:\|(\([IVX]*\)))?(?:\|LEM:([^\|\n]*))?(?:\|ROOT:([^\|\n]*))?(?:\|(.*?))?$/,
	LEMMA = 7, ROOT = 8, FORM = 6, PERSONS = 9, MISC = 0, POS = 1,
	ACTIVEPASSIVEPCPL = 2, TENSE = 3, PASSIVE = 4, VN = 5,

	init = function(c){
		_c = c;
		_cParsed = null;
	},
	
	score = function(cObj){
		if(!cObj) return;
		var score = 0;
		if(cObj.pos === 'V'){ score += 10; }
		if(cObj.activepassive){ score += 25; }
		if(cObj.vn){ score += 25; }
		if(cObj.form){ score += 15; }
		// if(root){
			// if(root[2])
		// }
	},
	
	_parseRaw = function(c){
		var input = !c ? _c : (init(c) || c);
		if(!input){ return; }
		_cParsed = _regexParseFullLine.exec( input );
		return _cParsed;
	},
	
	parse = function(c){
		var oParsed = _parseRaw(c),
			corpus = {}; 
		corpus.lemma = corpus.root  = corpus.form  = corpus.features = corpus.misc = corpus.pos = '--';
		corpus.lemma = oParsed[ LEMMA ];
		corpus.root  = oParsed[ ROOT ];
		corpus.form  = oParsed[ FORM ]; if(!corpus.form) corpus.form = '(I)';
		corpus.features = oParsed[ PERSONS ];
		corpus.misc  = oParsed[ MISC ];
		corpus.pos	 = oParsed[ POS ];
		corpus.activepassive = oParsed[ ACTIVEPASSIVEPCPL ];
		corpus.tense = oParsed[TENSE];
		corpus.passive = oParsed[PASSIVE];
		corpus.vn = oParsed[VN];
		return corpus;		var result = {};

	},
	
	_scoreVerb = function( oo ){
		var scoreRootLem = oo.lemma && oo.root ? qRootLemDict.lookup( {lem: oo.lemma, root: oo.root} ) : null,
			scoreWord = scoreRootLem ? scoreRootLem.score : null,
			score = 0,
			scoresVerb = [];
		scoresVerb.push( (oo.pos.trim() === 'V') 		? 10 : 0); //TODO: .trim() isnt defined in IE; put in shim replacement
		scoresVerb.push( (oo.form !== '(I)') 	? 15 : 0); //TODO: differentiate based on rarity of verb form
		scoresVerb.push( (oo.activepassive) 		? 20 : 0);
		scoresVerb.push( (oo.vn)					? 25 : 0);
		score = _.reduce(scoresVerb, function(a,b){ return a+b;}, 0);
		if (score > 0){
			scoresVerb.push( (scoreRootLem && scoreRootLem.scoreVerb)	? scoreRootLem.scoreVerb : 0); //give weightage to whether verb is naqis/ajwaf/mithal etc ONLY if theres a verb score already.
			score += _.last( scoresVerb );
		}
		if(!scoreWord || scoreWord <= 0){
			scoresVerb.push( -20 );
			score += -20;
		}
		
		return {
			score: scoreWord,
			scoreVerb: score	? score				 : null,
			zScore:		scoreRootLem,
			zScoreVerb: scoresVerb,
		};
	},
	
	parseEx = function(verse){
		
		var _v = verse,
			_vParsed = 
					   _.chain( _v.split( ayahSeparator ) )
						.filter()
						.map( function(part){
							var temp = part.split(wordSeparator),
								o = {
									ar:	  qUtil.EnToAr( temp[_INDICES.buck] ),
									buck: temp[_INDICES.buck ],
									en:   temp[_INDICES.en ]
								},
								oo = parse( temp[_INDICES.corpus] ),
								ooo = {
									lemmaAr: qUtil.EnToAr( oo.lemma )
								},
								oScores = _scoreVerb( oo );
							return _.extend(o, oo, ooo, oScores )
						})
						.value();
		return _vParsed;
	},
	
	test = function(){
		var input = "N|ACT|PCPL|(IV)|LEM:mufosid|ROOT:fsd|MP|NOM";
		qCorpus.parse( input );
		qCorpus.parseEx( S[59] );	
	}
	;

	publicApi = {
		parse: parse,
		parseEx: parseEx,
		test: test,
	};
	
	return publicApi;
//})();
});