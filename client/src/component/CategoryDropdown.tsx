import { useState } from "react";
import { Category } from "../App";

interface CategoryDropdownProps {
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category>>
}

function CategoryDropdown({ setSelectedCategory }: CategoryDropdownProps) {

  const [menuOpen, setMenuOpen] = useState(false);

  function onSelectClick() {
    setMenuOpen(!menuOpen);
  }

  function onEventsClick() {
    setMenuOpen(false);
    setSelectedCategory(Category.Events);
  }

  function onRestaurantsClick() {
    setMenuOpen(false);
    setSelectedCategory(Category.Restaurants);
  }

  return (
    <div className="rounded-[16px] bg-white p-2 mt-5 w-fit">
      <button onClick={onSelectClick}>
        Select a Category &#9660;
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