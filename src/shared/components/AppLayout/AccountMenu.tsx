import { Logout, FavoriteBorder } from "@mui/icons-material";
import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import { useAuthContext } from "@src/contexts/authContext";
import { FC } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/router";
import { ROUTES } from "@src/constants/routes";

const menuStyle = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1.5,
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: "background.paper",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
};

type Props = {
  accountMenuAnchorEl: null | HTMLElement;
  setAccountMenuAnchorEl: (value: null | HTMLElement) => void;
};

const AccountMenu: FC<Props> = ({
  accountMenuAnchorEl,
  setAccountMenuAnchorEl,
}) => {
  const router = useRouter();
  const { logout } = useAuthContext();
  const open = Boolean(accountMenuAnchorEl);

  const handleClose = () => {
    setAccountMenuAnchorEl(null);
  };

  const menuItems = [
    {
      name: "Profile",
      icon: AccountCircleIcon,
      onClick: () => {},
    },
    {
      name: "Favorites",
      icon: FavoriteBorder,
      onClick: () => router.push(ROUTES.viewFavorites),
    },

    {
      name: "Logout",
      icon: Logout,
      onClick: logout,
    },
  ];

  return (
    <Menu
      anchorEl={accountMenuAnchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: menuStyle,
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {menuItems.map((item, index) => (
        <MenuItem key={index} onClick={item.onClick}>
          <ListItemIcon>
            <item.icon fontSize="small" />
          </ListItemIcon>
          {item.name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default AccountMenu;
