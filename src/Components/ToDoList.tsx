import React, { Component } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ToDoListState {
  items: Array<{ text: string, completed: boolean }>;
  newItemText: string;
}

class ToDoList extends Component<{}, ToDoListState> {
  state: ToDoListState = {
    items: [],
    newItemText: ''
  };

  handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newItemText: event.target.value });
  };

  addItem = () => {
    if (this.state.newItemText.trim() === '') return;
    const newItem = { text: this.state.newItemText, completed: false };
    this.setState(state => ({
      items: [...state.items, newItem],
      newItemText: ''
    }));
  };

  toggleItemCompletion = (index: number) => {
    const items = [...this.state.items];
    items[index].completed = !items[index].completed;
    this.setState({ items });
  };

  deleteItem = (index: number) => {
    const items = [...this.state.items];
    items.splice(index, 1);
    this.setState({ items });
  };

  render() {
    return (
      <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
        <TextField
          label="New To-Do Item"
          value={this.state.newItemText}
          onChange={this.handleTextChange}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.addItem}
          style={{ marginTop: '10px' }}
          fullWidth
        >
          Add
        </Button>
        <List>
          {this.state.items.map((item, index) => (
            <ListItem key={index} dense>
              <Checkbox
                checked={item.completed}
                onChange={() => this.toggleItemCompletion(index)}
              />
              <ListItemText
                primary={item.text}
                style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
              />
              <IconButton edge="end" aria-label="delete" onClick={() => this.deleteItem(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default ToDoList;
