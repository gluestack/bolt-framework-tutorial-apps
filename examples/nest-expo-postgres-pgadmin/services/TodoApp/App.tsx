import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  getAllTodoLists,
  createTodoList,
  getTodoListItemsById,
  getTodoListById,
  createTodoListItem,
  updateTodoListItem,
  deleteTodoListItem,
  deleteTodoList,
  updateTodoList,
} from "./src/services/api";
import { CheckBox } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

interface TodoListItem {
  completed: boolean;
  text: string;
  id: number;
  editing: boolean;
  updatedText: string;
}
const App = () => {
  const [todoLists, setTodoLists] = useState<any[]>([]);
  const [todoListName, setTodoListName] = useState<string>("");
  const [todoList, setTodoList] = useState<any | null>(null);
  const [todoListItems, setTodoListItems] = useState<TodoListItem[]>([]);
  const [todoItemText, setTodoItemText] = useState<string>("");
  const [todoName, setTodoName] = useState<string>("");
  const [editedTodoId, setEditedTodoId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    loadTodoLists();
  }, []);

  const loadTodoLists = async () => {
    try {
      const response = await getAllTodoLists();
      setTodoLists(response.data);
    } catch (error) {
      console.error("Error fetching todo lists:", error);
    }
  };

  const handleTodoItemsClose = () => {
    setIsVisible(false);
  };
  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodoListItem(id);
      await deleteTodoList(id);
      loadTodoLists();
      loadTodoList(todoList.id);
    } catch (error) {
      console.log(`Error deleting todo with id ${id}`);
    }
  };
  const handleCreateTodoList = async () => {
    try {
      await createTodoList(todoListName);
      setTodoListName("");
      loadTodoLists();
    } catch (error) {
      console.error("Error creating todo list:", error);
    }
  };
  const handleEditSave = async (id: number) => {
    try {
      const updatedTodo = todoLists.find((todo) => todo.id === id);
      if (!updatedTodo) return;
      await updateTodoList(id, todoName);
      setEditedTodoId(null);
      loadTodoLists();
      loadTodoList(id);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditClick = (id: number) => {
    const editedTodo = todoLists.find((todo) => todo.id === id);
    if (editedTodo) {
      setTodoName(editedTodo.name);
    }
    setEditedTodoId(id);
  };
  const loadTodoList = async (id: number) => {
    try {
      setIsVisible(true);
      const response = await getTodoListById(id);
      setTodoList(response.data);
      const todoListItems = await getTodoListItemsById(id);
      setTodoListItems(todoListItems.data);
    } catch (error) {
      console.error("Error fetching todo list:", error);
    }
  };

  const handleCreateTodoItem = async () => {
    try {
      if (todoList) {
        await createTodoListItem(todoList.id, todoItemText);
        setTodoItemText("");
        loadTodoList(todoList.id);
      }
    } catch (error) {
      console.error("Error creating todo item:", error);
    }
  };
  const renderItem = ({ item }: { item: TodoListItem }) => {
    const handleItemToggle = async () => {
      try {
        await updateTodoListItem(item.id, item.text, !item.completed);
        loadTodoList(todoList.id);
      } catch (error) {
        console.error("Error updating todo item:", error);
      }
    };

    const handleItemDelete = async () => {
      try {
        await deleteTodoListItem(item.id);
        loadTodoList(todoList.id);
      } catch (error) {
        console.error("Error deleting todo item:", error);
      }
    };

    const handleEditSave = async () => {
      if (item.editing) {
        try {
          await updateTodoListItem(item.id, item.updatedText, item.completed);

          loadTodoList(todoList.id);
        } catch (error) {
          console.error("Error updating todo item:", error);
        }
      } else {
        setTodoListItems((prevItems) =>
          prevItems.map((prevItem) =>
            prevItem.id === item.id
              ? { ...prevItem, editing: true, updatedText: prevItem.text }
              : prevItem
          )
        );
      }
    };

    const handleEditCancel = () => {
      setTodoListItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, editing: false, updatedText: "" }
            : prevItem
        )
      );
    };

    const handleTextChange = (text: string) => {
      setTodoListItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, updatedText: text }
            : prevItem
        )
      );
    };

    return (
      <View style={styles.todoItem}>
        <ScrollView horizontal>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckBox checked={item.completed} onPress={handleItemToggle} />
            {item.editing ? (
              <TextInput
                style={[
                  styles.todoItemText,
                  item.editing
                    ? styles.inputColor
                    : item.completed
                    ? styles.completedText
                    : {},
                ]}
                value={item.updatedText}
                onChangeText={handleTextChange}
              />
            ) : (
              <Text
                style={[
                  styles.todoItemText,
                  item.completed ? styles.completedText : {},
                ]}
              >
                {item.text}
              </Text>
            )}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {item.editing ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleEditSave}
                >
                  <AntDesign name="save" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleEditCancel}
                >
                  <AntDesign name="close" size={20} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleEditSave}
              >
                <AntDesign name="edit" size={20} color="white" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleItemDelete}
            >
              <AntDesign name="delete" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Create Todo List */}
      <View style={styles.createTodoListContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter todo list name"
          value={todoListName}
          onChangeText={setTodoListName}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleCreateTodoList}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Display Todo Lists */}
      <View style={styles.todoListsContainer}>
        {todoLists.length === 0 ? (
          <Text style={{ padding: 10 }}>
            There's nothing added in Todo List
          </Text>
        ) : (
          <FlatList
            data={todoLists}
            renderItem={({ item }) => (
              <View style={styles.todoListBtn}>
                {editedTodoId === item.id ? (
                  <>
                    <TextInput
                      style={styles.input}
                      value={todoName}
                      onChangeText={setTodoName}
                    />
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => handleEditSave(item.id)}
                      >
                        <AntDesign name="save" size={20} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteTodo(item.id)}
                      >
                        <AntDesign name="delete" size={20} color="white" />
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.todoListItem}
                      onPress={() => loadTodoList(item.id)}
                    >
                      <Text style={styles.todoListName}>{item.name}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => handleEditClick(item.id)}
                      >
                        <AntDesign name="edit" size={20} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteTodo(item.id)}
                      >
                        <AntDesign name="delete" size={20} color="white" />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>

      {/* Display Todo Items */}
      {todoList && (
        <View
          style={[
            styles.todoListContainer,
            isVisible ? styles.dFlex : styles.dNone,
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.todoListTitle}>{todoList.name}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleTodoItemsClose}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
          {todoListItems.length == 0 ? (
            <Text
              style={{
                padding: 4,
                margin: 4,
                textAlign: "center",
                fontSize: 20,
                fontWeight: "300",
              }}
            >
              There are no todo Items in {todoList.name} todo
            </Text>
          ) : (
            <FlatList
              data={todoListItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#f0f0f1",
              padding: 10,
              margin: 4,
              marginBottom:-5
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter todo item text"
              value={todoItemText}
              onChangeText={setTodoItemText}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleCreateTodoItem}
            >
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    padding: 16,
    backgroundColor: "#f0f0f0",
    marginHorizontal: "auto",
    marginVertical: 10,
  },
  createTodoListContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  todoListsContainer: {
    marginBottom: 16,
    backgroundColor: "#ffffff",
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  todoListContainer: {
    flex: 1,
    backgroundColor: "white",
    flexDirection:'column',
    justifyContent:'space-between',
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  todoListBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    padding: 8,
    backgroundColor: "#f0f0f0",
    margin: 4,
    borderRadius: 4,
    alignItems: "center",
  },
  todoListTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal:4
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    fontSize: 18,
    marginHorizontal: 4,
    width: 530,
  },
  todoItemText: {
    fontSize: 18,
    margin: 4,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    width: 530,
    
  },
  addButton: {
    backgroundColor: "blue",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 20,
  },
  todoListItem: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  todoListName: {
    fontSize: 18,
    width: 530,
  },
  todoItem: {
    backgroundColor: "#dcdcdc",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  completedText: {
    textDecorationLine: "line-through",
    color: "black",
  },
  editButton: {
    backgroundColor: "orange",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    height: 50,
  },
  deleteButton: {
    backgroundColor: "red",
    marginHorizontal: 4,
    height: 50,
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  dNone: {
    display: "none",
  },
  dFlex: {
    display: "flex",
  },
  inputColor:{
    backgroundColor:'#f0f0f0'
  }
});

export default App;
