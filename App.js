import "react-native-get-random-values";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import Realm from "realm";
const Cat = {
  name: "Cat",
  properties: {
    _id: "objectId",
    name: "string",
    age: "int",
    type: "string",
  },
};

export default function App() {
  const [realm, setRealm] = React.useState();
  const [cat, setCat] = React.useState();

  React.useEffect(() => {
    async function getRealmAsync() {
      const db = await Realm.open({
        schema: [Cat],
      });
      setRealm(db);
    }

    getRealmAsync();
  });

  return (
    <View style={styles.container}>
      <Text>cat: {JSON.stringify(cat)}</Text>
      <Button
        title="Warn me"
        onPress={() => {
          console.warn("This is a warning!");
        }}
      />

      <Button
        title="Write cat"
        onPress={() => {
          realm.write(() => {
            aliceCat = realm.create("Cat", {
              _id: new Realm.BSON.ObjectID(),
              name: "Alice",
              age: 14,
              type: "Calico",
            });
          });
        }}
      />

      <Button
        title="Get cat"
        onPress={() => {
          realm.read(() => {
            const alice = realm
              .objects("Cat")
              .find((cat) => cat.name === "Alice");
            setCat(alice);
          });
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
