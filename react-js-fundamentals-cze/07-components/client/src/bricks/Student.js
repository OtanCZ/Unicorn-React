import React from "react";

class Student extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.student.firstname}</div>
        <div>{this.props.student.surname}</div>
        <div>{this.props.student.nationalId}</div>
      </div>
    );
  }
}

export default Student;
