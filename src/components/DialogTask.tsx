import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import React from 'react';

interface DialogTaskProps {
    title: string;
    titleBtn: string;
    task: string;
    description: string;

}

const DialogTask: React.FC<DialogTaskProps> = ({
    title,
    titleBtn,
    task,
    description
}) => {

    return(
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="task"
                    label="Tarefa"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setTask((state) => ({ ...state, task: e.target.value }))}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Descrição"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setTask((state) => ({ ...state, detail: e.target.value }))}
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSave}>{titleBtn}</Button>
                </DialogActions>
        </>
    )
}