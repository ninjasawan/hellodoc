import React, { useEffect, useState } from "react";
import { useApp } from "hooks";
import { fetchWrapper } from "helper";
import Pagination from "@material-ui/lab/Pagination";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  issues: {
    padding: 0,
    margin: 0,
    listStyle: "none",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    display: "block",
    borderBottom: "1px solid #ddd",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
  },
  chip: {
    marginRight: 20,
    marginBottom: 20,
  },
}));

const IssueList = ({ issue }) => {
  const classes = useStyles();
  const renderLabels = (issue.labels || []).map((label, index) => (
    <Chip
      label={label.name}
      styles={{ backgroundColor: label.color }}
      className={classes.chip}
      key={`label-${index}`}
    />
  ));

  return (
    <Link to={`/issues/${issue.number}`} className={classes.link}>
      <div>
        <div>
          <h3 className={classes.title}>{issue.title}</h3>
          {renderLabels}
        </div>
      </div>
    </Link>
  );
};

const Issues = () => {
  const [search, setSearch] = useState("");
  const [label, setLabel] = useState("");
  const classes = useStyles();
  const {
    setLoading,
    currentPage,
    setCurrentPage,
    setIssueData,
    issueData,
  } = useApp();

  useEffect(() => {
    setLoading(true);
    const url = `${process.env.REACT_APP_ISSUES}?q=repo:angular/angular/node+type:issue+state:open&per_page=10&page=${currentPage}`;
    fetchWrapper
      .get(url)
      .then((data) => {
        setIssueData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [currentPage]);

  if (!issueData) return null;

  const calculateTotalPages = () => {
    if (issueData.total_count % 10 === 0) return issueData.total_count / 10;
    else return parseInt(issueData.total_count / 10) + 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    const url = `${process.env.REACT_APP_ISSUES}?q=repo:angular/angular/node+type:issue+state:open+${search}&per_page=10&page=${currentPage}`;
    fetchWrapper
      .get(url)
      .then((data) => {
        console.log(data);
        setIssueData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    const label = event.target.value;
    setLabel(label);
    setLoading(true);

    const url = `${process.env.REACT_APP_ISSUES}?q=repo:angular/angular/node+type:issue+state:open+label:${label}&per_page=10&page=${currentPage}`;
    fetchWrapper
      .get(url)
      .then((data) => {
        console.log(data);
        setIssueData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const renderIssues = () => {
    return (issueData.items || []).map((item, i) => (
      <li key={`list-${i}`}>
        <IssueList issue={item} />
      </li>
    ));
  };

  const renderStatus = () => {
    if (issueData.items && issueData.items.length > 0) {
      const { closed_issues, open_issues } = issueData.items[0].milestone;

      return (
        <>
          <span className={classes.status}>{open_issues} Open</span>
          <span className={classes.status}>{closed_issues} Closed</span>
        </>
      );
    }
    return null;
  };

  const renderEnptyResult = () => {
    if (issueData.items && issueData.items.length === 0) {
      return <p>No result found</p>;
    }
    return null;
  };

  const renderLabels = () => {
    return (
      <FormControl
        className={classes.formControl}
        variant="outlined"
        fullWidth={true}
        style={{ marginTop: 20 }}
      >
        <InputLabel id="demo-simple-select-label">Labels</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={label}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          size="small"
          fullWidth
          label="Search: Open Issue"
          placeholder="Search: Open Issue"
          variant="outlined"
        />
      </form>
      <div>
        {renderStatus()}
        {renderLabels()}
      </div>
      {renderEnptyResult()}
      <ul className={classes.issues}>{renderIssues()}</ul>
      {issueData.items && issueData.items.length > 0 && (
        <Pagination
          count={calculateTotalPages()}
          page={currentPage}
          onChange={(event, value) => {
            setCurrentPage(value);
          }}
        />
      )}
    </div>
  );
};

export default Issues;
