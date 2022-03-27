import { React, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Tooltip,
  Paper,
  CardHeader,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import notAvailable from "../images/notAvailable.png";
import { useDrop } from "react-dnd";
import { useSnackbar } from "notistack";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const useStyles = makeStyles({
  moviewrapper: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    padding: "7px",
    height: "250px",
    "& img": {
      height: "180px",
      width: "110px",
    },
  },
  movieSearch: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    paddingTop: "5%",
  },
  listTitle: {
    paddingTop: "5%",
    textAlign: "center",
    paddingBottom: "7%",
  },
  CardIcon: {
    position: "absolute",
    top: "-5%",
    right: "-4%",
  },
});

const WishList = (props) => {
  const classes = useStyles();
  const [wishList, setWishList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "image",
      drop: (item) => {
        checkMovieList(item);
      },
    }),
    [wishList]
  );

  const removeWhishList = (removeItem) => {
    let list = wishList.filter((item) => item !== removeItem);
    setWishList(list);
    handleSnackBar("Movie deleted from list", "warning");
  };

  const checkMovieList = (item) => {
    let list = [].concat(item);
    wishList.indexOf(item) < 0 ? addMovietoList(list) : movieAlredyExist();
  };

  const movieAlredyExist = () => {
    handleSnackBar("Movie already exist", "warning");
  };

  const addMovietoList = (list) => {
    setWishList((wishList) => [...wishList, list[0]]);
    handleSnackBar("Movie added", "success");
  };

  const handleSnackBar = (message, variant) => {
    enqueueSnackbar(message, { variant: variant });
  };

  return (
    <Paper ref={drop}>
      <div className={classes.listTitle}>WISH LIST</div>
      <Grid container spacing={3} style={{ padding: "4%" }}>
        {wishList.map((item, i) => (
          <Grid item md={4} key={i}>
            <Card sx={{ maxWidth: 350 }} className={classes.moviewrapper}>
              <CardHeader
                className={classes.CardIcon}
                action={
                  <IconButton
                    aria-label="settings"
                    onClick={() => {
                      removeWhishList(item);
                    }}
                  >
                    <CloseRoundedIcon />
                  </IconButton>
                }
              />
              <Tooltip title={item.Title}>
                <CardMedia
                  component="img"
                  width="50"
                  image={item.Poster === "N/A" ? notAvailable : item.Poster}
                  alt={item.Title}
                />
              </Tooltip>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default WishList;
