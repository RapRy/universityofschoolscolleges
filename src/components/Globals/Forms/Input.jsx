import React, { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Grid,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { poppinsFont } from "../../../theme/themes";

const Input = ({
  type,
  label,
  name,
  handleInputChange,
  errors,
  value,
  iconAdorn,
  switchForm,
}) => {
  const classes = useStyles();

  const [show, setShow] = useState(false);

  return (
    <div className={classes.rootContainer}>
      <Grid
        container
        spacing={1}
        alignItems="center"
        className={classes.rootGrid}
      >
        <Grid item xs={1} className={classes.startIcon}>
          {iconAdorn}
        </Grid>
        <Grid item xs={11}>
          <ThemeProvider theme={poppinsFont}>
            <TextField
              value={value}
              error={errors[name] === "" ? false : true}
              label={errors[name] === "" ? label : "Error"}
              variant="outlined"
              fullWidth
              type={name === "password" ? (show ? "text" : type) : type}
              name={name}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                  input: classes.input,
                },
                endAdornment:
                  name === "password" ? (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShow(!show)}>
                        {show ? (
                          <VisibilityOff
                            className={classes.colorIconInvisible}
                          />
                        ) : (
                          <Visibility
                            className={
                              switchForm
                                ? classes.colorIconOrange
                                : classes.colorIconBlue
                            }
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ) : null,
              }}
              InputLabelProps={{
                classes: {
                  root: classes.label,
                },
              }}
              onChange={handleInputChange}
            />
          </ThemeProvider>
        </Grid>
      </Grid>
      {errors[name] !== "" && (
        <ThemeProvider theme={poppinsFont}>
          <Typography variant="body1" className={classes.errorText}>
            {errors[name]}
          </Typography>
        </ThemeProvider>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    marginTop: theme.spacing(3),
    "&:first-child": {
      marginTop: theme.spacing(0),
    },
  },
  rootGrid: {
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.common.white,
    paddingLeft: theme.spacing(2),
    "& > .MuiGrid-item": {
      padding: 0,
    },
  },
  startIcon: {
    fontSize: ".8rem",
    color: theme.palette.common.black,
    position: "relative",
    zIndex: "2",
  },
  notchedOutline: {
    borderColor: "transparent !important",
  },
  input: {
    fontSize: ".8rem",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.black,
    background: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
  },
  label: {
    fontSize: ".8rem",
    color: theme.palette.common.black,
  },
  colorIconOrange: {
    color: theme.palette.secondary.main,
  },
  colorIconBlue: {
    color: theme.palette.primary.main,
  },
  colorIconInvisible: {
    color: theme.palette.grey.A200,
  },
  errorText: {
    color: theme.palette.error.main,
    fontSize: ".75rem",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

export default Input;
