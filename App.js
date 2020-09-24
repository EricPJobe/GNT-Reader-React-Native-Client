import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from 'react-apollo';
import ReaderContext from "./context";
import SelectForm from "./components/select-form"
import {NavigationContainer} from "@react-navigation/native";
import Reader from "./components/reader";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})


export default function App({navigation}) {

    const updateReferences = (referenceFrom, referenceTo, bookName) => {
        setState({
            referenceFrom: referenceFrom,
            referenceTo: referenceTo,
            bookName: bookName,
            updateReferences: () => {}
        });
    }

    const [state, setState] = useState({
        referenceFrom: '',
        referenceTo: '',
        bookName: '',
        updateReferences: updateReferences
    });

    return (
      <ApolloProvider client={client}>
          <ReaderContext.Provider value={state}>
            {/*<Nav />*/}
            {/*<SelectForm />*/}
            {/*  <NavigationContainer>*/}
            {/*      <Stack.Navigator initialRouteName="SelectForm">*/}
            {/*          <Stack.Screen name="SelectForm" component={SelectForm} />*/}
            {/*          <Stack.Screen name="Reader" component={Reader} />*/}
            {/*      </Stack.Navigator>*/}
            {/*  </NavigationContainer>*/}
            <Reader />
          </ReaderContext.Provider>
      </ApolloProvider>
  );
}

