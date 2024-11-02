/**
 * 
 * @param {'td' | 'th'} tagName - Az elkészítendő elem típusa: 'td' (adatcellák) vagy 'th' (fejlécek)
 * @param {string} innerHTML - Az elem belső HTML tartalma
 * @param {HTMLTableRowElement} parentElement - Az a szülő elem, amelyhez az új elemet hozzáadjuk
 * @returns {HTMLElement} - A létrehozott HTML elem
 */
function createTableCell(tagName, innerHTML, parentElement) {
    const element = document.createElement(tagName); // Új elem létrehozása a megadott típussal
    element.innerHTML = innerHTML; // Az elem belső HTML tartalmának beállítása
    parentElement.appendChild(element); // Az új elemet hozzáadjuk a szülő elemhez
    return element; // Visszaadjuk a létrehozott elemet
}


/**
 * 
 * @param {'td' | 'th'} tagName - Az elkészítendő elem típusa
 * @param {string} id - Az elem azonosítója (id)
 * @param {HTMLTableRowElement} parentElement - Az a szülő elem, amelyhez az új elemet hozzáadjuk
 */
function createElement(tagName, id, parentElement) {
    const element = document.createElement(tagName); // Új elem létrehozása
    element.id = id; // Az elem azonosítójának beállítása
    parentElement.appendChild(element); // Az új elemet hozzáadjuk a szülő elemhez
}


/**
 * 
 * @param {'td' | 'th'} tagName - Az elkészítendő elem típusa
 * @param {string} id - Az elem azonosítója (id)
 * @param {string} parentId - Az a szülő elem azonosítója, amelyhez az új elemet hozzáadjuk
 */
function createHtmlElementWithParentId(tagName, id, parentId) {
    const parentElement = document.getElementById(parentId); // A szülő elem keresése az azonosító alapján
    if (parentElement != undefined) { // Ellenőrizzük, hogy a szülő elem létezik-e
        createElement(tagName, id, parentElement); // Ha igen, létrehozzuk az új elemet
    }
}

/**
 * A táblázat fejléc celláinak létrehozása
 */
function createTableHeaderCell() {
    const tr = document.getElementById("personTr"); // A sor (tr) keresése a megadott azonosító alapján

    createTableCell("th", 'Vezetéknév', tr); // Vezetéknév fejléc cella létrehozása
    const keresztnev_createtablecell = createTableCell("th", 'Keresztnév', tr); // Keresztnév fejléc cella létrehozása
    createTableCell("th", 'Házas', tr); // Házas fejléc cella létrehozása
    createTableCell("th", 'Állat', tr); // Állat fejléc cella létrehozása
    keresztnev_createtablecell.colSpan = 2; // A Keresztnév fejléc cella szélességének beállítása
}

/**
 * A táblázat megjelenítése az adott személyek tömbje alapján
 * @param {Array} person_array - A megjelenítendő személyek adatait tartalmazó tömb
 */
function rendertable(person_array) {
    const tbody = document.getElementById("personTbody"); // A táblázat testének keresése
    tbody.innerHTML = ""; // A meglévő tartalom törlése
    for (const pers of person_array) { // Minden személy adatainak bejárása
        const tbody_tr = document.createElement('tr'); // Új sor (tr) létrehozása
        tbody.appendChild(tbody_tr); // Az új sort hozzáadjuk a táblázat testéhez

        createTableCell("td", pers.lastname, tbody_tr); // Vezetéknév cella létrehozása
        const firstname1_createtablecell = createTableCell("td", pers.firstname1, tbody_tr); // Keresztnév1 cella létrehozása

        if (pers.firstname2 === undefined) { // Ha a második keresztnév hiányzik
            firstname1_createtablecell.colSpan = 2; // A cella szélességének beállítása
        } else {
            createTableCell("td", pers.firstname2, tbody_tr); // Keresztnév2 cella létrehozása
        }

        // Az eseménykezelő hozzáadása a sorhoz
        tbody_tr.addEventListener('click', function(e) {
            const selected = tbody.querySelector('.selected'); // A már kijelölt sor keresése
            e.currentTarget.classList.add('selected'); // Az aktuális sor kijelölése
            
            if (selected != undefined) { // Ha már van kijelölt sor
                selected.classList.remove('selected'); // A kijelölés eltávolítása
            }
        });

        createTableCell("td", pers.married ? "Igen" : "Nem", tbody_tr); // Házas cella létrehozása
        createTableCell("td", pers.pet, tbody_tr); // Állat cella létrehozása
    }
}

/**
 * A mezők validálása
 * @param {string} lastnameid - A vezetéknév mező azonosítója
 * @param {string} firstname1id - Az első keresztnév mező azonosítója
 * @param {string} petid - Az állat mező azonosítója
 * @returns {boolean} - A validálás eredménye
 */
function validateFields(lastnameid, firstname1id, petid) {
    const lastnamehtml = document.getElementById(lastnameid); // A vezetéknév mező keresése
    const firstname1html = document.getElementById(firstname1id); // Az első keresztnév mező keresése
    const pethtml = document.getElementById(petid); // Az állat mező keresése
    let result = true; // A validálás eredményének alapértelmezett beállítása
    if (!validateElement(lastnamehtml, "Kötelező vezetéknevet adni!")) { 
        result = false; // Ha a validálás hibát talál, az eredmény hamisra állítódik
    }

    if (!validateElement(firstname1html, "Kötelező keresztnevet adni!")) { 
        result = false; // Ha a validálás hibát talál, az eredmény hamisra állítódik
    }

    if (!validateElement(pethtml, "Kötelező kiválasztani a háziállatot!")) { 
        result = false; // Ha a validálás hibát talál, az eredmény hamisra állítódik
    }

    return result; // A végső validálási eredmény visszaadása
}

/**
 * Az egyes mezők validálásáért felelős függvény
 * @param {HTMLElement} htmlElement - A validálandó HTML elem
 * @param {string} errorMessage - A hibaüzenet, amelyet meg kell jeleníteni, ha a validálás nem sikerül
 * @returns {boolean} - A validálás eredménye
 */
function validateElement(htmlElement, errorMessage) {
    const errorElement = htmlElement.parentElement.querySelector('.error'); // A hibaüzenet mező keresése
    if (htmlElement.value === "") { // Ha a mező üres
        errorElement.innerHTML = errorMessage; // A hibaüzenet megjelenítése
        return false; // A validálás nem sikerült
    }
    errorElement.innerHTML = ""; // Üzenet törlése, ha nincs hiba
    return true; // A validálás sikeres
}
