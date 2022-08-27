import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/LoginService";
import { removeUser, setUser } from "../utils/storage";

const LoginPage = ({ setSnackbar }) => {
  const navigate = useNavigate();
  const initLocalStorage = () => {
    removeUser();
  };

  useEffect(() => {
    initLocalStorage();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user = {
      code: formData.get("code"),
      password: formData.get("password"),
    };
    if (user.username !== "" && user.password !== "") {
      login(formData.get("type"), user).then((data) => {
        setSnackbar({ open: true, message: data.message });
        if (data.status === 1) {
          setUser(
            formData.get("type"),
            data.data._id,
            data.data.code,
            "Bearer " + data.data.token.toString()
          );
          navigate("/tuto/tutorship", { replace: true });
        }
      });
    } else {
      setSnackbar({ open: true, message: "Ingrese todos los campos" });
    }
  };

  return (
    <>
      <Typography sx={{ mb: 2 }}>L o g i n</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <FormControl fullWidth>
          <InputLabel id="courtypeLabelseLabel">Tipo de Usuario</InputLabel>
          <Select
            labelId="typeLabel"
            id="type"
            label="Tipo de Usuario"
            required
            name="type"
            defaultValue="student"
            sx={{ mb: 2 }}
          >
            <MenuItem key="student" value="student">
              Estudiante
            </MenuItem>
            <MenuItem key="tutor" value="tutor">
              Tutor
            </MenuItem>
            <MenuItem key="teacher" value="teacher">
              Profesor
            </MenuItem>
            <MenuItem key="administrator" value="administrator">
              Administrador
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          required
          fullWidth
          id="code"
          label="Código"
          name="code"
          autoComplete="username"
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          autoComplete="current-password"
          sx={{ mb: 2 }}
        />
        <Box sx={{ textAlign: "center" }}>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3, mb: 2, textTransform: "none" }}
          >
            <Typography>Iniciar Sesión</Typography>
          </Button>
          <br></br>
          <Link href="/resetPassword" variant="body2">
            Resetear Contraseña
          </Link>
        </Box>
        <br></br>
      </Box>
    </>
  );
};

export default LoginPage;
