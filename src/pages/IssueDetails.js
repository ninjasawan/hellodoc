import React, { useState, useEffect } from "react";
import { useApp } from "hooks";
import { useParams } from "react-router-dom";
import { fetchWrapper } from "helper";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";

const IssueDetails = () => {
  let { id } = useParams();
  const [issueDetails, setIssueDetails] = useState(null);

  const { setLoading } = useApp();

  useEffect(() => {
    setLoading(true);
    fetchWrapper
      .get(`${process.env.REACT_APP_ISSUES_DETAILS}/${id}`)
      .then((data) => {
        setIssueDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (!issueDetails) return null;

  const createMarkup = () => {
    return { __html: issueDetails.body };
  };

  return (
    <Container>
      <div>
        <h1>{`${issueDetails.title}#${id}`} </h1>
        <Chip label={issueDetails.state} />
        <div dangerouslySetInnerHTML={createMarkup()}></div>
      </div>
    </Container>
  );
};

export default IssueDetails;
