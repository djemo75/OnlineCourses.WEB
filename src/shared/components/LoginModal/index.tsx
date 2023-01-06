import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CloseRounded } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useAuthContext } from "@src/contexts/authContext";
import classNames from "classnames";
import { FC, ReactNode } from "react";
import styles from "./index.module.scss";

type Props = { visible: boolean; onClose: () => void };

type AuthenticationProvider = {
  name: string;
  value: string;
  icon: ReactNode;
  disabled: boolean;
};

const AUTHENTICATION_PROVIDERS_ENUM = {
  GOOGLE: "google",
  FACEBOOK: "facebook",
  EMAIL: "email",
};

const AUTHENTICATION_PROVIDERS: AuthenticationProvider[] = [
  {
    name: "Google",
    value: AUTHENTICATION_PROVIDERS_ENUM.GOOGLE,
    icon: <FontAwesomeIcon icon={faGoogle} />,
    disabled: false,
  },
  {
    name: "Facebook",
    value: AUTHENTICATION_PROVIDERS_ENUM.FACEBOOK,
    icon: <FontAwesomeIcon icon={faFacebook} />,
    disabled: true,
  },
  {
    name: "Email address",
    value: AUTHENTICATION_PROVIDERS_ENUM.EMAIL,
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    disabled: true,
  },
];

const LoginModal: FC<Props> = ({ visible, onClose }) => {
  const authContext = useAuthContext();

  const handleChooseProvider = (provider: AuthenticationProvider) => {
    switch (provider.value) {
      case AUTHENTICATION_PROVIDERS_ENUM.GOOGLE: {
        authContext.redirectToGoogleLogin();
      }
    }
  };

  return (
    <Dialog open={visible} onClose={onClose} fullWidth>
      <DialogTitle className={styles.title}>
        Login
        <IconButton className={styles.closeIcon} onClick={onClose}>
          <CloseRounded />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <DialogContentText className={styles.subline}>
          Get full access to the platform by logging in
        </DialogContentText>

        <DialogContentText className={styles.providersLabel}>
          Continue with...
        </DialogContentText>
        <Box className={styles.providersWrapper}>
          {AUTHENTICATION_PROVIDERS.map((provider, index) => (
            <Box
              key={index}
              className={classNames(styles.providerButton, {
                [styles.providerButtonDisabled]: provider.disabled,
              })}
              onClick={() => handleChooseProvider(provider)}
            >
              <Box className={styles.providerIcon}>{provider.icon}</Box>
              <Box className={styles.providerName}>{provider.name}</Box>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
