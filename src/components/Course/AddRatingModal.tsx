import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import styles from "./AddRatingModal.module.scss";
import { OnlineCoursesClient } from "@src/shared/api/services/onlineCourses";
import { useAuthContext } from "@src/contexts/authContext";
import { useCoursePageContext } from "@src/contexts/coursePageContext";
import { toast } from "react-toastify";

type Props = { visible: boolean; onClose: () => void };

const AddRatingModal: FC<Props> = ({ visible, onClose }) => {
  const { course, fetchRatingStatistic, fetchRatings } = useCoursePageContext();
  const [value, setValue] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!visible) {
      setValue(null);
      setComment("");
    }
  }, [visible]);

  const handleSubmit = async () => {
    try {
      const client = new OnlineCoursesClient();
      await client.addRating(course.id, "course", value!, comment);
      await Promise.all([fetchRatingStatistic(), fetchRatings()]);
      toast.success("You have successfully added rating");
      onClose();
    } catch (error) {
      toast.error("An error occurred while adding review");
    }
  };

  return (
    <Dialog open={visible} onClose={onClose} fullWidth>
      <DialogTitle className={styles.title}>Write a review</DialogTitle>
      <DialogContent>
        <DialogContentText className={styles.text}>
          Your feedback is important to us!
        </DialogContentText>
        <Box className={styles.ratingField}>
          <Rating
            value={value}
            icon={<StarRoundedIcon fontSize="inherit" />}
            emptyIcon={<StarOutlineRoundedIcon fontSize="inherit" />}
            size="large"
            onChange={(e, newValue) => setValue(newValue)}
          />
        </Box>
        <Box className={styles.commentField}>
          <TextField
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            multiline
            fullWidth
            required
          />
        </Box>

        <DialogActions className={styles.acitons}>
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!value || !comment}
          >
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddRatingModal;
