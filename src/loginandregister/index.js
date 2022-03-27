import { React, useState } from "react";
import {
  Box,
  Modal,
  Paper,
  FormControl,
  TextField,
  FormHelperText,
  Button,
  Link,
} from "@mui/material";

import { auth } from "../firebase-config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { makeStyles } from "@mui/styles";
import * as Yup from "yup";

const useStyles = makeStyles({
  modelWrapper: {
    position: "absolute",
    padding: "5% 5% 0% 5%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    marginBottom: "10px !important",
  },
  signIN: {
    padding: "15% 0%",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
});

const LoginandRegister = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [password, setPassword] = useState("");
  const [validationStatus, setValidationStatus] = useState("");
  const [error, setError] = useState(false);

  const validation = Yup.object().shape({
    email: Yup.string()
      .required("Email  required")
      .email("Enter a valid email address"),
    password: Yup.string()
      .required("Password required")
      .test(
        "len",
        "Password must  be more than 6  characters",
        (val) => val.length >= 6
      ),
  });

  const handleValidation = () => {
    validation
      .validate({ email: email, password: password })
      .then(() => {
        setValidationStatus({
          status: "success",
        });
        setError(false);
      })
      .catch((error) => {
        setValidationStatus({ status: "error", message: error.message });
        setError(true);
      });
  };

  const loginuser = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      setIsLogin(false);
    } catch (error) {
      setError(true);
      setValidationStatus({
        status: "error",
        message: error.code.replace("auth/", ""),
      });
    }
  };

  const registerUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      setIsRegister(false);
    } catch (error) {
      setError(true);
      setValidationStatus({
        status: "error",
        message: error.code.replace("auth/", ""),
      });
    }
  };

  return (
    <Box className="cardWrapper">
      {isLogin ? (
        <Modal
          open={isLogin}
          onClose={() => {
            setIsLogin(false);
            props.isLogin(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper className={classes.modelWrapper}>
            <FormControl sx={{ m: 3 }} error={error} variant="standard">
              <TextField
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className={classes.textField}
              ></TextField>
              <TextField
                placeholder="password"
                className={classes.textField}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></TextField>
              <FormHelperText>{validationStatus.message}</FormHelperText>
              <div className={classes.signIN}>
                <Link
                  href="#"
                  onClick={() => {
                    setIsLogin(false);
                    setIsRegister(true);
                  }}
                >
                  New User Register
                </Link>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setError(false);
                    handleValidation();
                    if (!error) {
                      loginuser();
                    }
                  }}
                >
                  Login
                </Button>
              </div>
            </FormControl>
          </Paper>
        </Modal>
      ) : (
        <Modal
          open={isRegister}
          onClose={() => {
            setIsRegister(false);
            props.isLogin(false);

          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper className={classes.modelWrapper}>
            <FormControl sx={{ m: 3 }} error={error} variant="standard">
              <TextField
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className={classes.textField}
              ></TextField>
              <TextField
                placeholder="password"
                className={classes.textField}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></TextField>
              <FormHelperText>{validationStatus.message}</FormHelperText>
              <div
                className={classes.signIN}
                style={{ justifyContent: "center" }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleValidation();
                    if (!error) {
                      registerUser();
                    }
                  }}
                >
                  Register
                </Button>
              </div>
            </FormControl>
          </Paper>
        </Modal>
      )}
    </Box>
  );
};

export default LoginandRegister;
