import "./App.css";
import ClassroomInfo from "./bricks/ClassroomInfo";
import StudentList from "./bricks/StudentList";

const classroom = {
  name: "Septima",
};

const studentList = [
  {
    firstname: "Vilma",
    surname: "Štefanová",
    nationalId: "8560162963",
    id: "8fd09f3f5e2b4326",
    classroomId: "84d4e4261f30a2e5",
  },
  {
    firstname: "Agáta",
    surname: "Dittrichová",
    nationalId: "7060084086",
    id: "d6518140a5d6e2d0",
    classroomId: "1e838cb06cfeb01c",
  },
  {
    firstname: "Ludmila",
    surname: "Plašilová",
    nationalId: "9155177614",
    id: "6797c49e1a286d52",
    classroomId: "f780b198cf290778",
  },
  {
    firstname: "Saskie",
    surname: "Mertová",
    nationalId: "7651117815",
    id: "2862a7b1abf33eed",
    classroomId: "3aa1b99e902f5175",
  },
];

function App() {
  return (
    <div className="App">
      <ClassroomInfo classroom={classroom} />
      <StudentList studentList={studentList} />
    </div>
  );
}

export default App;
