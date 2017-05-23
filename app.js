require.config({
  paths: {
    "jquery": 'lib/jquery.min', //"https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
    "underscore": 'lib/lodash.min', //"lib/underscore",

    "Q": 'lib/modules/Q', 
    "qAsbab": 'lib/modules/qAsbab', 
    "qCorpus": 'lib/modules/qCorpus.0.4',
    "qRoot": 'lib/modules/qRoot',
    "qRootLemDict": 'lib/modules/qRootLemDict',
    "qRootMeanings": 'lib/modules/qRootMeanings',
	"qSearch": 'lib/modules/qSearch.1.0',
	"qSynonyms": 'lib/modules/qSynonyms',
	"qUtil": 'lib/modules/qUtil',
  }
});


require(['lib/vue', 'lib/modules/qMain'], function( vue, qMain ){
	qMain.go();
});