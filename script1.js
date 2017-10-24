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

//Using JSON now! Good!
//var word = ["analyze", "approach", "area", "assess", "assume", "authority", "available", "benefit", "concept", "consist", "constitute", "context", "contract", "create", "data", "define", "derive", "distribute", "economy", "environment", "establish", "estimate", "evident", "export", "factor", "finance", "formula", "function", "identify", "income", "indicate", "individual", "interpret", "involve", "issue", "labor", "legal", "legislate", "major", "method", "occur", "percent", "period", "policy", "principle", "proceed", "process", "require", "research", "respond", "role", "section", "sector", "significant", "similar", "source", "specific", "structure", "theory", "vary", "achieve", "acquire", "administer", "affect", "appropriate", "aspect", "assist", "category", "chapter", "commission", "community", "complex", "compute", "conclude", "conduct", "consequent", "construct", "consume", "credit", "culture", "design", "distinct", "element", "equate", "evaluate", "feature", "final", "focus", "impact", "injure", "institute", "invest", "item", "journal", "maintain", "normal", "obtain", "participate", "perceive", "positive", "potential", "previous", "primary", "purchase", "range", "region", "regulate", "relevant", "reside", "resource", "restrict", "secure", "seek", "select", "site", "strategy", "survey", "text", "tradition", "transfer", "alternative", "circumstance", "comment", "compensate", "component", "consent", "considerable", "constant", "constrain", "contribute", "convene", "coordinate", "core", "corporate", "correspond", "criteria", "deduce", "demonstrate", "document", "dominate", "emphasis", "ensure", "exclude", "framework", "fund", "illustrate", "immigrate", "imply", "initial", "instance", "interact", "justify", "layer", "link", "locate", "maximize", "minor", "negate", "outcome", "partner", "philosophy", "physical", "proportion", "publish", "react", "register", "rely", "remove", "scheme", "sequence", "sex", "shift", "specify", "sufficient", "task", "technical", "technique", "technology", "valid", "volume", "access", "adequate", "annual", "apparent", "approximate", "attitude", "attribute", "civil", "code", "commit", "communicate", "concentrate", "confer", "contrast", "cycle", "debate", "despite", "dimension", "domestic", "emerge", "error", "ethnic", "goal", "grant", "hence", "hypothesis", "implement", "implicate", "impose", "integrate", "internal", "investigate", "job", "label", "mechanism", "obvious", "occupy", "option", "output", "overall", "parellel", "parameter", "phase", "predict", "principal", "prior", "professional", "project", "promote", "regime", "resolve", "retain", "series", "statistic", "status", "stress", "subsequent", "sum", "summary", "undertake"];
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
//var definition = ["to examine or think about something carefully, in order to understand it", "a way of doing something or dealing with a problem", "a particular part of a country, town, house, office, subject; (math) the amount of space that a flat surface or shape covers ", "examine something and make a decision about it", "To think that something is true, although you do not have definite proof; To start to do a job, especially an important one ", "someone who is respected because of their knowledge; the power to give orders to people", "something that is available is able to be used or can easily be bought or found", "an advantage, improvement, or help that you get from something", "an idea of how something is, or how something should be done", "to be based on or depend on something; to be formed from two or more things or people", "parts that form something; to be considered to be something", "Words and paragraphs surrounding a word or sentence; overall situation, background", "a formal written agreement between people or companies etc.", "to make something exist that did not exist before", "information or facts", "to describe something correctly and thoroughly", "to develop or come from something else", "to give things to a group of people, especially in a planned way", "the system by which a country's money and goods are produced and used", "The air, water, and land on Earth; The people and things that are around you in your life (e.g. buildings you use, the people you live or work with)", "to start or create something meant to last for a long time; to set up", "to try to judge the value, size, speed, cost etc of something, without calculating it exactly", "easy to see, notice, or understand", "(v)to sell or send goods to another country; (n) the act of sending goods to another country", "one of several things that influence or cause a situation; a particular level on a scale that measures how strong or effective something is", "(n) the management of money by governments, large organizations; (v) to provide money", "a method or principles that you use to solve a problem; a series of numbers or letters that represent a mathematical or scientific rule; a type of liquid food for babies that is similar to a woman's breast milk ", "the purpose that something has, or the job that someone or something does", "to recognize something or discover exactly what it is", "the money that you earn from your work", "show that something is likely to be true or exist", "considered separately from other people or things in the same group; belonging to or intended for one person rather than a group", "to translate spoken words from one language into another; to explain the meaning of something ", "if an activity or situation involves something, that thing is part of it or a result of it", "(n) a subject or problem that is often discussed or argued about; (v) to officially make a statement, give an order, warning etc.", "work, especially physical work", "allowed to do something by law", "to make a law about something", "(adj) very serious, large or important; (n) an officer in the army", "a way of doing something", "to happen", "one part in every hundred", "length of time; the mark (.)", "a way of doing something that has been officially agreed and chosen by a person, political party, business, or other organization", "a moral rule or belief about what is right and wrong, that influences how you behave", "to continue to do something that has already been planned or started", "a series of actions that are done in order to achieve a particular result", "to need something; if you are required to do or have something, a law or rule says you must do it or have it", "serious study of a subject, in order to discover new facts or test new ideas ", "to do something as a reaction to something that has been said or done", "the way in which someone or something is involved in an activity or situation", "one of the parts that something such as an object or place is divided into; one of the separate parts of a structure, piece of furniture etc that you fit together to form the whole; a separate part of a book, newspaper, document, report etc", "part of an activity (business, trade)", "having an important effect or influence, especially on what will happen in the future ", "almost the same", "the thing, place, person, etc. that you get something from", "a specific thing, person, or group is one particular thing, person, or group", "the way in which the parts of something are connected with each other and form a whole, or the thing that these parts make up", "an idea that explains something about life or the world (especially not proven to be true)", "if several things of the same type vary, they are all different from each other", "gain or reach, usually by effort, skill, courage, etc.", "to get or gain something", "to manage the work (or money) of a company or organization; to give someone a medicine or medical treatment", "to do something that produces an effect or change in something or in someone's situation", "correct or suitable for a particular time, situation, or purpose", "one part of a situation, idea, plan etc that has many parts", "to help someone to do something", "A group of people or things that are all of the same type", "Done of the parts into which a book is divided; a particular period or event in someone's life or in history ", "a group of people who have been given a specific official job; an extra amount of money given to a person for services; (v) to formally ask someone to write, create or do something for you ", "the people who live in the same area, town etc.; a group of people who have the same interests, religion, race etc.", "something that has a lot of different parts and is difficult to understand or deal with; a group of buildings or one large building used for a particular purpose", "to calculate a result, answer, sum etc.", "to decide that something is true after considering all the information you have", "do an activity; behavior ", "happening as a result of a particular event or situation", "to build something such as a house, bridge, road etc., or a sentence ", "to use time, energy, goods etc", "to buy something and pay for it later; approval or praise that you give to someone for something they have done", "the beliefs, way of life, art, and customs that are shared and accepted by people  in a particular society ", "the art or process of making a drawing of something to show how you will make it or what it will look like", "clearly different or belonging to a different type", "one part or feature of a whole system, plan, piece of work etc, especially one that is basic or important ", "to consider that two things are similar or connected; to be equal to something", "to judge how good, useful, or successful something is ", "part of something that you notice because it seems important, interesting, or typical", "last; being the result at the end of a process", "to give special attention to one particular person or thing, or to make people do this ", "(n) the effect or influence that an event, situation etc has on someone or something; (n) the force of one object hitting another; (v) to have an important or noticeable effect on someone or something", "to be hurt in an accident", "(n) an organization that has a particular purpose; (v) to introduce or start a system, rule, legal process etc. ", "to buy shares, property, or goods because you hope that the value will increase and you can make a profit", "a single thing, especially one thing in a list, group, or set of things", "a serious magazine made for professional people", "to make something continue in the same way or at the same standard as before", "usual, typical, or expected", "to get something that you want, especially through your own effort, skill, or work", "to do an activity with other people", "to think about something in a particular way; to realize ", "thinking about what is good in a situation", "the possibility that something will happen or develop in a particular way", "happened or existed before this moment", "First in order, most important", "to buy something", "(n) a number of things that are different, but are all of the same general type; (v) to include a variety of different things or people in addition to those mentioned", "large area of a country or the world", "to control by rules", "directly relating to the subject or problem being discussed or considered", "to live somewhere", "something such as useful land, or minerals such as oil or coal, that exists in a country and can be used to increase its wealth", "limit something", "(adj.) happy/confident, safe; (v)to get something; fasten firmly; protect from harm", "try to find or get something", "(v) to choose something or someone by thinking carefully about which is the best, most suitable etc; (adj) chosen carefully ", "a place where something important or interesting happened; an area of ground where something is being built or will be built; a website", "planned series of actions for achieving something", "a set of questions that you ask a lot of people in order to find out information ", "(n) any written material; (v) to send someone a written message", "a custom, belief or way of doing something that has existed for a long time ", "to move from one place, school, job etc to another, or to make someone do this, especially within the same organization", "an alternative idea, plan etc is different from the one you have and can be used instead", "the conditions that affect a situation, action, event etc.", "(n) an opinion that you express about someone or something; (v) to express an opinion ", "to replace or balance the effect of something bad", "one of several parts that together make up  a whole machine, system etc.", "permission to do something", "large enough to be important or have an effect", "all the time, or very often", "to stop someone from doing what they want to do", "to give money, help, ideas etc to something that a lot of other people are also involved in", "to come together, especially for a formal meeting", "to organize an activity so that the people involved in it work well together", "most important or central part; to take out the core of a fruit", "shared by all people in a group", "to be the same as or match something; to write letters to someone and receive letters from them", "standard by which something is judged", "Arrive at (a fact or a conclusion) by reasoning", "to show something", "(n) a piece of paper that has official information on it; (v) to write about something, film it, or take photographs of it, in order to record information about it", "to control someone or something or to have more importance than other people or things ", "special attention or importance", "to make certain that something will happen properly", "deliberately not include something or someone", "set of ideas; the structure of a society; supporting parts of a building, vehicle etc.", "an amount of money that is collected and kept for a particular purpose", "to make the meaning of something clearer by giving examples", "to come into a country in order to live there permanently", "to suggest that something is true, without saying it directly", "(adj) happening at the beginning; (n) the first letter of someone's first name; (v) to write your initials on a document", "an example of something, especially something bad", "To communicate with someone, especially while you work, play or spend time with them.", "to show that something is right ", "something that covers a surface or is between two surfaces", "(n)things related in some way; (v)to make a connection between two or more things or people", "to find the exact position of something", "increase something as much as possible", "small and not very important or serious, especially when compared with other things [≠ major]", "to prevent something from having any effect; to state that something does not exist or is untrue ", "the final result of a meeting, discussion, war etc. - used especially when no one knows what it will be until it actually happens", "(n) someone you do a particular activity with; (v) to be someone's partner", "the study of the nature and meaning of existence, truth, good and evil, etc; the attitude or set of ideas that guides the behavior of a person or organization", "related to someone's body and not their mind or emotions", "part of a whole, ratio", "to arrange for a book, magazine etc to be written, printed, and sold", "to respond", "(n)  an official list of names of people; (v) to put someone's or something's name on an official list", "to trust or depend on someone or something to do what you need or expect them to do", "to take something away from, out of, or off the place where it is", "(n) a clever plan, especially to do something that is bad or illegal; (v) to make such plans; a system that you use to organize information, ideas etc.", "the order that something happens or exists in, or the order it is supposed to happen or exist in", "the physical activity that two people do together in order to produce babies, or for pleasure; gender", "(n) - a change in the way people think about something, or how it’s done; (v) - to move from one place or position to another", "to say something in an exact and detailed way", "as much as is needed for a particular purpose", "a piece of work that must be done, especially one that is difficult or unpleasant or that must be done regularly", "relating to practical skills, knowledge and methods used in science or industry ", "a special way of doing something", "new machines, equipment, and ways of doing things that are based on modern knowledge about science and computers", "legally or officially acceptable; reasonable or sensible", "sound; amount of something; space filled", "(v) to find and use information, especially on a computer; (n) the right to enter a place, use something, see someone etc.", "enough in quantity", "once every year", "easy to notice", "to be close to a particular number", "the opinions and feelings that you usually have about something", "Quality regarded as natural or typical; to believe or say that a situation or event is caused by something", "relating to the people who live in a country", "a set of rules, laws, or principles that tell people how to behave; a set of numbers, letters, or symbols ", "to do something wrong or illegal; to promise that you will definitely do something", "to exchange information or conversation with other people", "to think very carefully about something that you are doing;(n) a substance or liquid which has been made stronger by removing most of the water from it ", "to discuss something with other people, so that everyone can express their opinions and decide on something; to officially give someone a title etc, especially as a reward for something they have achieved ", "a difference between two people, situations, ideas, etc. that are being compared", "a number of connected events that happen many times in the same order", "discuss a subject formally", "something happens or is true even though something else might have prevented it", "the length, height, or width of something; an aspect; one part of a situation", "relating to family relationships and life at home", "to appear after being covered or hidden", "mistake", "relating to a particular race, nation, or tribe and their customs and traditions ", "something that you hope to achieve in the future ", "to give someone something or allow them to have something that they have asked for", "for this reason", "idea based on facts, but not proven to be correct ", "to make something that has been officially decided start to happen or be used", "to show or suggest that someone is involved in a crime or dishonest act; if something is implicated in something bad or harmful, it is shown to be its cause", "to force people to accept a rule, tax, or your ideas", "To combine or work together in a way that makes something more effective; to become part of a group or society and be accepted by them, or to help someone do this", "inside something (body, country etc.)", "to try to find out the truth about a crime, accident or a scientific problem", "the regular paid work that you do for an employer ", "(n) a piece of paper that describes stg; (v)to describe stg. (or someone) unfairly ", "part of a machine or a set of parts that does a particular job; a system or a way of behaving", "easy to notice or understand", "to live or stay in a place; being busy doing something; to enter a place in a large group and keep control of it, especially by military force", "a choice you can make in a particular situation", "the amount of goods or work produced by a person, machine, factory", "considering or including everything", "(in math) parallel lines; things which are very similar", "a set of fixed limits that control the way that something should be done", "one part of a process in which something develops or grows ", "to say what will happen", "(adj) - most important; (n)- someone who is in charge of a school", "done, given, etc. at an earlier time", "relating to a job that needs special education and training", "a carefully planned piece of work ", "to help something to develop or increase", "a government, especially one that was not elected fairly; a special plan of food, exercise etc that is intended to improve your health ", "(v)to find a way of dealing with a problem; (n, formal) strong determination to succeed in something", "to keep something or continue to have something", "similar events  that happen one after the other", "a set of numbers which represent facts or measurements", "the position that someone or something has compared to other people or things", "continuous feelings of worry about your work or personal life, that prevent you from relaxing", "happening or coming after something else", "(n) an amount of money; (n) the total produced when you add two or more numbers or amounts together", "to make a short statement giving only the main information", "to accept that you are responsible for a piece of work, and start to do it"];

