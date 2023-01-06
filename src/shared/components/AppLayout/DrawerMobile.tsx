import { FC, Fragment, ReactNode } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import AppLogo from "../AppLogo";
import { useRouter } from "next/router";
import { Avatar, ListItemIcon } from "@mui/material";
import { useAuthContext } from "@src/contexts/authContext";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { navItems } from ".";
import styles from "./DrawerMobile.module.scss";
import { FavoriteBorder } from "@mui/icons-material";
import { ROUTES } from "@src/constants/routes";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  showLoginModal: () => void;
};

const drawerWidth = 240;

const DrawerMobile: FC<Props> = ({ open, setOpen, showLoginModal }) => {
  const { userData, logout } = useAuthContext();
  const router = useRouter();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleNavItemClick = (path: string) => {
    router.push(path);
  };

  const renderListItem = (
    onClick: () => void,
    icon: ReactNode,
    name: string
  ) => {
    return (
      <ListItem disablePadding>
        <ListItemButton onClick={onClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
        <Box className={styles.logoWrapper}>
          <AppLogo />
        </Box>
        <Box className={styles.userInfo}>
          {userData ? (
            <>
              <Avatar
                alt={userData.name}
                src={userData.picture}
                className={styles.userAvatar}
              />
              <Box className={styles.userName}>{userData.name}</Box>
            </>
          ) : (
            <Button
              className={styles.loginButton}
              onClick={showLoginModal}
              variant="outlined"
            >
              Login
            </Button>
          )}
        </Box>
        <Divider />
        <List>
          {navItems.map((item, index) => (
            <Fragment key={index}>
              {renderListItem(
                () => handleNavItemClick(item.path),
                item.icon,
                item.name
              )}
            </Fragment>
          ))}
          {renderListItem(
            () => handleNavItemClick(ROUTES.viewFavorites),
            <FavoriteBorder />,
            "Favorites"
          )}
          {renderListItem(logout, <ExitToAppIcon />, "Logout")}
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerMobile;
