import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { FC, ReactNode, SyntheticEvent, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";

type TabPanelProps = {
  children?: ReactNode;
  index: number;
  value: number;
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

type CustomTabsProp = {
  tabs: { label: string; content: ReactNode }[];
  className?: string;
};

const CustomTabs: FC<CustomTabsProp> = ({ tabs, className }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className={className} sx={{ width: "100%" }}>
      <Box mb={2}>
        <Tabs
          value={value}
          onChange={handleChange}
          className={styles.tabLabels}
        >
          {tabs.map((tab, index) => (
            <Tab label={tab.label} key={index} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel value={value} index={index} key={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

export default CustomTabs;
