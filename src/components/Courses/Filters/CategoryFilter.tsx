import { Box, Skeleton } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import styles from "./CategoryFilter.module.scss";
import classNames from "classnames";
import axios from "axios";
import { PaginationResponse } from "../../../shared/api/types/pagination";
import { CategoryResponse } from "../../../shared/api/types/category";
import { toast } from "react-toastify";

type Props = {
  onChange: (value: string) => void;
  value: string;
};

export const DEFAULT_CATEGORY = { id: "", name: "All categories" };

const CategoryFilter: FC<Props> = (props) => {
  const [value, setValue] = useState(DEFAULT_CATEGORY.id);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<PaginationResponse<CategoryResponse>>(
        "/api/category"
      );
      setCategories(response.data.items);
    } catch (error) {
      toast.error("An error occurred while fetching categories");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    props.onChange(value);
  }, [value]); // eslint-disable-line

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  if (loading) {
    return <Skeleton height={60} />;
  }

  return (
    <Box>
      {[DEFAULT_CATEGORY, ...categories].map((category) => (
        <Box
          key={category.id}
          className={classNames(styles.item, {
            [styles.activeItem]: value === category.id,
          })}
          onClick={() => setValue(category.id)}
        >
          {category.name}
        </Box>
      ))}
    </Box>
  );
};

export default CategoryFilter;
