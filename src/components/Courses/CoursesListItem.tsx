import { Box, Rating } from "@mui/material";
import styles from "./CoursesListItem.module.scss";
import Image from "next/image";
import { CourseResponse } from "../../shared/api/types/course";
import React, { FC } from "react";
import { useRouter } from "next/router";
import { ROUTES } from "@src/constants/routes";
import { FavoriteItemType } from "@src/shared/api/types/favorite";
import FavoriteButton from "@src/shared/components/FavoriteButton";

type Props = {
  course: CourseResponse;
  changeFavoriteCourse: (courseId: string, favoriteValue: boolean) => void;
};

const CoursesListItem: FC<Props> = ({ course, changeFavoriteCourse }) => {
  const router = useRouter();

  const handleViewCourse = () => {
    router.push(ROUTES.viewCourse.replace(":id", course.id));
  };

  return (
    <Box className={styles.root} onClick={handleViewCourse}>
      <Box className={styles.imageContainer}>
        <Image
          src={course.image.fileUrl}
          className={styles.image}
          alt="cover"
          width="100%"
          height="100%"
          objectFit="cover"
          quality={100}
          priority
        />
        <Box className={styles.favoriteButton}>
          <FavoriteButton
            isFavorite={course.favorite}
            itemId={course.id}
            itemType={FavoriteItemType.COURSE}
            onAddFavorite={() => changeFavoriteCourse(course.id, true)}
            onRemoveFavorite={() => changeFavoriteCourse(course.id, false)}
            noBorder
          />
        </Box>
      </Box>
      <Box className={styles.title}>{course.title}</Box>
      <Box className={styles.tags}>{course.tags.join(", ")}</Box>
      <Box className={styles.rating}>
        <Rating name="read-only" value={course.averageRating} readOnly />
      </Box>
    </Box>
  );
};

export default CoursesListItem;
