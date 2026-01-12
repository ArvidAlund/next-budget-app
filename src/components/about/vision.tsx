import { Brain, ChartBar, View } from "lucide-react";
import InfoContainer from "./infoContainer";

const pitchData = [
    {
        title: "Insikt utan krångel",
        description: "Vi visar vad som händer med dina pengar — utan att du behöver tolka diagram eller bankkonton.",
        icon: <ChartBar className="inline text-red-600" size={20} />,
    },
    {
        title: "Fokus på det viktiga",
        description: "Du ser direkt vad som är relevant för dig — inga fluffiga funktioner eller distraktioner.",
        icon: <View className="inline text-blue-600" size={20} />,
    },
    {
        title: "Byggt med sunt förnuft",
        description: "Vi bygger för verkliga behov och användare. Allt ska kännas lätt och logiskt.",
        icon: <Brain className="inline text-green-600" size={20} />,
    },
];

const Vision = () => {
    return (
        <section className="p-6 md:p-10 mt-10">
            <h2 className="text-4xl font-semibold tracking-tight mb-2 text-white text-center">
                Vår vision
            </h2>
            <hr className="mb-4 border-neutral-700" />
            <div className="mb-6 mx-auto text-center">
                <h3>Personlig ekonomi ska inte vara krångligt.</h3>
                <p className="mt-4 lg:w-1/2 mx-auto"> Vi vill göra det lättare att förstå vart ens utgifter är, samt hjälpa användaren fatta smarta beslut och känna sig trygg med sin budget — oavsett om du sparar till en resa, betalar av lån eller bara vill slippa stressen.
            </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3 text-sm text-neutral-300">
                {pitchData.map((item, index) => (
                    <InfoContainer key={index} data={item} />
                ))}
            </div>
        </section>
    );
};
export default Vision;
