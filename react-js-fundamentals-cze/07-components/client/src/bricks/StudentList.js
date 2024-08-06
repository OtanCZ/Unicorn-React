import React from "react";
import Student from "./Student";

class StudentList extends React.Component {
  render() {
    function getStudentList(studentList) {
      return studentList.map((student) => {
        return <Student key={student.id} student={student} />;
      });
    }

    return getStudentList(this.props.studentList);
  }
}

export default StudentList;
