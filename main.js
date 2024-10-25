let array = [
    {
        firstname1: 'Géza',
        firstname2: 'Ferenc',
        lastname: 'Kocsis',
        married: true,
        pet: 'kutya'
    },
    {
        firstname1: 'Mária',
        firstname2: 'Júlia',
        lastname: 'Horváth',
        married: false,
        pet: 'macska'
    },
    {
        firstname1: 'Ferenc',
        lastname: 'Balogh',
        married: false,
        pet: 'teknős'
    },
    {
        firstname1: 'Gábor',
        firstname2: 'Attila',
        lastname: 'Horváth',
        married: true,
        pet: 'macska'
    },
]

createElement("table","personTable",document.body);

createHtmlElementWithParentId("thead","personThead","personTable");
createHtmlElementWithParentId("tr","personTr","personThead");
createHtmlElementWithParentId("tbody","personTbody","personTable");


createTableHeaderCell()


function validatefields(lastnamehtml,firstname1html,pethtml){
    let result=true
   if(lastnamehtml.value === ""){
    const apa = lastnamehtml.parentElement;
 
    const errorka=apa.querySelector(`.error`);
    errorka.innerHTML="Kötelező vezetéknevet adni!";
     result=false;
   }


   if(firstname1html.value === ""){
    const apa = firstname1html.parentElement;
 
    const errorka=apa.querySelector(".error");
    errorka.innerHTML="Kötelező keresztnevet adni!";
     result=false;
   }


   if(pethtml.value === ""){
    const apa = pethtml.parentElement;
 
    const errorka=apa.querySelector(".error");
    errorka.innerHTML="Kötelező kivállasztani a háziállatot!";
     result=false;
   }


   return result;

}


const form = document.getElementById("form");
form.addEventListener("submit", function(e){
    e.preventDefault();
    const lastname =document.getElementById("lastname");
    const firstname1 =document.getElementById("firstname1");
    const firstname2 =document.getElementById("firstname2");
    const married =document.getElementById("married");
    const pet =document.getElementById("pet");

    const lastnamevalue=lastname.value;
    const firstname1value=firstname1.value;
    let firstname2value=firstname2.value;
    const marriedvalue=married.checked;
    const petvalue=pet.value;

    if(validatefields(lastname, firstname1, pet)){
        if (firstname2value===""){
            firstname2value=undefined;
        }
        const newperson={
            firstname1: firstname1value,
            firstname2: firstname2value,
            lastname: lastnamevalue,
            married: marriedvalue,
            pet: petvalue
        }
    

        array.push(newperson);
        console.log(array);
        rendertable(array);
        
    }
    form.reset()
})
rendertable(array);
