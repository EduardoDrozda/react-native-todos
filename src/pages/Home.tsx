import { is } from "@babel/types";
import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

import { EditTask, Task } from "../interfaces";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const isTaskAlreadyExists = verifyIfTaskIsAlreadySubmited(newTaskTitle);

    if (isTaskAlreadyExists) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          {
            text: "Ok",
            style: "cancel",
          },
        ]
      );

      return;
    }

    const newTask = buildNewTask(newTaskTitle);
    setTasks([...tasks, newTask]);
  }

  function verifyIfTaskIsAlreadySubmited(title: string): boolean {
    const findedTask = tasks.find((t) => t.title === title);
    return !!findedTask;
  }

  function buildNewTask(title: string): Task {
    return {
      id: tasks.length + 1,
      title,
      done: false,
    };
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const taskToBeMarkedDone = updatedTasks.find((task) => task.id === id);

    if (!taskToBeMarkedDone) return;

    taskToBeMarkedDone.done = !taskToBeMarkedDone.done;

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => removeTask(id),
        },
      ]
    );

    return;
  }

  function removeTask(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const t = updatedTasks.filter((t) => t.id !== id);
    setTasks(t);
  }

  function handleEditTask({ id, title }: EditTask) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const taskToBeUpdated = updatedTasks.find((task) => task.id === id);

    if (!taskToBeUpdated) return;

    taskToBeUpdated.title = title;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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
