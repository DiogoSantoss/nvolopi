import { Box, TextField, Button, Typography, Paper, Grid } from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  /* Forward logged in user to main page */
  const isLoggedIn = false;

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");

  if (isLoggedIn) return <Navigate to="/upload" />;

  const handleLoginSubmit = async () => {
    setSending(true);

    if (!username || !password) {
      setSending(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/auth", {
        email: username,
        password: password,
      });
      console.log(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };
  const handleCreateSubmit = async () => {
    setSending(true);

    if (!username || !password) {
      setSending(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/create", {
        email: username,
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
            id="username"
            label={"Username"}
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
                disabled={!username || !password}
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
                disabled={!username || !password}
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
