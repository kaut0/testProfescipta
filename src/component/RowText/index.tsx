import * as React from 'react';
import { View } from 'react-native';
import { Text } from '..';

type RowTextProp = React.PropsWithChildren<{
    text1: string,
    text2: string,
}>

const RowText = ({ text1, text2 }: RowTextProp): React.JSX.Element => {
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Text>{text1}</Text>
            <Text>{text2}</Text>
        </View>
    )
}

export default RowText;