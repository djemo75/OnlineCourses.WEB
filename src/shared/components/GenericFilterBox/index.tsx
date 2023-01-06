import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import styles from "./index.module.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FC, ReactNode, useEffect, useState } from "react";

type Props = { title: string; children: ReactNode; expandedOnMount?: boolean };

const GenericFilterBox: FC<Props> = ({ title, children, expandedOnMount }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expandedOnMount) setExpanded(true);
  }, [expandedOnMount]);

  const handleChange = () => setExpanded(!expanded);

  return (
    <Accordion
      className={styles.accordion}
      expanded={expanded}
      onChange={handleChange}
      disableGutters
    >
      <AccordionSummary
        className={styles.accordionSummary}
        expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
      >
        <Typography className={styles.title}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={styles.accordionDetails}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default GenericFilterBox;
