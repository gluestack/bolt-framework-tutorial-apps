import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AiOutlinePlusSquare,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSave,
} from "react-icons/ai";

import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { Box } from "../core/Box";
import { HStack, Input, Pressable, VStack, Text } from "@/components";

interface Todo {
  id: string;
  title: string;
  iscompleted: boolean;
}
const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/todo/getAllTodos"
      );
      setTodos(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (newTodo) {
      try {
        await axios.post("http://localhost:8000/api/todo/createTodo", {
          title: newTodo,
        });
        setNewTodo("");
        fetchTodos();
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/todo/deleteTodo/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo: Todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const saveTodo = async () => {
    if (selectedTodo) {
      try {
        await axios.put(
          `http://localhost:8000/api/todo/updateTodo/${selectedTodo?.id}`,
          {
            title: selectedTodo?.title,
            iscompleted: selectedTodo?.iscompleted,
          }
        );
      } catch (error) {
        console.log("Error updating todo:", error);
      }

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === selectedTodo.id ? selectedTodo : todo
        )
      );
      setSelectedTodo(null);
    }
  };

  const iscompletedTodo = async (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      const updatedTodo: Todo = {
        ...todo,
        iscompleted: !todo.iscompleted,
      };

      try {
        await axios.put(
          `http://localhost:8000/api/todo/updateTodo/${id}`,
          updatedTodo
        );
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
        );
      } catch (error) {
        console.log("Error updating todo:", error);
      }
    }
  };

  const allTodo = async () => {
    await fetchTodos();
  };

  const activeTodo = async () => {
    const response = await fetchTodos();
    const filteredData: Todo[] = response.filter(
      (todo: Todo) => !todo.iscompleted
    );
    setTodos(filteredData);
  };

  const completedTodo = async () => {
    const response = await fetchTodos();
    const filteredData = response.filter((item: Todo) => item.iscompleted);
    setTodos(filteredData);
  };

  return (
    <VStack bg="#F5F5F5" alignItems="center" justifyContent="center" h={823}>
      <Text size="6xl" color="#E8DBDC" fontWeight="200">
        todos
      </Text>
      <VStack bg="#FFFFFF" w={600}>
        <HStack alignItems="center" justifyContent="space-between">
          <Input
            variant="underlined"
            size="xl"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            m={"$4"}
            w={500}
          >
            <Input.Input
              placeholder="What needs to be done ?"
              color="$muted400"
              fontStyle="italic"
              value={selectedTodo ? selectedTodo.title : newTodo}
              onChange={(e) =>
                selectedTodo
                  ? setSelectedTodo({
                      ...selectedTodo,
                      title: e.nativeEvent.text,
                    })
                  : setNewTodo(e.nativeEvent.text)
              }
            />
          </Input>

          <Pressable onPress={selectedTodo ? saveTodo : addTodo}>
            {selectedTodo ? (
              <AiOutlineSave size="2.5em" color="black" />
            ) : (
              <AiOutlinePlusSquare size="2.5em" color="black" />
            )}
          </Pressable>
        </HStack>

        <VStack>
          {todos.map((todo) => (
            <HStack
              justifyContent="space-between"
              alignItems="center"
              key={todo.id}
              borderBottomWidth={"$1"}
              borderBottomColor="#F5F5F5"
            >
              <HStack alignItems="center">
                {todo.iscompleted ? (
                  <Pressable onPress={() => iscompletedTodo(todo.id)}>
                    <BiCheckboxChecked size="3em" color="black" />
                  </Pressable>
                ) : (
                  <Pressable onPress={() => iscompletedTodo(todo.id)}>
                    <BiCheckbox size="3em" color="black" />
                  </Pressable>
                )}

                {selectedTodo?.id === todo.id ? (
                  <Input
                    variant="underlined"
                    size="xl"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    m={"$4"}
                    w={400}
                  >
                    <Input.Input
                      placeholder="Edit to change the value !"
                      color="$muted900"
                      fontStyle="italic"
                      value={selectedTodo.title}
                      onChange={(e) =>
                        selectedTodo
                          ? setSelectedTodo({
                              ...selectedTodo,
                              title: e.nativeEvent.text,
                            })
                          : setNewTodo(e.nativeEvent.text)
                      }
                    />
                  </Input>
                ) : (
                  <Box>
                    <Text
                      size="lg"
                      textDecorationLine={
                        todo.iscompleted ? "line-through" : "none"
                      }
                    >
                      {todo.title}
                    </Text>
                  </Box>
                )}
              </HStack>

              <HStack justifyContent="space-between">
                {selectedTodo?.id === todo.id ? (
                  <Pressable onPress={saveTodo}>
                    <AiOutlineSave size="2em" color="black" />
                  </Pressable>
                ) : (
                  <Pressable onPress={() => updateTodo(todo)}>
                    <AiOutlineEdit size="2em" color="#67e8f9" />
                  </Pressable>
                )}
                <Pressable onPress={() => deleteTodo(todo.id)}>
                  <AiOutlineDelete size="2em" color="#f87171" />
                </Pressable>
              </HStack>
            </HStack>
          ))}

          <HStack alignItems="center" p={10} justifyContent="center">
            <Pressable
              onPress={() => allTodo()}
              p="$2"
              mx={"$2"}
              sx={{
                ":hover": { borderWidth: "$1", borderColor: "$danger200" },
              }}
            >
              <Text>All</Text>
            </Pressable>

            <Pressable
              onPress={() => activeTodo()}
              p="$2"
              mx={"$2"}
              sx={{
                ":hover": { borderWidth: "$1", borderColor: "$danger200" },
              }}
            >
              <Text>Active</Text>
            </Pressable>

            <Pressable
              onPress={() => completedTodo()}
              p="$2"
              mx={"$2"}
              sx={{
                ":hover": { borderWidth: "$1", borderColor: "$danger200" },
              }}
            >
              <Text>Completed</Text>
            </Pressable>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default TodoList;
