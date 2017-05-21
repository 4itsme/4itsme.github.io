// Handy regex to match refs and return Group 1, 2, 3: 		([0-9]*)\:([0-9]*)(?:\-([0-9]*))?
// Handy regex to only match refs with a ayah range.		([0-9]*)\:([0-9]*)(?:\-([0-9]*))
// handy regex to strip out html text. 						htmlText.split(/(<body>|<\/body>)/ig))[2]
// Handy regex to match spurious URLs						<a href="[^>]*>[^\<]*<\/a>
var fs = require('fs');
var path = require('path');

var regexAyahsRange = /([0-9]+)\:([0-9]+)(?:\-([0-9]+))/gm;
var regexSpuriousUrls = /<a href="[^>]*>[^\<]*<\/a>/g;
var regexGrabHtmlBody = /(<body[^\>]*>|<\/body>)/ig;


// List all files in a directory in Node.js recursively in a synchronous fashion
const flatten = arr => arr.reduce((acc, val) => 
      acc.concat(Array.isArray(val) ? flatten(val) : val), []);

Array.prototype.flatten = function() {return flatten(this)};

const walkSync = dir => fs.readdirSync(dir)
      .map(file => fs.statSync(path.join(dir, file)).isDirectory()
        ? walkSync(path.join(dir, file))
        : path.join(dir, file).replace(/\\/g, '/')).flatten();

var files = walkSync('content'),
	output,
	counter = 0;
	
	
var fnGrabHtmlBody = function(htmlText){
	var tmp;
	return (tmp = htmlText.split(regexGrabHtmlBody)) && tmp && tmp.length >= 2 ? tmp[2] : tmp;
}




for(var i=1; i++; i < 3){
	var f = files[i];
	if(!f){ console.log(f); return }
//files.forEach(function(f){
	output = fs.readFileSync(f, 'utf8').toString();
	if( regexSpuriousUrls.test( output ) ){
		console.log({
			f: f,
			matches: output.match(regexSpuriousUrls),
			//output: output
		});
		process.stdin.read();
	}
//});
}




/*
for(var i=1; i++; i < 3){
	var f = files[i];
	if(!f){ console.log(f); return }
//files.forEach(function(f){
	output = fs.readFileSync(f, 'utf8').toString();
	if( regexAyahsRange.test( output ) ){
		console.log({
			f: f,
			matches: output.match(regexAyahsRange),
			//output: output
		});
		process.stdin.read();
	}
//});
}
*/

/*
for(var i=1; i++; i < 3){
	var f = files[i];
//files.forEach(function(f){
	output = fs.readFileSync(f, 'utf8').toString();
	output = fnGrabHtmlBody(output);
	console.log([f, output]);
	process.stdin.read(); //system.readLine();
	if(++counter > 3){ return; }
//});
}
*/














