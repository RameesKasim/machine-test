import { React, useEffect, useState } from "react";
import {
  Box,
  Link,
  Menu,
  IconButton,
  MenuItem,
  Grid,
  Paper,
} from "@mui/material";
import { auth } from "../firebase-config";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LoginandRegister from "../loginandregister";
import MovieList from "../movieList";
import WishList from "../whishList";

const useStyles = makeStyles({
  cardWrapper: {
    margin: "3% 0px",
    position: "relative",
  },
  wishlist: {
    position: "absolute !important",
    top: "3px",
    right: "8px",
    display: "flex",
    flexDirection: "column",
  },
  menu: {
    position: "absolute",
    top: "10px",
    right: "10%",
  },
});

const Home = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [listOFMovies, setMovieList] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const menuOpen = Boolean(menuAnchor);

  const setIsLoginValue = (value) => {
    setIsLogin(value);
  };

  useEffect(() => {
    axios
      .get(`//www.omdbapi.com/?s=superman&apikey=e3905d3c&`)
      .then((res) => {
        setMovieList(res.data.Search);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (value) => {
    axios
      .get(`//www.omdbapi.com/?s=${value}&apikey=e3905d3c&type=movie`)
      .then((res) => {
        setMovieList(res.data.Search);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = async () => {
    await signOut(auth);
    setIsLogin(false);
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const openMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  return (
    <Box className={classes.cardWrapper}>
      {isLogin && <LoginandRegister isLogin={setIsLoginValue} />}
      <div className={classes.menu}>
        {user ? (
          <div>
            <Menu
              id="basic-menu"
              anchorEl={menuAnchor}
              open={menuOpen}
              onClose={() => {
                setMenuAnchor(null);
              }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
            <IconButton size="small" color="primary" onClick={openMenu}>
              <PersonOutlineOutlinedIcon />
            </IconButton>
          </div>
        ) : (
          <Link
            href="#"
            onClick={() => {
              setIsLogin(true);
            }}
          >
            login
          </Link>
        )}
      </div>
      <Paper>
        <Grid container spacing={3} style={{ padding: "4%" }}>
          <Grid item md={6}>
            {listOFMovies.length > 0 && (
              <MovieList list={listOFMovies} movieSearch={handleSearch} />
            )}
          </Grid>
          <Grid item md={6}>
            <WishList />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Home;
