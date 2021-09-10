import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Tasks from "./components/Tasks";
import logo from "./components/icon/addplus.png";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <>
      <View style={styles.container}>
        {/* today's task */}
        <View style={styles.taskWrapper}>
          <Text style={styles.sectionTitle}>Today's Task</Text>
          
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.items}>
              {taskItems.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => completeTask(index)}
                  >
                    <Tasks text={item} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* write a task section*/}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={"Write a Task"}
            value={task}
            onChangeText={(text) => setTask(text)}
          />

          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Image style={styles.img} source={logo} />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7D84B2",
  },
  taskWrapper: {
    paddingTop: 88,
    paddingHorizontal: 20,
    marginBottom: 200,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#DBF4A7",
    textDecorationLine: "underline",
    textDecorationStyle: "dashed",
    textDecorationColor: "#f9f9ed",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    flexDirection: "row",
    position: "absolute",
    bottom: 60,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#D9DBF1",
    borderColor: "#DBF4A7",
    borderRadius: 60,
    borderWidth: 3,
    width: "70%",
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#D9DBF1",
    borderColor: "#DBF4A7",
    borderRadius: 100,
    borderWidth: 3,
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 30,
    height: 30,
  },
});
