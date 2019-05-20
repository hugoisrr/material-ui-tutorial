import React, { Component } from 'react';
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  withStyles,
  Select,
  Button
} from '@material-ui/core';

const styles = theme => ({
  FormControl: {
    width: 300
  }
});

export default withStyles(styles)(
  class extends Component {
    state = this.getInitState();

    getInitState() {
      const { exercise } = this.props;
      return exercise
        ? exercise
        : {
            title: '',
            description: '',
            muscles: ''
          };
    }

    static getDerivedStateFromProps({ exercise }) {
      return exercise || null;
    }

    handleChange = name => ({ target: { value } }) => {
      this.setState({
        [name]: value
      });
    };

    handleSubmit = () => {
      this.props.onSubmit({
        id: this.state.title.toLocaleLowerCase().replace(/ /g, '-'),
        ...this.state
      });
      this.setState(this.getInitState());
    };

    render() {
      const { title, description, muscles } = this.state,
        { classes, exercise, muscles: categories } = this.props;
      return (
        <form>
          <TextField
            label='Title'
            value={title}
            onChange={this.handleChange('title')}
            margin='normal'
            className={classes.FormControl}
          />
          <br />
          <FormControl>
            <InputLabel htmlFor='muscles'>Muscles</InputLabel>
            <Select
              value={muscles}
              className={classes.FormControl}
              onChange={this.handleChange('muscles')}
            >
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <TextField
            label='Description'
            className={classes.FormControl}
            multiline
            rows='4'
            value={description}
            onChange={this.handleChange('description')}
            margin='normal'
          />
          <br />
          <Button
            color='primary'
            variant='contained'
            onClick={this.handleSubmit}
          >
            {exercise ? 'Edit' : 'Create'}
          </Button>
        </form>
      );
    }
  }
);
