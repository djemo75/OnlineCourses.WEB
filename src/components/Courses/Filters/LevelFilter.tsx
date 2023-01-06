import { FormControlLabel, Checkbox, FormGroup } from "@mui/material";
import React, { ChangeEvent, FC } from "react";

type Props = {
  onChange: (values: string[]) => void;
  values: string[];
};

const OPTIONS = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Expert", label: "Expert" },
];

const RatingFilter: FC<Props> = ({ values, onChange }) => {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const newValue = event.target.value;
    if (values.includes(newValue)) {
      onChange(values.filter((value) => value !== newValue));
    } else {
      onChange([...values, newValue]);
    }
  };

  return (
    <FormGroup>
      {OPTIONS.map((option) => (
        <FormControlLabel
          key={option.value}
          control={
            <Checkbox
              checked={values.includes(option.value)}
              onChange={handleChange}
              value={option.value}
            />
          }
          label={option.label}
        />
      ))}
    </FormGroup>
  );
};

export default RatingFilter;
