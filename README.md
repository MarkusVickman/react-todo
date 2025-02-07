# React Moment 2 - Att göra
Applikationen ska hantera att göra-inlägg kopplat till en backend.

Besök webbplatsen (https://attgora.netlify.app/).

## Uppgift
Uppgiften gick ut på att skapa en react applikation programmerad i TypeScript. Applikationen ska hantera att göra-inlägg kopplat till en backend.

**Krav:**
* Använda TypeScript för typning och ökad kodkvalitet
* Applikationen ska vara uppdelad i lämpliga komponenter, tex en komponent för utskrift av lista, en för formulär.
* Implementera dynamisk datahämtning med useEffect-hook
* Skapa ett formulär för att lägga till nya todos med följande validering:
** Titel måste vara minst 3 tecken lång
** Beskrivning är valfri men får max vara 200 tecken
* Hantera olika status för todos:
** Ej påbörjad
** Pågående
** Avklarad
* Implementera funktioner för att:
** Hämta in samtliga todos och skriv ut på lämpligt sätt på sidan
** Lägga till en ny todo
** Updatera status för en todo (ej påbörjad, pågående, avklarad)
** Ta bort en todo
* Hantera laddnings- och felmeddelanden vid API-anrop
* Uppdatera listans tillstånd när en todo läggs till, uppdateras eller tas bort
* Designa applikationen med CSS så att den fungerar väl på både desktop och mobila enheter.
* Använd komponentspecifik CSS med inline-CSS och/eller separat stilmall som importeras till komponenten.

## Lösning
Applikationen använder många komponenten. De två huvudkomponenterna är App.tsx och Table.tsx. 
App.tsx är parent till Table och skickar med props till komponenten.

Applikationen kopplas till en Nest.js backend genom api anrop med FetchAPI.

## Testa
För att testa eller bygga vidare på projektet behöver repot klonas och kommandot ` npm install ` ska köras i terminalen.
För att testköra ` npm run dev `
För att publicera ` npm run build `

**Markus Vickman**
**MAVI2302**
