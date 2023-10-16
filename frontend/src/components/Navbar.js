import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          {/* Desktop */}
          <UploadFileIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Nvolopi
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <MenuItem
              key="upload"
              onClick={() => {
                setAnchorElNav(null);
                navigate("/upload");
              }}
              sx={{ fontWeight: 700, fontSize: "1.1em" }}
            >
              UPLOAD
            </MenuItem>
            <MenuItem
              key="download"
              onClick={() => {
                setAnchorElNav(null);
                navigate("/download");
              }}
              sx={{ fontWeight: 700, fontSize: "1.1em" }}
            >
              DOWNLOAD
            </MenuItem>
          </Box>

          {/* Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => setAnchorElNav(e.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                key="upload"
                onClick={() => {
                  setAnchorElNav(null);
                  navigate("/upload");
                }}
                sx={{ fontWeight: 700, fontSize: "1.1em" }}
              >
                UPLOAD
              </MenuItem>
              <MenuItem
                key="download"
                onClick={() => {
                  setAnchorElNav(null);
                  navigate("/download");
                }}
                sx={{ fontWeight: 700, fontSize: "1.1em" }}
              >
                DOWNLOAD
              </MenuItem>
            </Menu>
          </Box>
          <UploadFileIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Nvolopi
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
