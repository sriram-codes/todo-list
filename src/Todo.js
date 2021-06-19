import {
  Button,
  Modal,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

import "./Todo.css";
import db from './firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(props.todo.todo)

  const handleOpen = () => {
    setOpen(true);
  }


  const updateTodo = () => {
    //Update the todo with new text
    db.collection('todos').doc(props.todo.id).set({
      todo: input
    }, {merge: true })
    setOpen(false)
  }
  

  return (
    <>
    <Modal open={open} onClose={e => setOpen(false)}><div className={classes.paper}><h1>This is a modal</h1><input value={input} placeholder={props.todo.todo} onChange={event=> setInput(event.target.value)} /><Button onClick={updateTodo}>Update</Button></div></Modal>
    <List className="todo__list">
      <ListItem>
        <ListItemAvatar />
        <ListItemText primary={props.todo.todo} secondary="Deadline" />
      </ListItem>
      <Button onClick={e => setOpen(true)}> Edit </Button>
      <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
    </List>
    </>
  );
}

export default Todo;
