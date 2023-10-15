import { Box, Paper, Button, Typography, Grid, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [allowed, setAllowed] = useState("");

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    if (!file) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("allowed", allowed);
      formData.append("file", file);

      await axios.post("http://localhost:3002/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      //setError("Error updating timeseries (" + err.message + ")");
    }
  };

  const handleAllowedChange = (e) => {
    const emails = e.target.value.split(" ");
    setAllowed(emails[0]);
  };

  return (
    <Paper sx={{ p: 5 }}>
      <Box
        sx={{
          mx: "auto",
          width: "50vh",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={handleAllowedChange}
              fullWidth
              required
              autoComplete="email"
              autoFocus
              label="Share this with (email)..."
            ></TextField>
          </Grid>
          <Grid item xs={8}>
            <Button
              component="label"
              variant={file ? "outlined" : "contained"}
              startIcon={<UploadFileIcon />}
              sx={{ fontSize: "1.1em" }}
            >
              {file ? file.name : "Upload file"}
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{ fontSize: "1.1em", width: "100%" }}
              onClick={handleSubmit}
              disabled={!(file && allowed)}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Upload;
