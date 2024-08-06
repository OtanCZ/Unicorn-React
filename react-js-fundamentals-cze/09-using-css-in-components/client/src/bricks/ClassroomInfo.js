import React from "react";
import styles from "../css/classroom.module.css";

function ClassroomInfo(props) {
  return (
    <h1>
      Classroom{" "}
      <span className={styles.classroomNameHeader}>
        {props.classroom.name}
      </span>
    </h1>
  );
}

export default ClassroomInfo;