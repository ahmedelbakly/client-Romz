// create functions to get user data from localStorage
import { useState } from "react";
import axiosInstance from "./axiosInstance";

export const GetUser = () => {
  try {
    const [user, setUser] = useState(null);

    axiosInstance.get("/user").then((res) => {
      setUser(res.data.user);
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};


