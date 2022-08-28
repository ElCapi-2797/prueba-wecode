
import { useRoutes } from "react-router-dom";
import BankPage from "./pages/BankPage";

export const AppRouter = () => {


  return useRoutes([
    {
      path: "/",
      children: [
        {
          path: "bank",
          element: (
            <BankPage />
          ),
        },
       
      ],
    },
  ]);
};
