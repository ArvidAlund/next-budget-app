const userCards = [
    {
        title: "Byggt för riktiga behov",
        description:
            "“Det märks att appen är gjord av någon som själv behövt den. Allt är logiskt och inget känns onödigt.”",
        name: "Anna A",
    },
    {
        title: "Feedback driver oss",
        description:
            "“Jag skickade in ett förbättringsförslag och två veckor senare fanns funktionen i appen. Det händer aldrig någon annanstans.”",
        name: "Erik B",
    },
    {
        title: "Tillit i fokus",
        description:
            "“Jag känner mig trygg när jag använder BudgetBuddy. Inget krångel, inga konstigheter — bara tydlig koll på min ekonomi.”",
        name: "Lina C",
    },
    {
        title: "Gemenskap och stöd",
        description:
            "“Det känns som att man är del av något större. Alla försöker få bättre koll på sin ekonomi, och appen hjälper oss dit.”",
        name: "Oskar D",
    },
];


const UsersSection = () => {
    return (
        <section className="px-6 md:px-10 mt-40">
            <h2 className="text-4xl text-center">Användarna</h2>
            <hr className="mb-4 border-neutral-700" />

            <div className="mb-10 mx-auto text-center">
                <h3>Allt börjar med er.</h3>
                <p className="mt-4 lg:w-1/2 mx-auto">
                    BudgetBuddy hade aldrig blivit vad det är utan våra användare. Ni visar vad som
                    fungerar, vad som saknas och vad som faktiskt gör skillnad i vardagen. Vi lyssnar,
                    förbättrar och bygger vidare — tillsammans.
                </p>
            </div>

            <ul className="grid gap-4 lg:grid-cols-4">
                {userCards.map((item, index) => (
                    <li key={index} className="border border-neutral-700 rounded-lg p-4 flex flex-col">
                        <h4>{item.title}</h4>
                        <p className="mt-2 flex-1">{item.description}</p>
                        <div className="mt-4 font-semibold">- {item.name}</div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default UsersSection;
