import { FC, ReactNode, useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AppLogo from "../AppLogo";
import { ROUTES } from "../../../constants/routes";
import { useRouter } from "next/router";
import { Avatar, Tooltip } from "@mui/material";
import LoginModal from "../LoginModal";
import { useAuthContext } from "@src/contexts/authContext";
import DrawerMobile from "./DrawerMobile";
import AccountMenu from "./AccountMenu";

type Props = {
  children?: ReactNode;
  noPadding?: boolean;
};

export const navItems = [
  {
    name: "Home",
    path: ROUTES.home,
    icon: <MenuIcon />,
  },
  {
    name: "Courses",
    path: ROUTES.courses,
    icon: <MenuIcon />,
  },
];

const AppLayout: FC<Props> = ({ children, noPadding }) => {
  const router = useRouter();
  const { userData } = useAuthContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavItemClick = (path: string) => {
    router.push(path);
  };

  const handleClickAccountMenu = (event: MouseEvent<HTMLElement>) => {
    setAccountMenuAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      <AppBar component="nav">
        <Toolbar>
          <AppLogo />
          <Box sx={{ ml: 2, display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                sx={{ color: "#fff" }}
                onClick={() => handleNavItemClick(item.path)}
              >
                {item.name}
              </Button>
            ))}
          </Box>
          <Box
            sx={{ marginLeft: "auto", display: { xs: "none", sm: "block" } }}
          >
            {userData ? (
              <>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClickAccountMenu}
                    size="small"
                    sx={{ ml: 2 }}
                  >
                    <Avatar
                      alt={userData.name}
                      src={userData.picture}
                      imgProps={{ referrerPolicy: "no-referrer" }}
                    />
                  </IconButton>
                </Tooltip>
                <AccountMenu
                  accountMenuAnchorEl={accountMenuAnchorEl}
                  setAccountMenuAnchorEl={setAccountMenuAnchorEl}
                />
              </>
            ) : (
              <Button
                sx={{ color: "#fff" }}
                onClick={() => setLoginModalVisible(true)}
              >
                Login
              </Button>
            )}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginLeft: "auto", display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <DrawerMobile
          open={mobileOpen}
          setOpen={setMobileOpen}
          showLoginModal={() => setLoginModalVisible(true)}
        />
      </Box>
      <Box padding={`2rem ${noPadding ? "0" : "2"}rem`}>
        <Toolbar />
        {children}
      </Box>
      <LoginModal
        visible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
      />
    </Box>
  );
};

export default AppLayout;
