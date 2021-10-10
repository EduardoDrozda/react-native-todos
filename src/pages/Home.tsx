import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = buildNewTask(newTaskTitle);
    setTasks([...tasks, newTask]);
  }

  function buildNewTask(title: string): Task {
    return {
      id: tasks.length + 1,
      title,
      done: false,
    };
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = [...tasks];
    const index = newTasks.findIndex((t) => t.id === id);
    newTasks[index].done = true;
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    const t = tasks.filter((t) => t.id !== id);
    setTasks(t);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
