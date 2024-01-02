import { React, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function SelectionMutationDropdown({
  mutationOptions,
  onChange,
}) {
  const [selectedOption, setSelectedOption] = useState(
    "Select Mutation Option"
  ); // Default to the first option

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
        {mutationOptions.map((option) => (
          <DropdownItem key={option} onClick={() => handleSelection(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
