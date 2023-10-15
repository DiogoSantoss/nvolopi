import { Box, TextField, Button, Typography, Paper, Grid } from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { isLoggedIn } from "../context/Auth";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");

  if (isLoggedIn()) return <Navigate to="/upload" />;

  const handleLoginSubmit = async () => {
    setSending(true);

    if (!email || !password) {
      setSending(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/auth", {
        email: email,
        password: password,
      });
      const token = response.data;

      // altamente inseguro
      localStorage.setItem("token", token);

    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };
  
  const handleCreateSubmit = async () => {
    setSending(true);

    if (!email || !password) {
      setSending(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/create", {
        email: email,
        password: password,
      });
      console.log(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  /* Create a box in the middle with a login form using MUI Material */
  return (
    <Paper sx={{ p: 5 }}>
      <Box sx={{ mx: "auto", width: "50vh" }}>
        <Typography variant="h4" component="h1">
          <strong>Login</strong>
        </Typography>
        {error && (
          <Typography fontSize={15} color="red">
            There was an error with your login or account creation: {error}
          </Typography>
        )}
        <Box component="form">
          <TextField
            margin="normal"
            variant="filled"
            required
            fullWidth
            id="email"
            label={"Email"}
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            variant="filled"
            required
            fullWidth
            name="password"
            label={"Password"}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Grid container spacing={2}>
            <Grid item>
              <Button
                fullWidth
                onClick={handleLoginSubmit}
                variant="contained"
                sx={{ mt: 3 }}
                disabled={!email || !password}
              >
                {sending ? "Sending..." : "Login"}
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                onClick={handleCreateSubmit}
                variant="contained"
                sx={{ mt: 3 }}
                disabled={!email || !password}
              >
                {sending ? "Sending..." : "Create"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

export default Login;
