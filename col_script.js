/**
 *Word Object: stores word, definition (eventually collocation and whatnot)
 *Constructor: var word (string), var def (string)
 *Setter methods: setDef (set definition)
 *Getter methods: getWord (get value), getDef (get definition)
 */
class Word {
    constructor(word,def,col,index){
        this.value = word;
        this.def = def;
        this.col = col;
        this.ID = index;
        this.key = null;
        this.pos = null;
    }
    
    setDef(definition){
        this.def = definition;
    }
    
    getWord(){
        return this.value;
    }
    
    getDef(){
        return this.def;
    }
    
    getCol(){
        return this.col;
    }
    
    setKey(key){
        this.key = key;
    }
    
    setPos(pos){
        this.pos = pos;
    }
}

/*
 *TrackNum Object: tracks nuumbers used so far
 *id: 1 = count for wordlist, 2 = count for randomization of answers
 */
class TrackNum {
    constructor(){
        this.n1 = [];
        this.n2 = [];
    }
    
    //clear n2 array
    clear(){
        this.n2 = [];
    }
    
    //gets random numbers
    getNumber(id,max){
        if (id == 1){
            while(1){
                var b = Math.floor(Math.random() * max);
                if (this.n1.length > 0){
                    if (!this.n1.includes(b)){
                        this.n1.push(b);
                        return b;
                    }
                } else {
                    this.n1.push(b);
                    return b;
                }
            }
        }
        else if (id == 2){
            while(1){
                var d = Math.floor(Math.random() * 6);
                if (this.n2.length > 0){
                    if (!this.n2.includes(d)){
                        this.n2.push(d);
                        return d;
                    }
                } else {
                    this.n2.push(d);
                    return d;
                }
            }
        }
    }
}
// FIELD VARIABLES 

var t = new TrackNum();

var allValues = [];

var wordList = [];

//This is a nasty list of all words. Sad!
var word = [];
var definition = [];
var collocation = [];
$(function(){
    $.getJSON('word.json',function(data){
        word = data.words;
		definition = data.definitions;
		collocation = data.collocations;
        console.log('json loaded successfully');
    }).error(function(){
        console.log('error: json not loaded');
    });
});

// MISC METHODS

//find word based on random number
function findWord(num){
    for (var word of wordList){
        if (word.ID == num){
            return word;
        }
    }
}

