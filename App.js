import 'react-native-gesture-handler';
import React from 'react';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from 'react-apollo';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import Reader from "./components/reader";
import FlashcardTrainer from "./components/flashcard-trainer";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ReferenceModal from "./components/reference-modal";

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const client = new ApolloClient({
  uri: 'http://35.170.245.131:3000/graphql',
  // uri: 'http://192.168.86.109:3000/graphql',
  cache: new InMemoryCache()
})

function MainTabScreen() {
    return (
        <Tab.Navigator
            initialRouteName="Reader"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if(route.name === 'Reader') {
                        iconName = focused
                            ? 'book-open'
                            : 'book-open-outline';
                    } else if(route.name === 'Flashcard Trainer') {
                        iconName = focused
                            ? 'card-bulleted'
                            : 'card-bulleted-outline';
                    }
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />
                }
            })}
            tabBarOptions={{
                activeTintColor: "#1d78c1",
                inactiveTintColor: "grey"
            }}
        >
            <Tab.Screen
                name="Reader"
                component={Reader}
                // initialParams={{
                //     bookName: '',
                //     referenceFrom: '',
                //     referenceTo: ''
                // }}
            />
            <Tab.Screen
                name="Flashcard Trainer"
                component={FlashcardTrainer}
            />
        </Tab.Navigator>
    )
}


export default function App({navigation}) {

    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <RootStack.Navigator mode="modal" headerMode="none">
                    <RootStack.Screen name="Main" component={MainTabScreen} />
                    <RootStack.Screen name="References" component={ReferenceModal} />
                </RootStack.Navigator>
            </NavigationContainer>
        </ApolloProvider>
  );
}

