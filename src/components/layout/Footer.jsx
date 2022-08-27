import { Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/LaMalditaProgramadora">
        LaMalditaProgramadora
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
};

export default Footer;