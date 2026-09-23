# Fleksitid – Timeregistrering

En enkel, lokal web-app for å registrere og følge opp fleksitid.

> 🚧 **Ny versjon under utvikling:** Fleksitid bygges om til en fullverdig webapp i ASP.NET Core (.NET 10) med innlogging, stempling og arbeidstidsperioder. Se [Fleksitid-webapp](https://github.com/Thanhibanani/Fleksitid-webapp).

![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Bakgrunn

Laget for eksterne konsulenter som jobber i en virksomhet med fleksitidsordning. Normaldagen er **08:00–15:45 (7t 45min)**, men du kan jobbe lengre og spare opp fleksitid — eller kortere og gå i minus.

## Funksjoner

- Legg til arbeidsdager med start, slutt og pause
- Beregner automatisk om du har pluss eller minus fleksitid
- Viser total oppspart fleksitid, antall dager og snitt per dag
- Data lagres i nettleserens `localStorage` — ingenting sendes til server
- Fungerer helt uten internett etter første lasting

## Kom i gang

Ingen installasjon nødvendig. Bare åpne `index.html` i en nettleser.

```bash
git clone https://github.com/Thanhibanani/Fleksitid.git
cd Fleksitid
open index.html   # Mac
start index.html  # Windows
```

## Struktur

```
Fleksitid/
├── index.html   # Markup og oppsett
├── fleksi.css   # Styling
└── fleksi.js    # Logikk og lagring i localStorage
```

## Tilpass

Øverst i `fleksi.js` kan du endre normaldagen:

```js
const NORMAL_MIN = 7 * 60 + 45; // 7 timer og 45 minutter
```

