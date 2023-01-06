import { Box, Pagination } from "@mui/material";
import usePagination, { UsePaginationItem } from "@mui/material/usePagination";
import classNames from "classnames";
import { FC } from "react";
import styles from "./index.module.scss";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
type Props = {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  onChange: (pageNumber: number) => void;
  noGutter?: boolean;
};

const CustomPagination: FC<Props> = ({
  pageNumber,
  pageSize,
  totalItems,
  onChange,
  noGutter,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onChange(value);
  };

  const totalPages = Math.ceil(totalItems / pageSize);

  const { items } = usePagination({
    count: totalPages,
    page: pageNumber,
    onChange: handleChange,
    boundaryCount: 0,
  });

  const pageNumbersItems = items.filter((item) => item.type === "page");
  const [previousButtonItem, nextButtonItem] = items.filter(
    (item) => item.type === "previous" || item.type === "next"
  );

  const renderItem = (
    { page, type, selected, ...item }: UsePaginationItem,
    index?: number
  ) => {
    let children = null;

    if (type === "start-ellipsis" || type === "end-ellipsis") {
      children = null;
    } else if (type === "page") {
      children = (
        <button
          type="button"
          className={classNames(styles.pageItem, {
            [styles.selectedPage]: selected,
          })}
          {...item}
        >
          {page}
        </button>
      );
    } else {
      children = (
        <button
          type="button"
          className={classNames({
            [styles.previousButton]: type === "previous",
            [styles.nextButton]: type === "next",
          })}
          {...item}
        >
          {type === "previous" && (
            <NavigateBeforeIcon className={styles.previousButtonIcon} />
          )}
          {type}
          {type === "next" && (
            <NavigateNextIcon className={styles.nextButtonIcon} />
          )}
        </button>
      );
    }

    return <Box key={index}>{children}</Box>;
  };

  return (
    <Box className={styles.root} mt={noGutter ? 0 : 2}>
      <Box className={styles.paginationInfo}>
        Showing{" "}
        {totalItems < pageNumber * pageSize
          ? totalItems
          : pageNumber * pageSize}{" "}
        from {totalItems} data
      </Box>
      <Box className={styles.rootItems}>
        {renderItem(previousButtonItem)}
        <Box className={styles.pageNumbers}>
          {pageNumbersItems.map(renderItem)}
        </Box>
        {renderItem(nextButtonItem)}
      </Box>
    </Box>
  );
};

export default CustomPagination;
