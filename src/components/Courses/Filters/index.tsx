import { Box, Typography, Button } from "@mui/material";
import { FC } from "react";
import GenericFilterBox from "../../../shared/components/GenericFilterBox";
import CategoryFilter, { DEFAULT_CATEGORY } from "./CategoryFilter";
import LevelFilter from "./LevelFilter";
import styles from "./index.module.scss";

type Props = {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
};

export type FiltersType = {
  category: string;
  level: string[];
};

export const DEFAULT_FILTERS = {
  category: DEFAULT_CATEGORY.id,
  level: [],
};

const Filters: FC<Props> = ({ filters, onChange }) => {
  const handleChangeCategory = (category: string) => {
    onChange({ ...filters, category });
  };

  const handleChangeLevel = (level: string[]) => {
    onChange({ ...filters, level });
  };

  const handleResetFilter = () => onChange(DEFAULT_FILTERS);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Filter Option
      </Typography>
      <Box mt={3.5} mb={2}>
        <GenericFilterBox title="Select Category" expandedOnMount>
          <CategoryFilter
            onChange={handleChangeCategory}
            value={filters.category}
          />
        </GenericFilterBox>
      </Box>
      <Box mb={2}>
        <GenericFilterBox title="Select level">
          <LevelFilter onChange={handleChangeLevel} values={filters.level} />
        </GenericFilterBox>
      </Box>
      <Box mb={2}>
        <Button
          variant="outlined"
          size="large"
          onClick={handleResetFilter}
          className={styles.resetButton}
        >
          Reset Filter
        </Button>
      </Box>
    </>
  );
};

export default Filters;
