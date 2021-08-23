import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
const firebase = require('firebase');
require('firebase/firestore');

export default class PostScreen extends React.Component {
    state = {
        title: '',
        ingredients: '',
        preparation: '',
        image: null,

    }

    render() {

        const { navigation } = this.props;

        const post = navigation.state.params.post;

        console.log(navigation.state.params.post);


        return (
            <ScrollView>

                <SafeAreaView style={styles.container}>
                    <View>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home') }}>
                                <Icon name='arrow-back-outline' size={24} color='#D8D9DB' ></Icon>
                            </TouchableOpacity>

                        </View>

                        <Image source={{ uri: post.image }} style={styles.postImage} resizeMode='cover'></Image>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 32, marginTop: 32 }}>
                            <View>
                                <Text style={styles.title}>{post.title}</Text>
                                <Text style={styles.name}>por {post.name}</Text>
                                <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                            </View>

                        </View>


                        <Text style={{ color: '#175d03', marginLeft: 32, marginTop: 32 }}>Ingredientes:</Text>
                        <Text style={styles.post}>
                            {post.ingredients}
                        </Text>

                        <Text style={{ color: '#175d03', marginLeft: 32, marginTop: 32 }}>Modo de preparo:</Text>
                        <Text style={styles.post}>
                            {post.preparation}
                        </Text>



                        <View style={{ flexDirection: 'row', marginLeft: 32, marginTop: 32 }}>
                            <TouchableOpacity>
                                <Icon name='heart' size={24} color='#73788B' style={{ marginRight: 16 }}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name='chatbubbles' size={24} color='#73788B'></Icon>
                            </TouchableOpacity>
                            {/* <Icon name='heart' size={24} color='#73788B' style={{marginRight: 16}}></Icon> */}
                        </View>

                        <TextInput
                            backgroundColor='#fff'
                            marginLeft={32}
                            marginRight={32}
                            marginTop={32}
                            multiline={true}
                            numberOfLines={5}
                            placeholder='O que você achou da receita?'
                        >
                        </TextInput>

                        <TouchableOpacity style={{ backgroundColor: "#175d03", marginLeft: 32, marginRight: 32 }} onPress={this.pickImage}>
                            <Text style={{ textAlign: 'center', color: '#fff' }}>Enviar comentário</Text>
                        </TouchableOpacity>

                        <View style={{ marginTop: 32, backgroundColor: '#f2f2f2' }}>
                            <Text style={{ marginLeft: 32 }}>Comentários: </Text>
                            <Text style={{ marginLeft: 32, marginRight: 32, marginTop: 32, fontSize: 11 }}>João diz: orem ipsum dolor sit amet, consectetur adipiscing elit. Duis eros orci, rhoncus eget massa eget, lacinia laoreet lorem. Nunc sed mauris eros. Nunc ut lorem et velit consequat luctus. Phasellus a scelerisque nisl, et lobortis metus. Cras congue lectus massa, non mollis urna dictum eget. Donec tincidunt nibh vitae leo aliquet, non maximus lectus mollis. Mauris consequat, enim at placerat posuere, lectus orci tempor sapien, ut pellentesque ipsum nibh eu quam. </Text>
                            <Text style={{ marginLeft: 32, marginRight: 32, marginTop: 32, fontSize: 11 }}>Maria diz: orem ipsum dolor sit amet, consectetur adipiscing elit. Duis eros orci, rhoncus eget massa eget, lacinia laoreet lorem. Nunc sed mauris eros. Nunc ut lorem et velit consequat luctus. Phasellus a scelerisque nisl, et lobortis metus. Cras congue lectus massa, non mollis urna dictum eget. Donec tincidunt nibh vitae leo aliquet, non maximus lectus mollis. Mauris consequat, enim at placerat posuere, lectus orci tempor sapien, ut pellentesque ipsum nibh eu quam. </Text>
                        </View>
                    </View>

                </SafeAreaView>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7fff2'

    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingVertical: 32,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D9DB'

    },

    headerTitle: {
        fontSize: 20,
        fontWeight: '500'
    },

    name: {
        fontSize: 11,
        fontWeight: '500',
        color: '#454D65'
    },

    timestamp: {
        fontSize: 11,
        color: '#C4C6CE',
        marginTop: 4
    },

    post: {
        marginTop: 16,
        fontSize: 14,
        marginLeft: 32,
        color: '#838899'
    },

    postImage: {
        width: '100%',
        height: 200
    },

    title: {
        color: '#175d03',
        fontSize: 24
    }

})