var wordList = [];

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
    t.innerHTML += "<input type='button' class='sublist_select' value='All Words' onClick='makeWordList()'>";
    t.innerHTML += "<input type='button' class='sublist_select' value='Sublist 1' onClick='makeWordList1()'>";
    t.innerHTML += "<input type='button' class='sublist_select' value='Sublist 2' onClick='makeWordList2()'>";
    t.innerHTML += "<input type='button' class='sublist_select' value='Sublist 3' onClick='makeWordList3()'>";
    t.innerHTML += "<input type='button' class='sublist_select' value='Sublist 4' onClick='makeWordList4()'>";
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
        doc.innerHTML += "<p>" + w.def + "</p><br>";
        
    }
}

function printCorrect(doc){
    for (var c of correct){
        doc.innerHTML += "<p id='ans'>" + c.value + "</p>";
        doc.innerHTML += "<p>" + c.def + "</p><br>";
    }
}

// FIELD VARIABLES FOR renderQuestion() and checkAnswers()
var count = 0, pos = 0;

var as = []; //answer pool
var qs = []; //question pool
var correct = []; //correct answers
var wrong = []; //wrong answers

// ACTUAL QUIZ METHODS

function renderQuestion(){
    desc = document.getElementById("desc");
    desc.innerHTML = "<h2>Match the words to its definitions.</h2>";
    test = document.getElementById("quiz");
    if (pos >= 10){
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
    console.log(t.n1);
    //console.log(wordList);
	as = [];
    qs = [];
    var w;
    //get 6 random words for answer pool
    for (var i = 0; i < 6; i++){
        w = findWord(t.getNumber(1,wordList.length));
        console.log(w);
        as.push(w);
    }
    
    //pick 3 to make them questions
    for (var i1 = 0; i1 < 3; i1++){
        var num = t.getNumber(2,0);
        qs.push(as[num]);
    }
    console.log(as);
    console.log(qs);
    
    //assign answer key to word objects
    var chr = 'A';
    
    for (var i2 = 0; i2 < 3; i2++){
        for (var i3 = 0; i3 < 6; i3++){
            if (qs[i2].value == as[i3].value){
                qs[i2].setKey(chr);
                as[i3].setKey(chr);
                //console.log(qs[i2].value);
                //console.log(as[i3].value);
                //console.log(qs[i2].key);
                //console.log(as[i3].key);
                chr = nextChar(chr);
            }
        }
    }
    //set up questions
	var q1 = qs[0].getWord();
    var q2 = qs[1].getWord();
    var q3 = qs[2].getWord();
    
    //set up answers
	var a1 = as[0].getDef();
	var a2 = as[1].getDef();
	var a3 = as[2].getDef();
    var a4 = as[3].getDef();
    var a5 = as[4].getDef();
    var a6 = as[5].getDef();
    
    //set position of answers
    as[0].setPos('A');
    as[1].setPos('B');
    as[2].setPos('C');
    as[3].setPos('D');
    as[4].setPos('E');
    as[5].setPos('F');
    
    //print them out baby
	test.innerHTML = "<h3 class='ques_def'>"+"A: "+q1+"</h3>";
    test.innerHTML += "<h3 class='ques_def'>"+"B: "+q2+"</h3>";
    test.innerHTML += "<h3 class='ques_def'>"+"C: "+q3+"</h3>";
	test.innerHTML += "<input type='text' class='def_ans' name='choices' maxlength='1' style='width: 15px' id='A'> "+a1+"<br>";
	test.innerHTML += "<input type='text' class='def_ans' name='choices' maxlength='1' style='width: 15px' id='B'> "+a2+"<br>";
    test.innerHTML += "<input type='text' class='def_ans' name='choices' maxlength='1' style='width: 15px' id='C'> "+a3+"<br>";
    test.innerHTML += "<input type='text' class='def_ans' name='choices' maxlength='1' style='width: 15px' id='D'> "+a4+"<br>";
    test.innerHTML += "<input type='text' class='def_ans' name='choices' maxlength='1' style='width: 15px' id='E'> "+a5+"<br>";
	test.innerHTML += "<input type='text' class='def_ans' name='choices' maxlength='1' style='width: 15px' id='F'> "+a6+"<br><br>";
	test.innerHTML += "<button id='submit_def' onclick='checkAnswer()'>Submit Answer</button>";
    //console.log(t.n2);
    t.clear();
    pos++;
}

function checkAnswer(){
    var choices = document.getElementsByName('choices');
    var chr = 'A';
    
    //find how many correct answers
    for (var ii = 0; ii < 3; ii++){
        for (var c of choices){
            if (c.value.toUpperCase() == chr){
                var c1 = getObject(c.id,as);
                if (c1.key == qs[ii].key){
                    count++;
                    correct.push(c1);
                    break;
                }
                else {
                    wrong.push(c1);
                    break;
                }
            } else {
                var c2 = getObject(c.id,as);
                if (c2.key == qs[ii].key){
                    wrong.push(qs[ii]);
                }
            }
        }
        chr = nextChar(chr);
    }
    //console.log(correct);
    console.log(wrong);
    console.log(count);
	renderQuestion();
}
window.addEventListener("load", clickButton, false);
