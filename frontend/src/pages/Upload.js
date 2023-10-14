import { Box, Paper, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const Upload = () => {
    const [file, setFile] = useState(null);

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
            formData.append("file", file);

            console.log(formData);
            await axios.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (err) {
            //setError("Error updating timeseries (" + err.message + ")");
        }
    }

    return (
        <Paper sx={{ p: 5 }}>
            <Box sx={{ mx: "auto", width: "50vh", display: "flex", justifyContent: "space-between"}}>
                <Button
                    component="label"
                    variant={file ? "outlined" : "contained"}
                    startIcon={<UploadFileIcon />}
                    sx={{ fontSize: "1.1em" }}
                >
                    {file ? file.name : "Upload file"}
                    <input
                        type="file"
                        hidden
                        onChange={handleFileUpload}
                    />
                </Button>
                {file &&
                    <Button variant="contained" sx={{ fontSize: "1.1em" }} onClick={handleSubmit}>
                        Submit
                    </Button>
                }
            </Box>
        </Paper>
    )
}

export default Upload;