const Personal = () => {
  return (
    <section className="w-full p-6 mt-40">
        <h2 className="text-4xl text-center">Vårt team</h2>
        <hr className="mb-4 border-neutral-700" />
        <ul className="p-4">
            <li className="mb-8 grid md:grid-cols-2 gap-4 items-center h-full">
                <img
                src="https://avatars.githubusercontent.com/u/64034931?v=4"
                alt="Arvid Ålund"
                width={300}
                height={300}
                className="rounded-full mx-auto"
                />
                <div className="flex flex-col justify-center h-full">
                    <h2 className="font-bold">Arvid Ålund</h2>
                    <p className="text-sm font-medium">Ägare, Utvecklare</p>
                    <p className="mt-6">Jag behövde ett bättre sätt att förstå vart mina pengar faktiskt tog vägen. Budgetapparna som fanns kändes antingen för krångliga, för begränsade eller helt enkelt inte byggda för hur jag tänker. <br/><br/>Så jag gjorde det enda rimliga: jag byggde en egen.</p>
                </div>
            </li>
        </ul>
    </section>
  );
}

export default Personal;