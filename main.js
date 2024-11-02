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

// Létrehozzuk a táblázatot, amelyet a dokumentum testében helyezünk el
createElement("table", "personTable", document.body); // Táblázat létrehozása a 'personTable' azonosítóval

// Létrehozzuk a táblázat fejét (thead), sorát (tr), és törzsét (tbody)
createHtmlElementWithParentId("thead", "personThead", "personTable"); // Fejléc elem létrehozása
createHtmlElementWithParentId("tr", "personTr", "personThead"); // Sor elem létrehozása a fejlécben
createHtmlElementWithParentId("tbody", "personTbody", "personTable"); // Törzs elem létrehozása a táblázatban

// A táblázat fejléc celláinak létrehozása
createTableHeaderCell();

// Eseménykezelő az űrlap benyújtására
document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault(); // Megakadályozzuk az alapértelmezett űrlap elküldést
    const form = e.currentTarget; // Az aktuális űrlap elemének lekérése
    
    // Ha a mezők validálása sikeres
    if (validateFields("lastname", "firstname1", "pet")) {
        // Új személy objektum létrehozása az űrlapmezők értékeivel
        const newperson = {
            firstname1: document.getElementById('firstname1').value,
            firstname2: document.getElementById('firstname2').value,
            lastname: document.getElementById('lastname').value,
            married: document.getElementById('married').checked,
            pet: document.getElementById('pet').value,
        };

        // Az új személy hozzáadása a tömbhöz
        array.push(newperson);
        console.log(array); // Az aktuális tömb kiírása a konzolra
        rendertable(array); // A táblázat újrarajzolása az aktuális tömb alapján
    }
    
    form.reset(); // Az űrlap mezőinek törlése az elküldés után
});

// A táblázat inicializálása az üres tömbbel
rendertable(array); // A táblázat megjelenítése, üres tömbbel