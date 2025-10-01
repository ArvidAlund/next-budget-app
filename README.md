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
