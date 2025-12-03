import { Container } from "../ui/container";


interface SpendingProps {
  className?: string;
}

export default function Summary({ className }: SpendingProps) {
  return (
    <section className={`${className} w-full h-full`}>
          <Container>
            <h2 className="text-white text-2xl font-bold mb-4">Summary Section</h2>
            {/* Content for the Spending section goes here */}
          </Container>
    </section>
  )
}