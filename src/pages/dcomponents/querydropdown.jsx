import { React, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function SelectionQueryDropdown({ options, onChange }) {
  const [selectedOption, setSelectedOption] = useState("Select Query Option"); // Default to the first option

  const handleSelection = (option) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="faded" color="Warning">
          {selectedOption}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {options.map((option) => (
          <DropdownItem key={option} onClick={() => handleSelection(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
