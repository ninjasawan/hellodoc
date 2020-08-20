import React from "react";

export const AppContext = React.createContext({
  loading: false,
  setLoading: null,
  repoData: null,
  setRepoData: null,
  totalPages: 260,
  setTotalPages: null,
  currentPage: 1,
  setCurrentPage: null,
  issueData: null,
  setIssueData: null,
});

export const AppProvider = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [repoData, setRepoData] = React.useState(null);
  const [totalPages, setTotalPages] = React.useState(260);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [issueData, setIssueData] = React.useState(null);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        repoData,
        setRepoData,
        totalPages,
        setTotalPages,
        currentPage,
        setCurrentPage,
        issueData,
        setIssueData,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
