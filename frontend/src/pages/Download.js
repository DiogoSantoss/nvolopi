import { Box, Paper, TextField, Grid, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const Download = () => {
  const [fileID, setFileID] = useState("");

  const handleFileIDChange = (e) => {
    setFileID(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (!fileID) {
      return;
    }

    try {
      const config = {
        headers: {
          Authentication: "Bearer " + localStorage.getItem("token"),
        },
      };

      const response = await axios.post(
        "http://localhost:3002/download",
        {
          fileID: fileID,
        },
        config
      );
      // God's worst creation
      const link = document.createElement("a");
      link.href = URL.createObjectURL(
        new Blob([new Uint8Array(response.data.file.data)])
      );
      link.download = response.data.name;
      link.click();
    } catch (err) {
      console.log(err);
    }
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
          <Grid item xs={8}>
            <TextField
              onChange={handleFileIDChange}
              fullWidth
              autoFocus
              label="Enter file ID..."
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{ fontSize: "1.1em", width: "100%", height: "100%" }}
              onClick={handleSubmit}
              disabled={!fileID}
            >
              Download
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Download;
