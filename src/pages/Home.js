import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import { fetchWrapper } from "helper";
import { makeStyles } from "@material-ui/core/styles";
import { useApp } from "hooks";
import Chip from "@material-ui/core/Chip";
import { Tabs } from "components";

const useStyles = makeStyles((theme) => ({
  headers: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chip: {
    marginRight: 20,
  },
  title: {
    fontSize: 24,
  },
}));

const Home = () => {
  const classes = useStyles();
  const { setLoading, setRepoData, repoData } = useApp();

  useEffect(() => {
    setLoading(true);
    fetchWrapper
      .get(process.env.REACT_APP_REPO_DETAILS)
      .then((data) => {
        setRepoData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (!repoData) return null;

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.headers}>
          <h1 className={classes.title}>{repoData?.full_name}</h1>
          <div className={classes.info}>
            <Chip
              label={`Watch: ${repoData?.watchers}`}
              className={classes.chip}
            />
            <Chip
              label={`Star: ${repoData?.stargazers_count}`}
              className={classes.chip}
            />
            <Chip label={`Forks: ${repoData?.forks}`} />
          </div>
        </div>
        <Tabs />
      </div>
    </Container>
  );
};

export default Home;
