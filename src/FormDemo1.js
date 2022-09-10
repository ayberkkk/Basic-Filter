import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

export default class FormDemo1 extends Component {
  state = { userName: "", surName: "" };
  onChangeHandler = (event) => {
    //this.setState({userName: event.target.value })
 
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  }; 
  onSubmitHandler = (event) => {
    event.preventDefault(); //Save butonuna bastığında sepeti boşaltmaması için
    alert(this.state.name);
  };
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col xs="6">
              <form onSubmit={this.onSubmitHandler}>
                <h4>Name</h4>
                <input name="userName" onChange={this.onChangeHandler} type="text"></input>

                <h4>Surname</h4>
                <input  name="surName" onChange={this.onChangeHandler} type="text"></input>
              </form>
            </Col>
            <Col xs="6">
              <h4> Name is {this.state.userName}</h4>

              <h4> Surname is {this.state.surName}</h4>
            </Col>
            <Col xs="6">
              <input type="submit" value="Save"></input>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
