import React from "react";
import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import { mdiAccountSchoolOutline, mdiIdentifier } from "@mdi/js";

function Student(props) {
  return (
    <Card>
      <Card.Body>
        <div>
          <Icon path={mdiAccountSchoolOutline} size={1} color="grey" />{" "}
          {props.student.firstname} {props.student.surname}
        </div>
        <div>
          <Icon path={mdiIdentifier} size={1} color="grey" />{" "}
          {props.student.nationalId}
        </div>
      </Card.Body>
    </Card>
  );
}

export default Student;