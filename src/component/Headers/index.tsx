import { Image } from '@rneui/themed';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

// const HeaderProps = React.pr

const Headers = (): React.JSX.Element => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/Images/profile.png')} style={{
                width: 50,
                height: 50
            }} />
            <Image source={require('../../assets/Images/burger.png')} style={{
                width: 25,
                height: 25
            }} />
        </View>
    )
}

export default Headers;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})