const PhoneHome = () => {
  return (
    <>
        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            gap: "1.5rem",
            }}
            className="overflow-auto"
        >
          <h1 className="text-3xl font-bold text-center">Välkommen till BudgetBuddy!</h1>
          <p className="text-center">
            För att få bästa upplevelse, använd gärna BudgetBuddy på en större skärm.
            </p>
        </main>
    </>
  );
}

export default PhoneHome;