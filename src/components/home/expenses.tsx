import { Container } from "../ui/container";


interface SpendingProps {
  className?: string;
}

export default function Expenses({ className }: SpendingProps) {
  return (
    <section className={`${className} w-full h-full`}>
          <Container>
            <h2 className="text-white text-2xl font-bold mb-4">Expenses Section</h2>
            {/* Content for the Expenses section goes here */}
          </Container>
    </section>
  )
}