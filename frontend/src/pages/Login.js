import { Box, TextField, Button, Link, Typography, Paper } from '@mui/material';
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {

    { /* Forward logged in user to main page */ }
    const isLoggedIn = false;

	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	
	const [sending, setSending] = useState(false);
	
	const [error, setError] = useState("");

    if (isLoggedIn)
        return <Navigate to="/upload" />

    const handleSubmit = async () => {
        setSending(true);
    
        if (!username || !password) {
            setSending(false);
            return;
        }
        
        try {
            const response = await axios.post("/api/auth/create", {
                email: username,
                password: password,
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setSending(false);
        }
    };

    /* Create a box in the middle with a login form using MUI Material */
    return ( 
        <Paper sx={{ p:5 }}>
			<Box sx={{ mx: "auto", width: "50vh" }}>
				<Typography variant="h4" component="h1">
					<strong>Login</strong>
				</Typography>
				{error && (
					<Typography fontSize={15} color="red">
						There was an error with your login: {error}
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
					<Button
						fullWidth
						onClick={handleSubmit}
						variant="contained"
						sx={{ mt: 3 }}
						disabled={!username || !password}
					>
						{sending ? "Sending..." : "Submit"}
					</Button>
					<Button color="primary" fullWidth sx={{ mt: 2 }}>
						<Link to={"/register"}>New Account</Link>
					</Button>
				</Box>
			</Box>
        </Paper>
    );
}

export default Login;