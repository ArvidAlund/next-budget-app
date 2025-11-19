# Next Budget App 💰

En modern och enkel budgetapp byggd med **Next.js 15**, **React 19** och **Tailwind CSS 4**.  
Appen hjälper dig att hantera inkomster, utgifter och hålla koll på din ekonomi – med stöd för Supabase-autentisering, datalagring, tabeller och smarta UI-komponenter.

## ✨ Funktioner

- 🔐 **Autentisering via Supabase**
- 📊 **Översikt över inkomster och utgifter**
- 📂 **Kategorier för att organisera din budget**
- 🗂 **Responsiva tabeller** (TanStack Table)
- 🧾 **Exportera till kalender (ICS)**
- 🖼 **OCR-stöd via Tesseract.js** för att läsa kvitton
- 🎨 **Snygg UI** med Radix UI + shadcn/ui + Tailwind
- 🤖 **AI-funktioner via OpenAI SDK** *(framtida utveckling)*

---

## 🛠 Teknisk stack

| Teknologi | Användning |
|-----------|------------|
| [Next.js 15](https://nextjs.org/) | Fullstack-ramverk |
| [React 19](https://react.dev/) | Komponentbaserad frontend |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling |
| [shadcn/ui](https://ui.shadcn.com/) | UI-komponenter |
| [Radix UI](https://www.radix-ui.com/) | Tillgänglighetskomponenter |
| [Supabase](https://supabase.com/) | Backend + Auth |
| [TanStack React Table](https://tanstack.com/table) | Tabeller |
| [Lucide Icons](https://lucide.dev/) + FontAwesome | Ikoner |
| [Tesseract.js](https://tesseract.projectnaptha.com/) | OCR |
| [OpenAI SDK](https://www.npmjs.com/package/openai) | AI-stöd |
| [Vercel](https://vercel.com/) | Deployment |

---

## 🚀 Kom igång

### 1. Klona repot
```bash
git clone https://github.com/ArvidAlund/next-budget-app.git
cd next-budget-app
```

### 2. Installera beroenden
```bash
npm install
```

### 3. Skapa miljövariabler
```
NEXT_PUBLIC_SUPABASE_URL=din-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=din-anon-key
OPENAI_API_KEY=din-openai-nyckel
```

### 4. Starta servern
```bash
npm run dev
```
Appen körs på http://localhost:3000

## Projektstruktur
```bash
src/
 ├── app/              # Next.js app directory
 ├── components/       # UI-komponenter
 ├── lib/              # Hjälpfunktioner (t.ex. db, auth)
 ├── styles/           # CSS / Tailwind
public/                # Statisk media
```

## Budgetapp – Inställningsstruktur

En komplett översikt över kategorier och inställningar för en budgetapp.

---

### 1. Allmänt (`general`)
Övergripande inställningar för hela appen.

- Språk
- Standardvaluta (SEK, EUR, USD)
- Startdag för månad (t.ex. 1, 25, 28)
- Tidsformat (12/24 h)
- Automatisk backup (on/off)
- Importera/Exportera data (CSV/JSON)
- Återställ hela appen / rensa data

---

### 2. Utseende (`appearance`)
Visuella inställningar och UI-komponenter.

- Tema (Ljus / Mörk / System)
- Accentfärg
- Kompakt vy / Normal vy
- Visa belopp med decimaler / avrundat
- Visa diagram (on/off)
- Visa kategoriikoner (on/off)
- Typsnittsstorlek (Small / Medium / Large)

---

### 3. Kalender (`calendar`)
Inställningar för kalender- och datumvyer.

- Standardvy (vecka / månad)
- Startdag på veckan (Måndag / Söndag)
- Markera återkommande transaktioner
- Markera löning / valfri dag
- Påminnelser om kommande räkningar kopplat till kalendern

---

### 4. Notifikationer (`notifications`)
Påminnelser och varningssystem.

- Påminnelse om räkningar
- Notis vid budgetgräns (t.ex. 80% av budget)
- Daglig / veckovis / månadsöversikt
- Push-notiser (on/off)
- Tyst läge
- Notis vid synk- eller backupfel

---

### 5. Integritet (`privacy`)
Integritet och dataskydd.

- Datadelning (statistik / privat)
- Tillåt analysdata (on/off)
- Lokal lagring eller molnlagring
- Rensa känslig data
- Exportera integritetsrapport
- Visa sekretesspolicy

---

### 6. Säkerhet (`security`)
Skydd av appen och användarens data.

- App-lås (PIN / Fingeravtryck / FaceID)
- Automatisk låsning efter X minuter
- Kryptera lokal data
- Byt PIN-kod
- Nödöppning (säkerhetsfrågor eller fras)

---

### 7. Konto & Synk (`account`)
Användarens konto och datasykronisering.

- Visa kontoinformation
- Koppla konto (Google / Apple / Email)
- Backup & Sync (on/off)
- Importera från moln
- Exportera till moln
- Logga ut
- Radera konto

---

### 8. Budget & Transaktioner (`budget`)
Kärnfunktioner för ekonomi och budgetlogik.

- Standardbudget (månad / vecka / år)
- Överföring mellan månader (carryover)
- Återkommande transaktioner
- Auto-kategorisering (regelbaserad / AI)
- Transaktionsformat:
  - Visa +/–
  - Visa decimaler / heltal
  - Tusentalsseparator (10000 / 10 000 / 10,000)
- Standardkategori för nya transaktioner
- Dölj små belopp (< 1 kr)
- Tillåt framtida transaktioner

---

### 9. Kategorier (`categories`)
Hantera användarens kategorier.

- Skapa kategori
- Ta bort kategori
- Byt namn
- Byt ikon
- Ändra färg
- Sortera kategorier (drag & drop)
- Aktivera/deaktivera standardkategorier
- Slå ihop kategorier

---