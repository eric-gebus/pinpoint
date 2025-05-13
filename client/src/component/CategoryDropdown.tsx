import { useState } from "react";
import { Category } from "../App";

interface CategoryDropdownProps {
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category>>;
  setDropDownCategory: (string: string) => void,
  dropDownCategory: string,
}

function CategoryDropdown({ setSelectedCategory, setDropDownCategory, dropDownCategory }: CategoryDropdownProps) {

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  function onSelectClick() {
    setMenuOpen(!menuOpen);
  }

  function onEventsClick() {
    setMenuOpen(false);
    setSelectedCategory(Category.Events);
    setDropDownCategory('Events')
  }

  function onRestaurantsClick() {
    setMenuOpen(false);
    setSelectedCategory(Category.Restaurants);
    setDropDownCategory('Restaurants')
  }

  return (
    <div className="rounded-[16px] border-2 border-[#c7c3b6] bg-white p-2 mt-5 w-fit">
      <button onClick={onSelectClick}>
        {dropDownCategory} &#9660;
      </button>
      {menuOpen && (
        <div className="flex flex-col">
          <button className="cursor-pointer m-3" onClick={onEventsClick}>Events</button>
          <button className="cursor-pointer m-3" onClick={onRestaurantsClick}>Restaurants</button>
        </div>
      )}
    </div>
  );

}

export default CategoryDropdown;