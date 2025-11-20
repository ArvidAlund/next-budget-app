import { faHouse, faBowlFood, faCarSide, faBriefcase, faGlobe, faDumbbell, faCartShopping, faGamepad, faMoneyBills, faCircleQuestion, IconDefinition } from "@fortawesome/free-solid-svg-icons";


const iconMap: Record<string, IconDefinition> = {
  faHouse: faHouse,
  faBowlFood: faBowlFood,
  faCarSide: faCarSide,
  faBriefcase: faBriefcase,
  faGlobe: faGlobe,
  faDumbbell: faDumbbell,
  faCartShopping: faCartShopping,
  faGamepad: faGamepad,
  faMoneyBills: faMoneyBills,
  faCircleQuestion: faCircleQuestion,
};
export function getIcon(iconName: string): IconDefinition {
  return iconMap[iconName] || faCircleQuestion;
}