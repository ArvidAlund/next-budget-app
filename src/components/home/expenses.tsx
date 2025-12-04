import ExpensesChart from "../charts/expensesChart";
import { Container } from "../ui/container";
import { useWindowWidth } from "../useWindowWidth";

interface SpendingProps {
  className?: string;
}

/**
 * Render a responsive "Dagliga kostnader" section that contains a heading and an expenses chart.
 *
 * @param className - Optional additional CSS class names applied to the outer section element
 * @returns The section element containing the heading and an ExpensesChart whose maximum height is 200 when the window width is greater than 1024 pixels and 100 otherwise
 */
export default function Expenses({ className }: SpendingProps) {
  const windowWidth = useWindowWidth();
  return (
    <section className={`${className} w-full h-full`}>
          <Container>
            <h3 className="text-white mb-4">Dagliga kostnader</h3>
            <ExpensesChart maxHeight={windowWidth > 1024 ? 200 : 100} />
          </Container>
    </section>
  )
}