//get next character
function nextChar(c){
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

//get object based on position
function getObject(position,array){
    for (var i of array){
        if (i.pos == position){
            return i;
        }
    }
}

// QUIZ METHODS

function clickButton(){
    var t = document.getElementById("quiz");
    t.innerHTML = "<p>Please pick a quiz to take.</p>";
    t.innerHTML += "<input type='button' value='All Words' onClick='makeWordList()'>";
    t.innerHTML += "<input type='button' value='Sublist 1' onClick='makeWordList1()'>";
    t.innerHTML += "<input type='button' value='Sublist 2' onClick='makeWordList2()'>";
    t.innerHTML += "<input type='button' value='Sublist 3' onClick='makeWordList3()'>";
    t.innerHTML += "<input type='button' value='Sublist 4' onClick='makeWordList4()'>";
}

//assign values to each word
function assignValues(i){
    var w = word[i];
    var d = definition[i];
    var c = collocation[i];
    //console.log(w,d,c);
    wordList.push(new Word(w,d,c,i));
}

//assign values for all words depending on quiz
function makeWordList(){
    for (var i = 0; i < word.length; i++){
        assignValues(i);
    }
    renderQuestion();
}
function makeWordList1(){
    for (var i = 0; i < 60; i++){
        assignValues(i);
    }
    renderQuestion();
}
function makeWordList2(){
    word = word.slice(60,120);
    definition = definition.slice(60,120);
    collocation = collocation.slice(60,120);
    for (var i = 0; i < 60; i++){
        assignValues(i);
    }
    renderQuestion();
}
function makeWordList3(){
    word = word.slice(120,180);
    definition = definition.slice(120,180);
    collocation = collocation.slice(120,180);
    for (var i = 0; i < 60; i++){
        assignValues(i);
    }
    renderQuestion();
}
function makeWordList4(){
    word = word.slice(180,240);
    definition = definition.slice(180,240);
    collocation = collocation.slice(180,240);
    for (var i = 0; i < 60; i++){
        assignValues(i);
    }
    renderQuestion();
}

function printWrong(doc){
    for (var w of wrong){
        doc.innerHTML += "<p id='ans'>" + w.value + "</p>";
        doc.innerHTML += "<p>" + w.col + "</p><br>";
        
    }
}

function printCorrect(doc){
    for (var c of correct){
        doc.innerHTML += "<p id='ans'>" + c.value + "</p>";
        doc.innerHTML += "<p>" + c.col + "</p><br>";
    }
}

function shuffle(arr){
	var temp = [];
	for (var i = 0; i < 6; i++){
		var num = t.getNumber(2,0);
		temp.push(arr[num]);
	}
	t.clear();
	return temp;
}

// FIELD VARIABLES FOR renderQuestion() and checkAnswers()
var count = 0, pos = 0;

var as = []; //answer pool
var qs = []; //question pool
var correct = []; //correct answers
var wrong = []; //wrong answers
var answer_box_list = []; //answer boxes

function renderQuestion(){
	as = [];
	answer_box_list = [];
    desc = document.getElementById("desc");
    desc.innerHTML = "<h2>Select the correct word for each list of collocations.</h2>";
    test = document.getElementById("quiz");
    if (pos >= 5){
        test.innerHTML = "<h2>DONE! YOU GOT " + count + " OUT OF 30 RIGHT!</h1>";
        test.innerHTML += "<input type='button' value='Try Again' onClick='window.location.reload()'>";
        test.innerHTML += "<h3>YOU GOT THE FOLLOWING WORDS RIGHT!</h3>";
        if (correct.length === 0){
            test.innerHTML += "<p id='ans'>You didn't get any right...</p>";
        } else {
            printCorrect(test);
        }
        test.innerHTML += "<br><h3>YOU GOT THE FOLLOWING WORDS WRONG!</h3>";
        printWrong(test);
        return;
    }
    //console.log(wordList);
    var w;
    //get 6 random words for answer pool
    for (var i = 0; i < 6; i++){
        w = findWord(t.getNumber(1,wordList.length));
        console.log(w);
        as.push(w);
    }
    
    //set up answers
	var a1 = as[0].getCol();
	var a2 = as[1].getCol();
	var a3 = as[2].getCol();
    var a4 = as[3].getCol();
    var a5 = as[4].getCol();
    var a6 = as[5].getCol();
	
	var as_dup = [];
    
    for (var i = 0; i < 6; i++){
		var tmp = "ans" + i;
		as_dup = shuffle(as); //FIX THIS
		var answer_box = "<select id=" + tmp + ">\n<option value='' disabled selected></option>\n";
		for (var v of as_dup){
			temp = v.getWord();
			answer_box += "\n  <option value=" + temp + ">" + temp + "</option>";
		}
		answer_box += "\n</select>";
		answer_box_list.push(answer_box);
	}
    //console.log(answer_box);    
    
    //print them out baby
    test.innerHTML = "<br>" + answer_box_list[0] + " " + a1 + "<br><br>";
	test.innerHTML += answer_box_list[1] + " " + a2 + "<br><br>";
    test.innerHTML += answer_box_list[2] + " " + a3 + "<br><br>";
    test.innerHTML += answer_box_list[3] + " " + a4 + "<br><br>";
    test.innerHTML += answer_box_list[4] + " " + a5 + "<br><br>";
	test.innerHTML += answer_box_list[5] + " " + a6 + "<br><br>";
	test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
    //console.log(t.n2);
    t.clear();
    pos++;
}

function checkAnswer(){
    //var answers = document.getElementsByName("ans");
    for (var i = 0; i < 6; i++){
		var ans = "ans" + i;
		var a = document.getElementById(ans);
		var resp = a.options[a.selectedIndex].text;
		if (resp == as[i].getWord()){
			correct.push(as[i]);
			count++;
		} else {
			wrong.push(as[i]);
		}
	}
    renderQuestion();
}

window.addEventListener("load", clickButton, false);
