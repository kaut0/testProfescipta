import * as React from 'react';
import { Dimensions, TextInput, View } from 'react-native';
import { Text } from '..';
import { TouchableOpacity } from 'react-native';
import { Image } from '@rneui/themed';

const { height, width }: any = Dimensions.get("window");

type Liscardprops = React.PropsWithChildren<{
    data: any,
    onDelete: any
    onUpdate: any
}>

const DetailListCard = ({ data, onDelete = () => { }, onUpdate = () => { } }: Liscardprops): React.JSX.Element => {
    console.log('ini data', data)
    const [quantyty, setQuantyty] = React.useState(data?.Quantity || 0);
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
            borderRadius: 20,
            marginBottom: 10
        }}>
            <View style={{
                width: width * 0.6
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: height * 0.01
                }}>
                    <Text>{data?.itemName}</Text>
                    <Text>QTY</Text>
                    <Text>Total</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Text>{data?.Price}</Text>
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
                    <Text>{data?.price * quantyty}</Text>
                </View>
            </View>
            <View style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                {/* <Image source={require('../../assets/Images/')} /> */}
                <TouchableOpacity onPress={() => { onUpdate() }}>
                    <Image
                        style={{
                            width: 25,
                            height: 25
                        }}
                        source={require('../../assets/Images/pencil.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onDelete() }}>
                    <Image
                        style={{
                            width: 25,
                            height: 25
                        }}
                        source={require('../../assets/Images/trash2.png')} />
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default DetailListCard;