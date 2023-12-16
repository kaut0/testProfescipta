import * as React from 'react';
import { View } from 'react-native';
import { Text } from '..';
import moment from 'moment';

type OrderType = React.PropsWithChildren<{
    data: any
}>

const OrderListCard = ({ data }: OrderType): React.JSX.Element => {
    return (
        <View style={{
            backgroundColor: 'white',
            shadowColor: "#000",
            justifyContent: 'space-between',
            flexDirection: 'row',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,

            padding: 20,
            borderRadius: 20
        }}>
            <Text>{data?.CustomerName}</Text>
            <Text>{data?.OrderNo}</Text>
            <Text>{moment(data?.OrderDate).format('lll')}</Text>
        </View>
    )
}

export default OrderListCard;