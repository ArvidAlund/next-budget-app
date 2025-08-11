import { Container } from "./ui/container"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
import { Key } from "lucide-react";

const months: { [key: number]: string } = {
  1: "Januari",
  2: "Februari",
  3: "Mars",
  4: "April",
  5: "Maj",
  6: "Juni",
  7: "Juli",
  8: "Augusti",
  9: "September",
  10: "Oktober",
  11: "November",
  12: "December"
};


function getWeekday(year: number, month: number): number {
  const date = new Date(year, month - 1, 1);
  return date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate(); // Ger sista dagen i månaden
}

function generateCalendarGrid(year: number, month: number): number[] {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getWeekday(year, month); // 0 = Sunday ... 6 = Saturday

  // Omvandla till måndag som första dag i veckan
  const adjustedStartIndex = (firstDayIndex + 6) % 7;

  // Lägg till föregående månadens dagar
  const prevMonthDays = [];
  if (adjustedStartIndex > 0) {
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
    for (let i = adjustedStartIndex - 1; i >= 0; i--) {
      prevMonthDays.push(daysInPrevMonth - i);
    }
  }

  // Lägg till aktuella månadens dagar
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Lägg till nästa månadens dagar för att fylla sista veckan
  const totalDays = prevMonthDays.length + currentMonthDays.length;
  const nextMonthDays = [];
  const extraDays = (7 - (totalDays % 7)) % 7; // 0 till 6 dagar

  for (let i = 1; i <= extraDays; i++) {
    nextMonthDays.push(i);
  }

  // Kombinera alla dagar
  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
}


export function Calander() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1); // 1–12
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const displayMonth = months[currentMonth];

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const days = generateCalendarGrid(currentYear, currentMonth);

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  return (
    <Container sizeClass="w-full h-fit">
      <Container sizeClass="w-full h-fit">
        <div className="w-100% flex flex-row justify-between items-center">
          <FontAwesomeIcon icon={faAngleLeft} onClick={handlePrevMonth} className="cursor-pointer" />
          <h1 className="text-center text-2xl font-bold">{displayMonth} {currentYear}</h1>
          <FontAwesomeIcon icon={faAngleRight} onClick={handleNextMonth} className="cursor-pointer" />
        </div>
      </Container>
      <div className="pt-4">
        <table className="w-full">
          <thead>
            <tr className="flex flex-row justify-evenly font-semibold">
              <th>Mån</th>
              <th>Tis</th>
              <th>Ons</th>
              <th>Tor</th>
              <th>Fre</th>
              <th>Lör</th>
              <th>Sön</th>
            </tr>
          </thead>
          <tbody>
            <tr className="grid grid-cols-7 text-center">
              {days.map((day, index) => {
                const isToday =
                    currentYear === today.getFullYear() &&
                    currentMonth === today.getMonth() + 1 &&
                    day === today.getDate();

                const isSelected = day === selectedDay;

                return (
                    <td
                    key={index}
                    onClick={() => {handleDayClick(day)}}
                    className={`aspect-square flex items-center justify-center rounded-xl ${
                        isToday ? "bg-accent font-extrabold" : ""}
                        ${isSelected ? "bg-secondary-100 text-primary font-bold" : ""}
                        `}
                    >
                    {day}
                    </td>
                );
                })}

            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
}
