import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, SalesInput } from '../screen';
import { RootStackParamList } from '../constant/routeTypes';
import { useAppSelector } from '../redux/hooks';


const Stack = createNativeStackNavigator<RootStackParamList>();

const RouteApp = () => {
    const token = useAppSelector(state => state.auth.token);
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SalesInput" component={SalesInput} />
        </Stack.Navigator>
    )
}

export default RouteApp;