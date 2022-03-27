import { Fragment, React, useState, useRef } from "react";
import {
  Grid,
  TextField,
  Paper,
  Card,
  CardMedia,
  Button,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import notAvailable from "../images/notAvailable.png";
import { useDrag } from "react-dnd";

const useStyles = makeStyles({
  movieSearch: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    paddingTop: "5%",
  },
  moviewrapper: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    padding: "7px",
    height: "250px",
    "& img": {
      height: "180px",
      width: "120px",
    },
  },
});

const MovieList = (props) => {
  const [name, setName] = useState("");
  let { movieSearch, list } = props;
  const classes = useStyles();

  const handleSearch = () => {
    movieSearch(name);
  };

  return (
    <Fragment>
      <Paper>
        <div className={classes.movieSearch}>
          <TextField
            placeholder="Enter a movie name"
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <Button
            variant="outlined"
            onClick={handleSearch}
            startIcon={<SearchOutlinedIcon />}
          >
            Search
          </Button>
        </div>
        <Grid container spacing={3} style={{ padding: "4%" }}>
          {list.map((item, i) => (
            <Image item={item ? item : []} key={i} />
          ))}
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default MovieList;

const Image = (props) => {
  let { item, key } = props;
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "image",
      item: item,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [item]
  );

  const classes = useStyles();
  return (
    <Grid item md={4} key={key}>
      <Card sx={{ maxWidth: 350 }} className={classes.moviewrapper}>
        <Tooltip title={item.Title}>
          <CardMedia
            ref={drag}
            component="img"
            width="50"
            image={item.Poster === "N/A" ? notAvailable : item.Poster}
            alt={item.Title}
          />
        </Tooltip>
      </Card>
    </Grid>
  );
};
