# Fleksitid – Timeregistrering

En enkel, lokal web-app for å registrere og følge opp fleksitid.

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
git clone https://github.com/ditt-brukernavn/fleksitid.git
cd fleksitid
open index.html   # Mac
start index.html  # Windows
```

## Struktur

```
fleksitid/
└── index.html   # Hele appen i én fil
```

## Tilpass

Øverst i `<script>`-blokken kan du endre normaldagen:

```js
const NORMAL_MIN = 7 * 60 + 45; // 7 timer og 45 minutter
```

