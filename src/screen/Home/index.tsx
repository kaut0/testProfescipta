import * as React from 'react'
import { Alert, BackHandler, Dimensions, StyleSheet, View } from 'react-native'
import { Headers, OrderListCard, Text } from '../../component'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../constant/routeTypes'
import { Primary } from '../../styles/Colors'
import { Button, Card, Icon, Image, Input } from '@rneui/themed'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GetRequest } from '../../constant/request'
import { orderGet } from '../../redux/reducer/orderReducer'
import moment from 'moment'

type HomeProps = NativeStackScreenProps<RootStackParamList>
const { height, width }: any = Dimensions.get("window");

const Home = ({ navigation, route }: HomeProps): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector(state => state.order);
    const { token } = useAppSelector(state => state.auth);
    const [dataOrder, setDataOrder] = React.useState([]);
    const [date, setDate] = React.useState(new Date());
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [dateSelect, setDateSelect] = React.useState<any>(null);


    const getOrderList = async () => {
        const response = await GetRequest('Order/GetOrderList');
        if (response.status === 200) {
            const result = response.data;
            dispatch(orderGet(result));
            setDataOrder(result);
        }
    }

    const searchListHandler = (key: string, date: any) => {
        let arr = Array.isArray(dataOrder);
        let newArr = dataOrder;
        if (arr) {
            if (search !== '') {
                let currentData = newArr.filter((val) => val.CustomerName.toLowerCase().includes(key.toLowerCase()))
                return setDataOrder(currentData);
            }
            if (dateSelect !== null) {
                let newData = newArr.filter((itm) => moment(itm.OrderDate).format('lll').includes(moment(date).format('lll')))
                return setDataOrder(newData);
            }
            setDataOrder(data)

        }
    }

    React.useEffect(() => {
        searchListHandler(search, date)
    }, [dateSelect, search])

    React.useEffect(() => {
        getOrderList();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.padding}>
                <Headers />
                <Text style={{
                    fontSize: 36,
                    fontWeight: '600',
                    color: 'white'
                }}>Sales Order List</Text>
            </View>
            <View style={{ ...styles.home, ...styles.padding }}>
                <Card containerStyle={{
                    borderRadius: width * 0.03,
                    backgroundColor: '#EEEEEE',
                }}>
                    <Text style={{
                        fontSize: 16, fontWeight: 600,
                        marginBottom: height * 0.02
                    }}>Search</Text>
                    <Input placeholder='Keyword'
                        onChangeText={val => setSearch(val)}
                        inputContainerStyle={{
                            borderWidth: 1,
                        }} />
                    <TouchableOpacity onPress={() => { setOpen(true) }}>
                        <Input
                            disabled
                            value={dateSelect}
                            placeholder='Order Date'
                            inputContainerStyle={{
                                borderWidth: 1,
                            }} rightIcon={
                                <Image
                                    style={{
                                        height: 20,
                                        width: 20
                                    }}
                                    source={require('../../assets/Images/calender.png')} />
                            } />
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                            setDateSelect(date);
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </Card>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    ...styles.padding
                }}>
                    <Text>Order List</Text>
                    <Text>Total Item: 50</Text>
                </View>
                <Button
                    onPress={() => navigation.navigate('SalesInput')}
                    containerStyle={{ width: width * 0.2, marginBottom: height * 0.03, left: width * 0.03, borderRadius: 10 }} title='Add' />
                <FlatList data={dataOrder}
                    ItemSeparatorComponent={() => <View style={{ height: height * 0.03 }} />}
                    contentContainerStyle={{
                        paddingBottom: height * 0.03,
                        paddingHorizontal: width * 0.03
                    }}
                    renderItem={({ item }) => (
                        <OrderListCard data={item} />
                    )} />
            </View>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Primary,
    },
    padding: {
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.02
    },
    home: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        borderTopEndRadius: width * 0.08,
        borderTopStartRadius: width * 0.08
    }
})