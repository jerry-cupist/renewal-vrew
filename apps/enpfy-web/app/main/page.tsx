import { Header } from "@vrew/ui";
import { calculateDDay } from "../../utils/dayUtil";

export default function Page(): JSX.Element {
  const dDay = calculateDDay("2023-09-01T00:00:00", "2023-09-15T00:00:00");

  return (
    <>
      <Header text="MAIN" />
      <h2>main</h2>
      <p>{dDay}</p>
    </>
  );
}
