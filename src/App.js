import React, {useState, useEffect} from "react";

import "./App.css";

import {TaskTable} from "./components/TaskTable.js";
import {TaskCreator} from "./components/TaskCreator.js";
import {VisibilityControl} from "./components/VisibilityControl.js";
import {Container} from "./components/Container.js";

function App() {
  const [taskItems, seTTaskItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  function createNewTask(taskName) {
    if (!taskItems.find((task) => task.name === taskName)) {
      seTTaskItems([...taskItems, {name: taskName, done: false}]);
    }
  }

  const toggleTask = (task) => {
    seTTaskItems(
      taskItems.map((t) => (t.name === task.name ? {...t, done: !t.done} : t)),
    );
  };

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data) seTTaskItems(JSON.parse(data));
  }, []);

  const cleanTask = () => {
    seTTaskItems(taskItems.filter((task) => !task.done));
    setShowCompleted(false);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]);

  return (
    <main className='bg-dark vh-100 text-white'>
      <Container>
        <TaskCreator createNewTask={createNewTask} />
        <TaskTable tasks={taskItems} toggleTask={toggleTask} />
        <VisibilityControl
          isChecked={showCompleted}
          setShowCompleted={setShowCompleted}
          showCompleted={(checked) => showCompleted(checked)}
          cleanTask={cleanTask}
        />

        {showCompleted === true && (
          <TaskTable
            tasks={taskItems}
            toggleTask={toggleTask}
            showCompleted={showCompleted}
          />
        )}
      </Container>
    </main>
  );
}

export default App;
