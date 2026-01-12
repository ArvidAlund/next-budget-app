import { SearchCheck, Sparkles, Users } from "lucide-react";
import InfoContainer from "./infoContainer";

const workCards = [
    {
        title: "Nära användarna",
        description: "Vi bygger tillsammans med våra användare. Feedback, buggar och önskemål går rakt in i vår roadmap.",
        icon: <Users className="inline text-yellow-600" size={20} />,
    },
    {
        title: "Små, snabba iterationer",
        description: "Vi släpper hellre små förbättringar ofta än stora omtag sällan. Det gör appen bättre vecka för vecka.",
        icon: <SearchCheck className="inline text-purple-600" size={20} />,
    },
    {
        title: "Fokus på tydlighet",
        description: "Allt vi bygger ska vara begripligt på några sekunder. Om något känns rörigt, bygger vi om det.",
        icon: <Sparkles className="inline text-green-600" size={20} />,
    },
];

const HowWeWork = () => {
    return (
        <section className="px-6 md:px-10 mt-40">
            <h2 className="text-4xl text-center">
                Hur vi jobbar
            </h2>
            <hr className="mb-4 border-neutral-700" />
            <div className="mb-6 mx-auto text-center">
                <h3>Byggt för att användas, inte imponera.</h3>
                <p className="mt-4 lg:w-1/2 mx-auto">
                BudgetBuddy är byggt utifrån verkliga behov, inte feature-listor. Vi testar, förenklar
                och förbättrar tills varje del känns självklar att använda. Hellre färre saker som
                faktiskt hjälper dig än tjugo funktioner du aldrig öppnar.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 text-sm text-neutral-300">
                {workCards.map((item, index) => (
                    <InfoContainer key={index} data={item} />
                ))}
            </div>
        </section>
    );
};

export default HowWeWork;
