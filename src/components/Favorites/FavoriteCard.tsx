import { Grid, IconButton, Rating, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { RatingValue } from "@src/shared/api/types/rating";
import { FC } from "react";
import Image from "next/image";
import styles from "./FavoriteCard.module.scss";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  imageUrl?: string;
  name: string;
  averageRating: RatingValue;
  onClickView: () => void;
  onClickRemove: () => void;
};

const FavoriteCard: FC<Props> = ({
  imageUrl,
  name,
  averageRating,
  onClickView,
  onClickRemove,
}) => {
  return (
    <Box className={styles.root}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12} sm={7}>
          <Box className={styles.firstColumn}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                className={styles.image}
                alt="cover"
                width="50px"
                height="50px"
                layout="fixed"
                objectFit="cover"
                quality={100}
                priority
              />
            ) : (
              <Box className={styles.imagePlaceholder}>
                <CastForEducationIcon />
              </Box>
            )}
            <Box className={styles.name} onClick={onClickView}>
              {name}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8} sm={4}>
          <Box className={styles.rating}>
            <Rating
              name="read-only"
              value={averageRating}
              icon={<StarRoundedIcon fontSize="inherit" />}
              emptyIcon={<StarOutlineRoundedIcon fontSize="inherit" />}
              size="large"
              readOnly
            />
          </Box>
        </Grid>
        <Grid item xs={4} sm={1}>
          <Box className={styles.actions}>
            <Tooltip title="Remove from favorite list" placement="top">
              <IconButton
                className={styles.removeFavoriteButton}
                onClick={onClickRemove}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FavoriteCard;
