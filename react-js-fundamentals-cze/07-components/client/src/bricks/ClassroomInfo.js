import React from "react";

class ClassroomInfo extends React.Component {
  render() {
    return <h1>Classroom {this.props.classroom.name}</h1>;
  }
}

export default ClassroomInfo;
