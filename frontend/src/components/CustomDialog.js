import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Transition from "./Transition";

const CustomDialog = ({ open, setOpen, title, content }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={() => setOpen(false)}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CustomDialog;