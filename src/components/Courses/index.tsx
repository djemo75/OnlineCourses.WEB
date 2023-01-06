import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CourseResponse } from "../../shared/api/types/course";
import { PaginationResponse } from "../../shared/api/types/pagination";
import CustomPagination from "../../shared/components/CustomPagination";
import Filters, { DEFAULT_FILTERS, FiltersType } from "./Filters";
import CoursesList from "./CoursesList";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 12;

const Courses = () => {
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCourses, setTotalCourses] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState<FiltersType>(DEFAULT_FILTERS);

  const loadCourses = async () => {
    setLoading(true);
    const params = {
      categoryId: filters?.category || null,
      level: filters?.level.filter((l) => l),
      pageNumber: pageNumber,
      pageSize: ITEMS_PER_PAGE,
    };

    try {
      const response = await axios.get<PaginationResponse<CourseResponse>>(
        "/api/course",
        {
          params,
        }
      );
      setCourses(response.data.items);
      setTotalCourses(response.data.total);
    } catch (error) {
      toast.error("An error occurred while fetching courses");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCourses();
  }, [pageNumber, filters.category, filters.level.length]); // eslint-disable-line

  const handleChangeFilter = (value: FiltersType) => {
    setPageNumber(1);
    setFilters(value);
  };

  const changeFavoriteCourse = (courseId: string, favoriteValue: boolean) => {
    const updatedCourses = courses.map((course) =>
      course.id === courseId ? { ...course, favorite: favoriteValue } : course
    );
    setCourses(updatedCourses);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={4} md={3}>
        <Filters filters={filters} onChange={handleChangeFilter} />
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <CoursesList
          loading={loading}
          courses={courses}
          total={totalCourses}
          changeFavoriteCourse={changeFavoriteCourse}
        />
        <CustomPagination
          pageNumber={pageNumber}
          pageSize={ITEMS_PER_PAGE}
          totalItems={totalCourses}
          onChange={setPageNumber}
        />
      </Grid>
    </Grid>
  );
};

export default Courses;
