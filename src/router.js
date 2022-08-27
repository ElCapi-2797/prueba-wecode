import { useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import TutorshipPage from "./pages/TutorshipPage";

export const AppRouter = () => {
  const [title, setTitle] = useState("Tutorías");
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  return useRoutes([
    {
      path: "/tuto/",

      children: [
        {
          path: "tutorship",
          element: (
            <TutorshipPage />
          ),
        },
       
      ],
    },
  ]);
};
