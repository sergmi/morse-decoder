const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    let count = 0;
	let pattern = "";
	let expr_length = expr.length;
	let a;

	for(let j=0; j<expr_length; j++){
		if(count<10){
			if(expr[j] === "0"){
				count++;
				if(!pattern||(pattern[pattern.length-1])!=="#"){
					pattern += "#";
				}
			}
			else if(expr[j] === "1"){
				count += 2;
				if(expr[j + 1] === "0"){					
					pattern += ".";
				}
				else{
					pattern += "-";
				}
				j += 1;
			}
			else if(expr[j] === "*"){
				count = 0;			
				pattern += "$*";				
				j += 9;
			}
		}
		else {
			j--;
			count = 0;
			pattern += "*";
		}
	}

	a = pattern.split("*");
	
	a.forEach(function(v,i,m){
		m[i] = v.split("#");
	})
	
	a.forEach(function(v,i,m){
		m[i].forEach(function(t,k,n){
			if(t === "$"){
				n[k] = " ";
			}
			else{
				n[k] = MORSE_TABLE[t];
			}
		})
	})
	
	a.forEach(function(v,i,m){
		m[i] = v.join("");
	})
	
	return a.join("");
}

module.exports = {
    decode
}