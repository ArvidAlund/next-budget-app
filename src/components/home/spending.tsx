import { Container } from "../ui/container";

interface SpendingProps {
  className?: string;
}

export default function Spending({ className }: SpendingProps) {
  return (
    <section className={`${className} w-full h-full`}>
      <Container>
        <h2 className="text-white text-2xl font-bold mb-4">Spending Section</h2>
        {/* Content for the Spending section goes here */}
      </Container>
    </section>
  );
}
