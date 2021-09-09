import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Backdrop,
  CircularProgress,
  makeStyles,
  ThemeProvider,
  useTheme,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LockIcon from "@material-ui/icons/Lock";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";

import Input from "../Globals/Forms/Input";
import { sign_up, sign_in } from "../../redux/authReducer";
import { poppinsFont, ubuntuFont } from "../../theme/themes";
import { PillButton } from "../Globals/Buttons";

const initialState = {
  username: "",
  email: "",
  schoolId: "",
  password: "",
  confirmPassword: "",
};
const initialErrors = {
  username: "",
  email: "",
  schoolId: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const { status, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState(initialState);
  const [switchForm, setSwitchForm] = useState(false);
  const [errors, setErrors] = useState(initialErrors);

  const classes = useStyles({ switchForm });

  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = (e) => {
    if (e.target.name === "schoolId") {
      if (isNaN(e.target.value)) {
        e.target.value = e.target.value.replace(
          e.target.value.substr(e.target.value.length - 1),
          ""
        );
      } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSwitchForm = () => {
    setSwitchForm((prevState) => !prevState);
    setErrors(initialErrors);
    setFormData(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (switchForm) {
      if (formData.username === "") {
        setErrors({ ...errors, username: "Field required." });
      } else if (formData.email === "") {
        setErrors({ ...errors, email: "Field required." });
      } else if (formData.schoolId === "") {
        setErrors({ ...errors, schoolId: "Field required." });
      } else if (formData.password === "") {
        setErrors({ ...errors, password: "Field required." });
      } else if (formData.confirmPassword === "") {
        setErrors({ ...errors, confirmPassword: "Field required." });
      } else if (formData.password.length > 8) {
        setErrors({ ...errors, password: "Password must be 8 characters." });
      } else if (formData.password !== formData.confirmPassword) {
        setErrors({ ...errors, confirmPassword: "Password didn't match." });
      } else {
        dispatch(sign_up(formData));
        enqueueSnackbar(`Sign up successful`, { variant: "success" });
      }
    } else {
      if (formData.email === "") {
        setErrors({ ...errors, email: "Field required." });
      } else if (formData.password === "") {
        setErrors({ ...errors, password: "Field required." });
      } else {
        const data = { formData, history };
        dispatch(sign_in(data));
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("profile") !== null) {
      history.push("/forum");
    }
  }, [dispatch, history]);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.mainContainer}
    >
      <Container maxWidth="md" className={classes.formContainer}>
        <Grid container direction="row">
          <Grid
            item
            container
            direction="column"
            xs={12}
            md={6}
            justify="center"
            alignItems="center"
            className={classes.welcome}
          >
            <ThemeProvider theme={poppinsFont}>
              <Typography variant="h5" align="left" className={classes.h5}>
                Simple Blog
              </Typography>
            </ThemeProvider>
            <ThemeProvider theme={ubuntuFont}>
              <Typography variant="h2" className={classes.h2}>
                Welcome to the Forum
              </Typography>
            </ThemeProvider>
            <ThemeProvider theme={poppinsFont}>
              <Typography
                variant="body1"
                className={`${classes.pColorWhite} ${classes.paraghrap}`}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                rhoncus, convallis integer pulvinar eget nulla viverra quis.
                Quis leo a donec turpis non. Est, purus auctor viverra faucibus
                at nulla auctor eleifend odio.
              </Typography>
            </ThemeProvider>
            <ThemeProvider theme={ubuntuFont}>
              <PillButton
                text={switchForm ? "SIGN IN" : "SIGN UP"}
                bgColor={
                  !switchForm
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main
                }
                bgColorHover={
                  !switchForm
                    ? theme.palette.secondary.light
                    : theme.palette.primary.light
                }
                textColor={theme.palette.common.white}
                padding={theme.spacing(1.5, 7)}
                isFullWidth={false}
                eventHandler={handleSwitchForm}
                type="button"
              />
            </ThemeProvider>
          </Grid>
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            direction="column"
            xs={12}
            md={6}
            className={classes.form}
          >
            <ThemeProvider theme={ubuntuFont}>
              <Typography variant="h4" className={classes.h4}>
                {switchForm ? "Create Account" : "Sign in to Forum"}
              </Typography>
            </ThemeProvider>
            <ThemeProvider theme={poppinsFont}>
              <Typography
                variant="body1"
                className={`${classes.pColorBlack} ${classes.paraghrap}`}
              >
                {switchForm
                  ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  : "Lorem ipsum dolor sit amet."}
              </Typography>
            </ThemeProvider>
            {error.message !== undefined && (
              <Typography variant="body1" className={classes.paraghrapError}>
                {error.message}
              </Typography>
            )}
            <Backdrop
              open={status === "loading" ? true : false}
              style={{ zIndex: 5 }}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              {switchForm && (
                <Input
                  type={"text"}
                  label={"Username"}
                  name={"username"}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  value={formData.username}
                  iconAdorn={<AccountCircleIcon />}
                  switchForm={switchForm}
                />
              )}
              <Input
                type={"email"}
                label={"Email"}
                name={"email"}
                errors={errors}
                handleInputChange={handleInputChange}
                value={formData.email}
                iconAdorn={<AlternateEmailIcon />}
              />
              {switchForm && (
                <Input
                  type={"text"}
                  label={"Student ID"}
                  name={"schoolId"}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  value={formData.schoolId}
                  iconAdorn={<PermIdentityIcon />}
                />
              )}
              <Input
                type={"password"}
                label={"Password"}
                name={"password"}
                errors={errors}
                handleInputChange={handleInputChange}
                value={formData.password}
                iconAdorn={<LockIcon />}
              />
              {switchForm && (
                <Input
                  type={"password"}
                  label={"Confirm Password"}
                  name={"confirmPassword"}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  value={formData.confirmPassword}
                  iconAdorn={<LockIcon />}
                />
              )}
              <Box textAlign="center" paddingTop="30px">
                <PillButton
                  text={switchForm ? "CREATE" : "LOGIN"}
                  bgColor={
                    switchForm
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main
                  }
                  bgColorHover={
                    switchForm
                      ? theme.palette.secondary.light
                      : theme.palette.primary.light
                  }
                  textColor={theme.palette.common.white}
                  padding={theme.spacing(1.5, 7)}
                  isFullWidth={false}
                  eventHandler={null}
                  type="submit"
                />
              </Box>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    background: `url(${process.env.PUBLIC_URL}/assets/auth_bg.jpg)`,
    backgroundSize: "cover",
    minHeight: "100vh",
  },
  formContainer: {
    background: theme.palette.grey.A100,
    boxShadow: theme.shadows[1],
    borderRadius: "20px",
    padding: 0,
    margin: theme.spacing(4),
    overflow: "hidden",
  },
  welcome: {
    background: (props) =>
      props.switchForm
        ? `url(${process.env.PUBLIC_URL}/assets/bg_orange.jpg)`
        : `url(${process.env.PUBLIC_URL}/assets/bg_blue.jpg)`,
    padding: theme.spacing(3, 3, 16),
    textAlign: "center",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(10, 4),
    },
  },
  h5: {
    fontSize: "1rem",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.white,
    position: "absolute",
    top: theme.spacing(3),
    left: theme.spacing(3),
  },
  h2: {
    fontSize: "2.2rem",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.white,
    padding: theme.spacing(12, 10, 3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 10, 3),
    },
  },
  paraghrap: {
    fontSize: ".8rem",
    fontWeight: theme.typography.fontWeightRegular,
    padding: theme.spacing(0, 2, 4),
    lineHeight: "1.8",
  },
  pColorWhite: {
    color: theme.palette.common.white,
  },
  pColorBlack: {
    color: theme.palette.common.black,
  },
  paraghrapError: {
    color: theme.palette.error.main,
    fontSize: ".9rem",
    padding: "0px 20px 20px",
    fontWeight: theme.typography.fontWeightBold,
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: theme.typography.fontWeightBold,
    color: (props) =>
      props.switchForm
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
    paddingBottom: theme.spacing(1),
  },
  form: {
    padding: "50px 50px",
  },
}));

export default Auth;
