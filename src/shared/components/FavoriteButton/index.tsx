import React, { FC, useState } from "react";
import { useAuthContext } from "@src/contexts/authContext";
import { Favorite } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import classNames from "classnames";
import { IconButton, Tooltip } from "@mui/material";
import styles from "./index.module.scss";
import { OnlineCoursesClient } from "@src/shared/api/services/onlineCourses";
import { FavoriteItemType } from "@src/shared/api/types/favorite";
import { toast } from "react-toastify";

type Props = {
  isFavorite: boolean;
  onAddFavorite?: (itemId: string) => void;
  onRemoveFavorite?: (itemId: string) => void;
  itemId: string;
  itemType: FavoriteItemType;
  size?: "small" | "normal" | "large";
  noBorder?: boolean;
};

const FavoriteButton: FC<Props> = ({
  isFavorite,
  itemId,
  itemType,
  size = "normal",
  noBorder = false,
  onAddFavorite,
  onRemoveFavorite,
}) => {
  const { userData } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleClickFavorite = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    if (!userData) return;
    const client = new OnlineCoursesClient();
    setLoading(true);
    if (isFavorite) {
      try {
        await client.removeFavorite(itemId);
        if (onRemoveFavorite) onRemoveFavorite(itemId);
      } catch (error) {
        toast.error("An error occurred while removing from favorite list");
      }
    } else {
      try {
        await client.addFavorite(itemId, itemType);
        if (onAddFavorite) onAddFavorite(itemId);
      } catch (error) {
        toast.error("An error occurred while adding to favorite list");
      }
    }
    setLoading(false);
  };

  const getTooltipText = () => {
    if (!userData) return "Please Login to add to favorites list!";

    return isFavorite ? "Remove from favorites list" : "Add to favorites list";
  };

  const getPadding = () => {
    if (size === "small") {
      return "0.35rem";
    } else if (size === "normal") {
      return "0.5rem";
    } else if (size === "large") {
      return "1rem";
    }
  };

  return (
    <Tooltip title={getTooltipText()} placement="top">
      <IconButton
        className={classNames(styles.favoriteButton, {
          [styles.active]: isFavorite,
          [styles.disabled]: !userData,
        })}
        onClick={handleClickFavorite}
        disabled={loading}
        sx={{
          padding: getPadding(),
          border: `${noBorder ? "none" : "1px solid #ededed"}`,
        }}
      >
        {isFavorite ? <Favorite /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default FavoriteButton;
