import * as React from 'react';
import { Text as GenericText } from 'react-native';

const Text =(props:any)=>(
    <GenericText style={{
        ...props.style
    }} {...props}>
        {props.children}
    </GenericText>
)

export default Text;