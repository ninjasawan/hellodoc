import { useContext } from "react";
import { AppContext } from "providers/AppProvider";

const useAppContext = () => useContext(AppContext);

export const useApp = () => {
  const {
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
  } = useAppContext();

  return {
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
  };
};
