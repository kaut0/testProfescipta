import * as React from 'react';
import { Alert, Dimensions, FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Primary } from '../../styles/Colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DetailListCard, Headers, RowText, Text } from '../../component';
import { RootStackParamList } from '../../constant/routeTypes';
import { Button, Card, Icon, Image, Input } from '@rneui/themed';
import DatePicker from 'react-native-date-picker';
import { ScrollView } from 'react-native';
import { GetRequest, PostRequest } from '../../constant/request';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getData, itemData } from '../../redux/reducer/itemReducer';

type SalesInputProps = NativeStackScreenProps<RootStackParamList>
const { height, width }: any = Dimensions.get("window");

const SalesInput = ({ navigation }: SalesInputProps): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const [date, setDate] = React.useState(new Date());
    const [open, setOpen] = React.useState(false);
    const [itemName, setItemName] = React.useState('');
    const [price, setPrice] = React.useState(0)
    const [quantyty, setQuantyty] = React.useState(1);
    const [visible, setVisible] = React.useState(false);
    const [selectData, setSelectData] = React.useState([]);
    const [modalEdit, setModalEdit] = React.useState(false);
    const { data } = useAppSelector(state => state.item);
    console.log('ini data', data);
    const getListOrder = async () => {
        const response = await GetRequest('Order/GetItems');
        if (response.status === 200) {
            const result = response.data;
            dispatch(getData(result));
        }
    }
    const generateRandomNumber = () => {
        const min = 1;
        const max = 100;
        const randomNumber =
            Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    };
    const deleteHandler = async (item: any) => {
        const data = item
        const response = await PostRequest('Order/DeleteItem', data, {
            headers: { "state": 12345 }
        });
        console.log('response', response.response);
        getListOrder();
        if (response.status === 200) {
        }
    }

    const onUpdate = async (item: any) => {
        console.log('item', item);
        const response = await PostRequest('Order/UpdateItem', item, {
            headers: { 'Content-Type': 'application/json', "state": 12345 }
        });
        console.log(response)
        if (response.status === 200) {
            getListOrder();
            setModalEdit(false)
        }
    }

    const saveNewItem = async () => {
        const data = {
            ItemId: generateRandomNumber(),
            OrderId: generateRandomNumber(),
            ItemName: itemName,
            Quantity: quantyty,
            Price: price
        }
        const response = await PostRequest('Order/CreateItem', data, {
            headers: { 'Content-Type': 'application/json', "state": 12345 }
        });
        if (response.status === 200) {
            dispatch(itemData(data))
            setVisible(false)
        }
    }
    React.useEffect(() => {
        getListOrder();
    }, [])
    return (
        <ScrollView>
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
                        }}>Sales Information</Text>
                        <Input placeholder='Sales Order Number' inputContainerStyle={{
                            borderWidth: 1,
                        }} />
                        <TouchableOpacity onPress={() => { setOpen(true) }}>
                            <Input
                                disabled
                                placeholder='Sales Order Date'
                                inputContainerStyle={{
                                    borderWidth: 1,
                                }} rightIcon={
                                    <Icon
                                        name='user'
                                        size={24}
                                        color='black'
                                    />} />
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                        <Input placeholder='Sales Order Number' inputContainerStyle={{
                            borderWidth: 1,
                        }} />
                        <Input placeholder='Sales Order Number' inputContainerStyle={{
                            borderWidth: 1,
                        }} />
                    </Card>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        ...styles.padding
                    }}>
                        <Text style={{ fontSize: 20 }}>Detail Sales</Text>
                        <Button title={'Add Item'} onPress={() => { setVisible(true) }} />
                    </View>
                    <View>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => (<DetailListCard data={item}
                                onUpdate={() => {
                                    setSelectData(item)
                                    setModalEdit(true)
                                }}
                                onDelete={() => {
                                    // setSelectData(item);
                                    Alert.alert('Warning', 'Yakin inin menghapus data ini', [
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                        { text: "OK", onPress: () => deleteHandler(item) }
                                    ])
                                }} />)} />
                    </View>

                </View>
            </View>
            <View style={{
                backgroundColor: 'white',
                height: height * 0.2,
                ...styles.padding
            }}>
                <Text>Order Summary</Text>
                <RowText text1="Sub total :" text2="12.000.000" />
                <RowText text1="Total Product :" text2="6 Product" />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 10
                }}>
                    <Button onPress={() => { navigation.goBack() }} title={"Process Order"} buttonStyle={{ width: width * 0.4 }} />
                    <Button onPress={() => { navigation.goBack() }} title={"Cancel"} type='outline' buttonStyle={{ width: width * 0.4 }} />
                </View>
            </View>
            <Modal visible={visible} transparent>
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.68);',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        width: width * 0.8,
                        height: height * 0.5,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 20
                    }}>
                        <Text>New Item</Text>
                        <View style={{
                            marginTop: 20
                        }}>
                            <Text>Item Name</Text>
                            <Input placeholder='Insert Name item' onChangeText={val => setItemName(val)} />
                            <Text>Item Name</Text>
                            <Input placeholder='Price' onChangeText={val => setPrice(val)} keyboardType='numeric' />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: width * 0.35
                            }}>
                                <Text>Quantyty: </Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: width * 0.15,
                                    backgroundColor: '#D9D9D9',
                                    height: height * 0.05,
                                    borderRadius: 10
                                }}>
                                    <TouchableOpacity onPress={() => {
                                        if (quantyty === 1) return;
                                        setQuantyty(prevVal => prevVal - 1)
                                    }}>
                                        <Image
                                            style={{
                                                width: 10,
                                                height: 10
                                            }}
                                            source={require('../../assets/Images/minus.png')} />
                                    </TouchableOpacity>
                                    <Text
                                        style={{ color: 'black', width: width * 0.08, textAlign: 'center' }}>{quantyty}</Text>
                                    <TouchableOpacity onPress={() => { setQuantyty(prevVal => prevVal + 1) }}>
                                        <Image
                                            style={{
                                                width: 10,
                                                height: 10
                                            }}
                                            source={require('../../assets/Images/plus.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',

                            }}>
                                <Text>Total</Text>
                                <Text>{price * quantyty}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                marginTop: 20
                            }}>
                                <Button title={'save'} onPress={saveNewItem} />
                                <Button title={'cancel'} type='outline' onPress={() => { setVisible(false) }} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* Modal Edit */}
            <Modal visible={modalEdit} transparent>
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.68);',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        width: width * 0.8,
                        height: height * 0.5,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 20
                    }}>
                        <Text>New Item</Text>
                        <View style={{
                            marginTop: 20
                        }}>
                            <Text>Item Name</Text>
                            <Input placeholder='Insert Name item'
                                value={selectData?.ItemName}
                                onChangeText={val => setSelectData({ ...selectData, ItemName: val })} />
                            <Text>Item Name</Text>
                            <Input placeholder='Price'
                                value={selectData?.Price}
                                onChangeText={val => setSelectData({ ...selectData, ItemName: val })} keyboardType='numeric' />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: width * 0.35
                            }}>
                                <Text>Quantyty: </Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: width * 0.15,
                                    backgroundColor: '#D9D9D9',
                                    height: height * 0.05,
                                    borderRadius: 10
                                }}>
                                    <TouchableOpacity onPress={() => {
                                        if (setSelectData?.Quantity === 1) return;
                                        setSelectData({ ...selectData, Quantity: selectData.Quantyty - 1 })
                                    }}>
                                        <Image
                                            style={{
                                                width: 10,
                                                height: 10
                                            }}
                                            source={require('../../assets/Images/minus.png')} />
                                    </TouchableOpacity>
                                    <Text
                                        style={{ color: 'black', width: width * 0.08, textAlign: 'center' }}>{selectData?.Quantyty}</Text>
                                    <TouchableOpacity onPress={() => { setSelectData({ ...selectData, Quantity: selectData.Quantyty + 1 }) }}>
                                        <Image
                                            style={{
                                                width: 10,
                                                height: 10
                                            }}
                                            source={require('../../assets/Images/plus.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',

                            }}>
                                <Text>Total</Text>
                                <Text>{selectData?.price * quantyty}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                marginTop: 20
                            }}>
                                <Button title={'save'} onPress={() => { onUpdate(selectData) }} />
                                <Button title={'cancel'} type='outline' onPress={() => { setModalEdit(false) }} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

export default SalesInput;

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