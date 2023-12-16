import * as React from 'react'
import { Alert, Dimensions, StyleSheet, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../constant/routeTypes'
import { Button, Input } from '@rneui/themed'
import { PostRequest } from '../../constant/request'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppDispatch } from '../../redux/hooks'
import { loginAction } from '../../redux/reducer/authReducer'

type LoginProps = NativeStackScreenProps<RootStackParamList>
const { height, width }: any = Dimensions.get("window");

const Login = ({ navigation }: LoginProps): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const [login, setLogin] = React.useState({
        email: "",
        password: "",
    })
    // const checkToken = async () => {
    //     const token = await AsyncStorage.getItem('token');
    //     if (token) {
    //         navigation.replace('Home');
    //     }
    // }
    // React.useEffect(() => {
    //     checkToken();
    // }, [])
    const validate = () => {
        if (login.email === '' && login.email === '') {
            return Alert.alert('Error', 'Please input email and password');
        }
        if (login.email === '') return Alert.alert('Error', 'Please insert email')
        if (login.password === '') return Alert.alert('Error', 'Please insert password')
    }
    const loginHandler = async () => {
        validate();
        const response = await PostRequest('token', {
            grant_type: "client_credentials",
            client_id: 'profes-api',
            client_secret: 'P@ssw0rd'
        }, {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        });
        // console.log('ini error', response);
        if (response.status === 200) {
            const result = response.data.access_token;
            dispatch(loginAction(result));
            AsyncStorage.setItem('token', result);
            navigation.navigate('Home');
        }
    }
    return (
        <View style={styles.container}>
            <Input placeholder='Email' onChangeText={val => setLogin({ ...login, email: val })} />
            <Input placeholder='Password' onChangeText={val => setLogin({ ...login, password: val })} />
            <Button title='Login' onPress={loginHandler} />
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.02
    }
})