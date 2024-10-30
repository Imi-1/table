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


/**
 * 
 * @param {'td' | 'th'} tagName 
 * @param {string} id 
 * @param {HTMLTableRowElement} parentElement 
 */
function createElement(tagName,id,parentElement) {
    const element= document.createElement(tagName);
    element.id=id;
    parentElement.appendChild(element);
}



/**
 * 
 * @param {'td' | 'th'} tagName 
 * @param {string} id 
 * @param {HTMLTableRowElement} parentElement 
 */
function createHtmlElementWithParentId(tagName,id,parentId) {
    const parentElement=document.getElementById(parentId);
    if(parentElement != undefined){
        createElement(tagName,id,parentElement)
    }
}

function createTableHeaderCell(){
    const tr = document.getElementById("personTr");

    createTableCell("th",'Vezetéknév',tr);
    const keresztnev_createtablecell= createTableCell("th",'Keresztnév',tr);
    createTableCell("th",'Házas',tr);
    createTableCell("th",'Állat',tr);
    keresztnev_createtablecell.colSpan=2;
}


function rendertable(person_array){
    const tbody= document.getElementById("personTbody");
    tbody.innerHTML="";
    for(const pers of person_array){
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




function validateFields(lastnamehtml,firstname1html,pethtml){
    let result=true
    if (!validateElement(lastnamehtml, "Kötelező vezetéknevet adni!")){ 
            result = false;
        }

    if (!validateElement(firstname1html, "Kötelező keresztnevet adni!")){ 
            result = false;
        }

    if (!validateElement(pethtml, "Kötelező kiválasztani a háziállatot!")){ 
            result = false;
        }

   return result;
}



function validateElement(htmlElement, errorMessage) {
    const errorElement = htmlElement.parentElement.querySelector('.error');
    if (htmlElement.value === "") {
        errorElement.innerHTML = errorMessage;
        return false;
    }
    errorElement.innerHTML = "";  // Üzenet törlése, ha nincs hiba
    return true;
}