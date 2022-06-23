import missingdatajson from "/missingdatajson.json" assert { type: "json" };

const tokenid= "62020157288306137204262585601212871537268194779568533209731806567570379636737"
const CONTRACT = "0x2953399124f0cbb46d2cbacd8a89cf0599974963"


function check (){


const exists = missingdatajson.some(o => tokenid in o)

console.log(exists)


}
check()