/*
{ f: 'b/b39.html', matches: [ '85:14-15' ] }
{ f: 'b/b44.html', matches: [ '56:5-6' ] }
{ f: 'b/b49.html', matches: [ '56:15-16' ] }
{ f: 'b/b53.html', matches: [ '79:10-11' ] }
{ f: 'b/b55.html', matches: [ '56:30-31' ] }
{ f: 'b/b59.html', matches: [ '37:139-140', '74:50-51' ] }
{ f: 'b/b68.html', matches: [ '55:54-55' ] }
{ f: 'b/b70.html', matches: [ '81:34-36' ] }
{ f: 'b/b75.html', matches: [ '70:19-20' ] }
{ f: 'b/b76.html', matches: [ '94:7-8' ] }
{ f: 'b/b77.html', matches: [ '70:24-25' ] }
{ f: 'b/b78.html', matches: [ '112:1-2' ] }
{ f: 'b/b79.html', matches: [ '86:13-14', '37:46-47' ] }
{ f: 'd/d14.html', matches: [ '114:4-5' ] }
{ f: 'd/d17.html', matches: [ '75:20-21' ] }
{ f: 'd/d2.html', matches: [ '88:21-22' ] }
{ f: 'd/d20.html', matches: [ '37:93-94' ] }
{ f: 'd/d22.html',
  matches: [ '74:27-29', '101:9-11', '104:5-6' ] }
{ f: 'd/d24.html', matches: [ '70:10-11' ] }
{ f: 'd/d28.html', matches: [ '35:20-21' ] }
{ f: 'd/d30.html', matches: [ '102:1-2' ] }
{ f: 'd/d32.html', matches: [ '70:10-11' ] }
{ f: 'd/d36.html', matches: [ '68:5-6' ] }
{ f: 'd/d7.html', matches: [ '56:71-72', '44:43-44' ] }
{ f: 'f/f1.html', matches: [ '79:31-33' ] }
{ f: 'f/f12.html', matches: [ '17:26-27' ] }
{ f: 'f/f2.html', matches: [ '110:1-2' ] }
{ f: 'gh/gh3.html', matches: [ '93:9-10' ] }
{ f: 'gh/gh4.html', matches: [ '80:40-41', '100:4-5' ] }
{ f: 'h/h6.html', matches: [ '74:19-20', '75:31-34' ] }
{ f: 'h/h8.html', matches: [ '43:74-75' ] }
{ f: 'k/k10.html', matches: [ '87:18-19' ] }
{ f: 'k/k7.html', matches: [ '23:1-2' ] }
{ f: 'kh/kh19.html', matches: [ '69:21-23' ] }
{ f: 'kh/kh21.html', matches: [ '69:30-31' ] }
{ f: 'l/l13.html', matches: [ '88:25-26' ] }
{ f: 'l/l14.html', matches: [ '43:3-4' ] }
{ f: 'l/l3.html', matches: [ '84:1-2' ] }
{ f: 'l/l4.html', matches: [ '75:29-30' ] }
{ f: 'm/m14.html', matches: [ '94:7-8' ] }
{ f: 'm/m31.html', matches: [ '98:2-3' ] }
{ f: 'n/n13.html', matches: [ '34:10-11' ] }
{ f: 'n/n16.html', matches: [ '11:82-83' ] }
{ f: 'n/n18.html', matches: [ '55:10-13' ] }
{ f: 'n/n20.html', matches: [ '56:65-66' ] }
{ f: 'n/n22.html', matches: [ '86:5-6' ] }
{ f: 'n/n26.html', matches: [ '14:16-17', '73:12-13' ] }
{ f: 'n/n28.html', matches: [ '78:1-5' ] }
{ f: 'n/n3.html', matches: [ '19:88-89' ] }
{ f: 'n/n30.html', matches: [ '95:4-5' ] }
{ f: 'n/n32.html', matches: [ '80:15-16' ] }
{ f: 'n/n8.html', matches: [ '68:15-16' ] }
{ f: 'p/p15.html', matches: [ '56:71-72' ] }
{ f: 'p/p17.html', matches: [ '72:26-27' ] }
{ f: 'p/p34.html', matches: [ '74:21-23' ] }
{ f: 'p/p42.html', matches: [ '56:54-55' ] }
{ f: 'p/p43.html', matches: [ '56:17-18' ] }
{ f: 'p/p44.html', matches: [ '69:36-37' ] }
{ f: 'p/p46.html', matches: [ '26:60-61' ] }
{ f: 'p/p48.html', matches: [ '91:1-2' ] }
{ f: 'p/p5.html',
  matches: [ '78:24-25', '38:56-57', '88:4-5' ] }
{ f: 'p/p58.html',
  matches: [ '54:1-2', '26:224-225', '69:41-42' ] }
{ f: 'q/q5.html', matches: [ '70:11-13' ] }
{ f: 'r/r12.html', matches: [ '94:7-8' ] }
{ f: 'r/r13.html', matches: [ '94:2-3' ] }
{ f: 's/s14.html', matches: [ '106:1-2' ] }
{ f: 's/s22.html', matches: [ '91:9-10' ] }
{ f: 's/s24.html', matches: [ '68:17-18' ] }
{ f: 's/s26.html', matches: [ '80:40-41' ] }
{ f: 's/s4.html', matches: [ '107:6-7' ] }
{ f: 't/t1.html', matches: [ '81:15-16' ] }
{ f: 't/t11.html', matches: [ '80:27-29' ] }
{ f: 't/t2.html', matches: [ '81:17-18', '93:1-2' ] }
{ f: 't/t21.html', matches: [ '90:14-16' ] }
{ f: 't/t3.html', matches: [ '88:8-9' ] }
{ f: 't/t34.html', matches: [ '74:21-22' ] }
{ f: 't/t9.html', matches: [ '55:8-9' ] }
{ f: 'TA/TA1.html', matches: [ '53:5-6' ] }
{ f: 'TA/TA5.html', matches: [ '69:30-31' ] }
{ f: 'TA/TA6.html', matches: [ '74:14-15' ] }
{ f: 'z/z7.html', matches: [ '73:12-13' ] }
{ f: 'z/z8.html', matches: [ '80:21-22' ] }

*/
















