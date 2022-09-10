import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, TextArea } from "reactstrap";
import alertify from "alertifyjs";

export default class FormDemo2 extends Component {
  state = { email: "", password: "", city: "", description: "" };
  onChangeHandler = (event) => {
    //this.setState({userName: event.target.value })

    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };
  onSubmitHandler = (event) => {
    event.preventDefault(); //Save butonuna bastığında sepeti boşaltmaması için
    alertify.success(this.state.email + " " + "Added to database", 2);
    alertify.success(this.state.password + " " + "Added to database", 2);
    alertify.success(this.state.city + " " + "Added to database", 2);
    alertify.success(this.state.description + " " + "Added to database", 2);
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmitHandler}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              onChange={this.onChangeHandler}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              onChange={this.onChangeHandler}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              onChange={this.onChangeHandler}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input type="select" name="city" onChange={this.onChangeHandler}>
              <option>Ankara</option>
              <option>İstanbul</option>
              <option>İzmir</option>
              <option>Konya</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Button type="submit" onChange={this.onSubmitHandler}>
              Save
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
