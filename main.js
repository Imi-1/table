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

 
const table = document.createElement('table');
document.body.appendChild(table);
 
const thead = document.createElement('thead');
table.appendChild(thead);
 
const tr = document.createElement('tr');
thead.appendChild(tr);
 
 
const tbody = document.createElement('tbody');
table.appendChild(tbody);

createTableCell("th",'Vezetéknév',tr);
const keresztnev_createtablecell= createTableCell("th",'Keresztnév',tr);
createTableCell("th",'Házas',tr);
createTableCell("th",'Állat',tr);

keresztnev_createtablecell.colSpan=2;


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
/**
 * 
 * @param {'td' | 'th'} tagName 
 * @param {string} innerHTML 
 * @param {HTMLTableRowElement} parentElement 
 */
function createTableCell(tagName, innerHTML, parentElement){
    const element = document.createElement(tagName);
    element.innerHTML = innerHTML;
    parentElement.appendChild(element);
    return element
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
        rendertable();
        
    }
    form.reset()
})
rendertable();
function rendertable(){
    tbody.innerHTML="";
    for(const pers of array){
        const tbody_tr = document.createElement('tr');
        tbody.appendChild(tbody_tr);


        createTableCell("td",pers.lastname,tbody_tr);
        const firstname1_createtablecell= createTableCell("td",pers.firstname1,tbody_tr);

        if(pers.firstname2 === undefined){
            firstname1_createtablecell.colSpan = 2;
        }
        else{
            createTableCell("td",pers.firstname2,tbody_tr);
        }


        tbody_tr.addEventListener('click', function(e){
            //console.log('clicked');
            const selected = tbody.querySelector('.selected');
            e.currentTarget.classList.add('selected');
            
    
            if (selected != undefined){
                selected.classList.remove('selected');
            }
              
        })
    
        createTableCell("td", pers.married ? "Igen" : "Nem", tbody_tr );
        createTableCell("td", pers.pet, tbody_tr);

     

     
    }
}