/*
spurious links

{ f: 'appendix/1.8.html',
  matches: [ '<a href="http://en.wikipedia.org/wiki/Mount_Judi" style="color:inherit;text-decoration:inherit">Mount Judi - Wikipedia, the free encyclopedia</a>' ] }
{ f: 'appendix/2.3.html',
  matches: [ '<a href="" style="color:inherit;text-decoration:inherit">http://arabic.tripod.com/SixNouns.htm].in</a>' ] }
{ f: 'appendix/2.4.html',
  matches: [ '<a href="" style="color:inherit;text-decoration:inherit">http://en.wikipedia.org/wiki/Indian_..._and_measures]</a>' ] }
{ f: 'b/b18.html',
  matches: [ '<a href="http://something.to/" style="color:inherit;text-decoration:inherit">something.to</a>' ] }
{ f: 'b/b19.html',
  matches: 
   [ '<a href="http://deed.to/" style="color:inherit;text-decoration:inherit">deed.to</a>',
     '<a href="http://deed.to/" style="color:inherit;text-decoration:inherit">deed.to</a>' ] }
{ f: 'b/b20.html',
  matches: [ '<a href="http://female.as/" style="color:inherit;text-decoration:inherit">female.as</a>' ] }
{ f: 'b/b21.html',
  matches: [ '<a href="http://floor.to/" style="color:inherit;text-decoration:inherit">floor.to</a>' ] }
{ f: 'b/b22.html',
  matches: [ '<a href="http://not.in/" style="color:inherit;text-decoration:inherit">not.in</a>' ] }
{ f: 'b/b23.html',
  matches: 
   [ '<a href="http://top.as/" style="color:inherit;text-decoration:inherit">top.as</a>',
     '<a href="http://varied.as/" style="color:inherit;text-decoration:inherit">varied.as</a>',
     '<a href="http://stinginess.as/" style="color:inherit;text-decoration:inherit">stinginess.as</a>',
     '<a href="http://stingy.to/" style="color:inherit;text-decoration:inherit">stingy.to</a>' ] }
{ f: 'b/b24.html',
  matches: [ '<a href="http://bird.as/" style="color:inherit;text-decoration:inherit">bird.as</a>' ] }
{ f: 'b/b27.html',
  matches: [ '<a href="http://limit.to/" style="color:inherit;text-decoration:inherit">limit.to</a>' ] }
{ f: 'b/b28.html',
  matches: [ '<a href="http://state.in/" style="color:inherit;text-decoration:inherit">state.in</a>' ] }
{ f: 'b/b30.html',
  matches: 
   [ '<a href="http://torment.as/" style="color:inherit;text-decoration:inherit">torment.as</a>',
     '<a href="http://meaning.in/" style="color:inherit;text-decoration:inherit">meaning.in</a>' ] }
{ f: 'b/b32.html',
  matches: [ '<a href="http://intoxicated.no/" style="color:inherit;text-decoration:inherit">intoxicated.no</a>' ] }
{ f: 'b/b34.html',
  matches: [ '<a href="http://one.to/" style="color:inherit;text-decoration:inherit">one.to</a>' ] }
{ f: 'b/b8.html',
  matches: [ '<a href="http://repeatedly.in/" style="color:inherit;text-decoration:inherit">repeatedly.in</a>' ] }
{ f: 'ch/ch1.html',
  matches: [ '<a href="http://it.it/" style="color:inherit;text-decoration:inherit">it.it</a>' ] }
{ f: 'gg/gg2.html',
  matches: 
   [ '<a href="http://app.thesaurus.com/click/nn1ov4?clksite=thes&amp;clkquery=8348D5F206B82EDDA2E6528DEB0B527D&amp;clkpage=the&amp;clkimpr=UMZNWHRHpVofKS20&amp;clkld=0&amp;clkorgn=0&amp;clkref=http%3A%2F%2Fwww.google.com%2Furl%3Fsa%3Dt%26rct%3Dj%26q%3D%26esrc%3Ds%26source%3Dweb%26cd%3D1%26ved%3D0CCsQFjAA%26url%3Dhttp%253A%252F%252Fthesaurus.com%252Fbrowse%252Fsuspicion%26ei%3DUk3GUPXAIsrQtAaghYDIDg%26usg%3DAFQjCNHf-w96Tr-u3ig8lvHK2H_L5sGvKg&amp;clken=1clk&amp;clkord=0&amp;clkblk=d&amp;clktemp=mid&amp;clkmod=1clk&amp;clkitem=conjecture&amp;clkdest=http%3A%2F%2Fthesaurus.com%2Fbrowse%2Fconjecture" style="color:inherit;text-decoration:inherit">&nbsp;</a>',
     '<a href="http://app.thesaurus.com/click/nn1ov4?clksite=thes&amp;clkquery=8348D5F206B82EDDA2E6528DEB0B527D&amp;clkpage=the&amp;clkimpr=UMZNWHRHpVofKS20&amp;clkld=0&amp;clkorgn=0&amp;clkref=http%3A%2F%2Fwww.google.com%2Furl%3Fsa%3Dt%26rct%3Dj%26q%3D%26esrc%3Ds%26source%3Dweb%26cd%3D1%26ved%3D0CCsQFjAA%26url%3Dhttp%253A%252F%252Fthesaurus.com%252Fbrowse%252Fsuspicion%26ei%3DUk3GUPXAIsrQtAaghYDIDg%26usg%3DAFQjCNHf-w96Tr-u3ig8lvHK2H_L5sGvKg&amp;clken=1clk&amp;clkord=0&amp;clkblk=d&amp;clktemp=mid&amp;clkmod=1clk&amp;clkitem=conjecture&amp;clkdest=http%3A%2F%2Fthesaurus.com%2Fbrowse%2Fconjecture" style="color:inherit;text-decoration:inherit">Conjecture</a>' ] }
{ f: 'HA/HA14.html',
  matches: 
   [ '<a href="http://word.to/" style="color:inherit;text-decoration:inherit">word.to</a>',
     '<a href="http://be.in/" style="color:inherit;text-decoration:inherit">be.in</a>',
     '<a href="http://amazement.to/" style="color:inherit;text-decoration:inherit">amazement.to</a>',
     '<a href="http://senses.to/" style="color:inherit;text-decoration:inherit">senses.to</a>',
     '<a href="http://stunned.to/" style="color:inherit;text-decoration:inherit">stunned.to</a>' ] }
{ f: 'HA/HA9.html',
  matches: 
   [ '<a href="http://destruction.to/" style="color:inherit;text-decoration:inherit">destruction.to</a>',
     '<a href="http://after.to/" style="color:inherit;text-decoration:inherit">after.to</a>' ] }
{ f: 'j/j11.html',
  matches: 
   [ '<a href="http://people.as/" style="color:inherit;text-decoration:inherit">people.as</a>',
     '<a href="http://people.it/" style="color:inherit;text-decoration:inherit">people.it</a>',
     '<a href="http://religion.it/" style="color:inherit;text-decoration:inherit">religion.it</a>',
     '<a href="http://party.to/" style="color:inherit;text-decoration:inherit">party.to</a>' ] }
{ f: 'j/j2.html',
  matches: 
   [ '<a href="http://something.to/" style="color:inherit;text-decoration:inherit">something.to</a>',
     '<a href="http://know.to/" style="color:inherit;text-decoration:inherit">know.to</a>',
     '<a href="http://senses.to/" style="color:inherit;text-decoration:inherit">senses.to</a>',
     '<a href="http://senses.to/" style="color:inherit;text-decoration:inherit">senses.to</a>',
     '<a href="http://feel.it/" style="color:inherit;text-decoration:inherit">feel.it</a>' ] }
{ f: 'j/j4.html',
  matches: [ '<a href="https://en.wikibooks.org/wiki/Arabic/LearnRW/Tanween" style="color:inherit;text-decoration:inherit">https://en.wikibooks.org/wiki/Arabic/LearnRW/Tanween</a>' ] }
{ f: 'j/j9.html',
  matches: [ '<a href="http://country.to/" style="color:inherit;text-decoration:inherit">country.to</a>' ] }
{ f: 'kh/kh16.html',
  matches: 
   [ '<a href="http://strength.it/" style="color:inherit;text-decoration:inherit">strength.it</a>',
     '<a href="http://rain.as/" style="color:inherit;text-decoration:inherit">rain.as</a>' ] }
{ f: 'l/l13.html',
  matches: 
   [ '<a href="http://unacceptable.to/" style="color:inherit;text-decoration:inherit">unacceptable.to</a>',
     '<a href="http://contrary.to/" style="color:inherit;text-decoration:inherit">contrary.to</a>',
     '<a href="http://state.to/" style="color:inherit;text-decoration:inherit">state.to</a>' ] }
{ f: 'm/m33.html',
  matches: 
   [ '<a href="http://avenge.to/" style="color:inherit;text-decoration:inherit">avenge.to</a>',
     '<a href="http://wrong.to/" style="color:inherit;text-decoration:inherit">wrong.to</a>',
     '<a href="http://hazards.it/" style="color:inherit;text-decoration:inherit">hazards.it</a>',
     '<a href="http://bottom.as/" style="color:inherit;text-decoration:inherit">bottom.as</a>' ] }
{ f: 'p/p2.html',
  matches: 
   [ '<a href="http://meaning.it/" style="color:inherit;text-decoration:inherit">meaning.it</a>',
     '<a href="http://exclusion.it/" style="color:inherit;text-decoration:inherit">exclusion.it</a>' ] }
{ f: 'p/p20.html',
  matches: 
   [ '<a href="http://tanzil.net/#75:11" style="color:inherit;text-decoration:inherit">&#1633;&#1633;</a>',
     '<a href="http://www.tanzil.net/" style="color:inherit;text-decoration:inherit">www.tanzil.net</a>',
     '<a href="http://tanzil.net/#18:58" style="color:inherit;text-decoration:inherit">&#1637;&#1640;</a>',
     '<a href="http://www.tanzil.net/" style="color:inherit;text-decoration:inherit">www.tanzil.net</a>',
     '<a href="http://www.tanzil.net/" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://www.tanzil.net/" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://www.tanzil.net/" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#16:81" style="color:inherit;text-decoration:inherit">&#1640;&#1633;</a>',
     '<a href="http://www.tanzil.net/" style="color:inherit;text-decoration:inherit">www.tanzil.net</a>',
     '<a href="http://tanzil.net/#42:47" style="color:inherit;text-decoration:inherit">&#1636;&#1639;</a>',
     '<a href="http://tanzil.net/#39:61" style="color:inherit;text-decoration:inherit">&#1638;&#1633;</a>',
     '<a href="http://tanzil.net/#4:121" style="color:inherit;text-decoration:inherit">&#1633;&#1634;&#1633;</a>',
     '<a href="http://tanzil.net/#72:22" style="color:inherit;text-decoration:inherit">&#1634;&#1634;</a>' ] }
{ f: 'p/p21.html',
  matches: 
   [ '<a href="http://tanzil.net/#9:6" style="color:inherit;text-decoration:inherit">&#1638;</a>',
     '<a href="http://tanzil.net/#2:67" style="color:inherit;text-decoration:inherit">&#1638;&#1639;</a>',
     '<a href="http://tanzil.net/#7:200" style="color:inherit;text-decoration:inherit">&#1634;&#1632;&#1632;</a>' ] }
{ f: 'p/p26.html',
  matches: 
   [ '<a href="http://tanzil.net/#2:260" style="color:inherit;text-decoration:inherit">&#1634;&#1638;&#1632;</a>',
     '<a href="http://tanzil.net/#2:260" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#2:260" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#21:31" style="color:inherit;text-decoration:inherit">&#1635;&#1633;</a>',
     '<a href="http://tanzil.net/#26:63" style="color:inherit;text-decoration:inherit">&#1638;&#1635;</a>',
     '<a href="http://tanzil.net/#89:9" style="color:inherit;text-decoration:inherit">&#1641;</a>',
     '<a href="http://tanzil.net/#55:24" style="color:inherit;text-decoration:inherit">&#1634;&#1636;</a>' ] }
{ f: 'p/p27.html',
  matches: 
   [ '<a href="http://tanzil.net/#12:58" style="color:inherit;text-decoration:inherit">&#1637;&#1640;</a>',
     '<a href="http://tanzil.net/#15:75" style="color:inherit;text-decoration:inherit">&#1639;&#1637;</a>' ] }
{ f: 'p/p28.html',
  matches: 
   [ '<a href="http://tanzil.net/#56:48" style="color:inherit;text-decoration:inherit">&#1636;&#1640;</a>',
     '<a href="http://tanzil.net/#56:49" style="color:inherit;text-decoration:inherit">&#1636;&#1641;</a>',
     '<a href="http://tanzil.net/#59:10" style="color:inherit;text-decoration:inherit">&#1633;&#1632;</a>',
     '<a href="http://tanzil.net/#2:4" style="color:inherit;text-decoration:inherit">&#1636;</a>' ] }
{ f: 'p/p3.html',
  matches: 
   [ '<a href="http://tanzil.net/#3:141" style="color:inherit;text-decoration:inherit">&#1633;&#1636;&#1633;</a>',
     '<a href="http://tanzil.net/#91:9" style="color:inherit;text-decoration:inherit">&#1641;</a>',
     '<a href="http://tanzil.net/#33:69" style="color:inherit;text-decoration:inherit">&#1638;&#1641;</a>' ] }
{ f: 'p/p30.html',
  matches: 
   [ '<a href="http://tanzil.net/#4:73" style="color:inherit;text-decoration:inherit">&#1639;&#1635;</a>',
     '<a href="http://tanzil.net/#4:73" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#3:92" style="color:inherit;text-decoration:inherit">&#1641;&#1634;</a>',
     '<a href="http://tanzil.net/#3:92" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#3:92" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#34:52" style="color:inherit;text-decoration:inherit">&#1637;&#1634;</a>',
     '<a href="http://tanzil.net/#2:27" style="color:inherit;text-decoration:inherit">&#1634;&#1639;</a>',
     '<a href="http://tanzil.net/#4:21" style="color:inherit;text-decoration:inherit">&#1634;&#1633;</a>',
     '<a href="http://tanzil.net/#54:29" style="color:inherit;text-decoration:inherit">&#1634;&#1641;</a>',
     '<a href="http://tanzil.net/#7:95" style="color:inherit;text-decoration:inherit">&#1641;</a>',
     '<a href="http://tanzil.net/#7:95" style="color:inherit;text-decoration:inherit">&#1637;</a>',
     '<a href="http://tanzil.net/#28:23" style="color:inherit;text-decoration:inherit">&#1634;&#1635;</a>' ] }
{ f: 'p/p33.html',
  matches: 
   [ '<a href="http://tanzil.net/#82:1" style="color:inherit;text-decoration:inherit">&#1633;</a>',
     '<a href="http://tanzil.net/#82:1" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#82:1" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#82:1" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#82:1" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#2:74" style="color:inherit;text-decoration:inherit">&#1639;&#1636;</a>',
     '<a href="http://tanzil.net/#2:74" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#2:74" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#86:12" style="color:inherit;text-decoration:inherit">&#1633;&#1634;</a>',
     '<a href="http://tanzil.net/#86:12" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#56:19" style="color:inherit;text-decoration:inherit">&#1633;&#1641;</a>',
     '<a href="http://tanzil.net/#56:19" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#56:19" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#67:8" style="color:inherit;text-decoration:inherit">&#1640;</a>',
     '<a href="http://tanzil.net/#67:8" style="color:inherit;text-decoration:inherit"></a>' ] }
{ f: 'p/p34.html',
  matches: 
   [ '<a href="http://tanzil.net/#33:19" style="color:inherit;text-decoration:inherit">&#1633;&#1641;</a>',
     '<a href="http://tanzil.net/#33:19" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#33:19" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#56:17" style="color:inherit;text-decoration:inherit">&#1633;&#1639;</a>',
     '<a href="http://tanzil.net/#84:14" style="color:inherit;text-decoration:inherit">&#1633;&#1636;</a>',
     '<a href="http://tanzil.net/#84:14" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#22:11" style="color:inherit;text-decoration:inherit">&#1633;&#1633;</a>',
     '<a href="http://tanzil.net/#22:11" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#22:11" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#23:66" style="color:inherit;text-decoration:inherit">&#1638;&#1638;</a>',
     '<a href="http://tanzil.net/#23:66" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#23:66" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#9:127" style="color:inherit;text-decoration:inherit">&#1633;&#1634;&#1639;</a>',
     '<a href="http://tanzil.net/#27:10" style="color:inherit;text-decoration:inherit">&#1633;&#1632;</a>',
     '<a href="http://tanzil.net/#2:217" style="color:inherit;text-decoration:inherit">&#1634;&#1633;&#1639;</a>',
     '<a href="http://tanzil.net/#2:217" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#18:64" style="color:inherit;text-decoration:inherit">&#1638;&#1636;</a>',
     '<a href="http://tanzil.net/#74:21" style="color:inherit;text-decoration:inherit">&#1634;&#1633;</a>',
     '<a href="http://tanzil.net/#74:22" style="color:inherit;text-decoration:inherit">&#1634;&#1634;</a>',
     '<a href="http://tanzil.net/#74:23" style="color:inherit;text-decoration:inherit">&#1634;&#1635;</a>' ] }
{ f: 'p/p35.html',
  matches: 
   [ '<a href="http://tanzil.net/#29:21" style="color:inherit;text-decoration:inherit">&#1634;&#1633;</a>',
     '<a href="http://tanzil.net/#18:18" style="color:inherit;text-decoration:inherit">&#1633;&#1640;</a>',
     '<a href="http://tanzil.net/#7:47" style="color:inherit;text-decoration:inherit">&#1636;&#1639;</a>',
     '<a href="http://tanzil.net/#7:47" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#7:47" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#2:144" style="color:inherit;text-decoration:inherit">&#1633;&#1636;&#1636;</a>',
     '<a href="http://tanzil.net/#2:144" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#12:65" style="color:inherit;text-decoration:inherit">&#1638;&#1637;</a>',
     '<a href="http://tanzil.net/#10:78" style="color:inherit;text-decoration:inherit">&#1639;&#1640;</a>',
     '<a href="http://tanzil.net/#11:81" style="color:inherit;text-decoration:inherit">&#1640;&#1633;</a>',
     '<a href="http://tanzil.net/#11:81" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#46:22" style="color:inherit;text-decoration:inherit">&#1634;&#1634;</a>',
     '<a href="http://tanzil.net/#46:22" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#46:22" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#46:22" style="color:inherit;text-decoration:inherit"></a>' ] }
{ f: 'p/p36.html',
  matches: 
   [ '<a href="http://tanzil.net/#18:40" style="color:inherit;text-decoration:inherit">&#1636;&#1632;</a>',
     '<a href="http://tanzil.net/#18:40" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#2:36" style="color:inherit;text-decoration:inherit">&#1635;&#1638;</a>',
     '<a href="http://tanzil.net/#2:36" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#2:36" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#18:56" style="color:inherit;text-decoration:inherit">&#1637;&#1638;</a>',
     '<a href="http://tanzil.net/#18:56" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#73:14" style="color:inherit;text-decoration:inherit">&#1633;&#1636;</a>',
     '<a href="http://tanzil.net/#73:14" style="color:inherit;text-decoration:inherit"></a>',
     '<a href="http://tanzil.net/#12:51" style="color:inherit;text-decoration:inherit">&#1637;&#1633;</a>' ] }
{ f: 'p/p48.html',
  matches: [ '<a href="http://time.it/" style="color:inherit;text-decoration:inherit">time.it</a>' ] }
{ f: 'p/p51.html',
  matches: [ '<a href="http://pleasure.to/" style="color:inherit;text-decoration:inherit">pleasure.to</a>' ] }
{ f: 'r/r17.html',
  matches: [ '<a href="http://www.oneummah.net/quran/book/17.html" style="color:inherit;text-decoration:inherit">Al-Israa (The Night Journey</a>' ] }
{ f: 'tt/tt2.html',
  matches: [ '<a href="http://well.it/" style="color:inherit;text-decoration:inherit">well.it</a>' ] }
{ f: 'tt/tt4.html',
  matches: [ '<a href="http://senseless.to/" style="color:inherit;text-decoration:inherit">senseless.to</a>' ] }
{ f: 'tt/tt6.html',
  matches: 
   [ '<a href="http://grain.in/" style="color:inherit;text-decoration:inherit">grain.in</a>',
     '<a href="http://sand-desert.name/" style="color:inherit;text-decoration:inherit">sand-desert.name</a>' ] }
{ f: 'tt/tt7.html',
  matches: 
   [ '<a href="http://another.in/" style="color:inherit;text-decoration:inherit">another.in</a>',
     '<a href="http://meaning.in/" style="color:inherit;text-decoration:inherit">meaning.in</a>',
     '<a href="http://side.to/" style="color:inherit;text-decoration:inherit">side.to</a>' ] }
{ f: 'y/y4.html',
  matches: [ '<a href="http://fuss.to/" style="color:inherit;text-decoration:inherit">fuss.to</a>' ] }
{ f: 'z/z1.html',
  matches: 
   [ '<a href="http://www.oneummah.net/quran/book/17.html" style="color:inherit;text-decoration:inherit">Al-Israa (The Night Journey</a>',
     '<a href="http://www.oneummah.net/quran/book/17.html" style="color:inherit;text-decoration:inherit">Al-Israa (The Night Journey</a>' ] }
undefined
*/