import { Box, Paper, Button, Typography, Grid, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CustomDialog from "../components/CustomDialog";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [allowed, setAllowed] = useState("");
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [fileID, setFileID] = useState("");

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }

    if (e.target.files[0].size > (5 << 20)) {
      setError("The maximum file size is 5MB.");
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
      if (allowed !== "")
        formData.append("allowed", allowed);
      formData.append("file", file);

      const response = await axios.post("http://localhost:3002/upload", formData, {
        headers: {
          Authentication: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      setFileID(response.data.fileID);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  const handleAllowedChange = (e) => {
    const users = e.target.value.split(" ");
    setAllowed(users[0]);
  };

  return (
    <>
      <CustomDialog 
        open={openDialog}
        setOpen={setOpenDialog}
        title={"File uploaded successfully!"}
        content={`Your file ID is ${fileID}. Save it before closing this dialog!`}
      />
      <Paper sx={{ p: 5 }}>
        <Box
          sx={{
            mx: "auto",
            width: "50vh",
          }}
        >
          <Typography variant="h4" component="h1">
            <strong>Upload</strong>
          </Typography>
          {error && (
            <Typography fontSize={15} color="red">
              There was an error uploading your file: {error}
            </Typography>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleAllowedChange}
                fullWidth
                autoComplete="user"
                autoFocus
                label="Share this with (user)..."
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
                disabled={!file}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default Upload;
