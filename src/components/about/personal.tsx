const Personal = () => {
  return (
    <section className="w-full border-b  border-neutral-700 pb-8 mb-8">
        <h2>Vårt team</h2>
        <hr className="mb-4 border-neutral-700" />
        <ul className="p-4">
            <li className="mb-8 grid grid-cols-2 gap-4 items-center">
                <img
                src="https://avatars.githubusercontent.com/u/64034931?v=4"
                alt="Arvid Ålund"
                width={300}
                height={300}
                className="rounded-full mx-auto"
                />
                <div className="flex flex-col justify-center">
                    <h2 className="font-bold">Arvid Ålund</h2>
                    <p className="mt-2">Roll: Ägare, Utvecklare</p>
                    <p className="mt-2">Var i behov av en budgetapp för att bättre hantera mina utgifter. <br/>Så jag byggde en.</p>
                </div>
            </li>
        </ul>
    </section>
  );
}

export default Personal;