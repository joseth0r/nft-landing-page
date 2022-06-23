import missingdatajson from "/missingdatajson.json" assert { type: "json" };

const tokenid= "62020157288306137204262585601212871537268194779568533209731806372956821520385"
const CONTRACT = "0x2953399124f0cbb46d2cbacd8a89cf0599974963"


function check (){


var missingdata = missingdatajson.filter( element => element.tokenid ==tokenid);
console.log(missingdata[0])
console.log(missingdata[0].name)

}
check()