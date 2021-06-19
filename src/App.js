import "./App.css";
import React, { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./Todo.js";
import db from "./firebase";
import firebase from 'firebase'

function App() {
  const [todos, setTodos] = useState(["Item 1", "Item 2", "Item 3"]);
  const [input, setInput] = useState("");
  console.log("🎮", input);

  useEffect(() => {
    db.collection("todos").orderBy('timestamp','desc').onSnapshot((snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({id: doc.id, todo:doc.data().todo})));
    });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    console.log("Im working");
    setTodos([...todos, input]);
    setInput("");
  };

  return (
    <div className="App">
      <form>
        <h1>Todoist</h1>

        <FormControl>
          <InputLabel htmlFor="my-input">Enter a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          disabled={!input}
          variant="contained"
          color="secondary"
          onClick={addTodo}
        >
          Add
        </Button>
      </form>
      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
