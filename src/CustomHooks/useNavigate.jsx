import React from "react";
import { useNavigate } from "react-router";

const useNavigating = ({ path }) => {
  const navigating = useNavigate();
  const navigate = () => {
    return navigating(path);
  };

  return navigate;
};

export default useNavigating;
