import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, Touchable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import Fire from '../Fire';
import * as ImagePicker from 'expo-image-picker'

const firebase = require('firebase');
require('firebase/firestore');

export default class PostScreen extends React.Component {
    state = {
        title: '',
        ingredients: '',
        preparation: '',
        image: null,

    }

    componentDidMount() {
        this.getPhotoPermission()
    }



    getPhotoPermission = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status != 'granted') {
                alert('Percisamos de permissão para acessar sua câmera');

            }

        }

    }

    handlePost = () => {
        Fire.shared.addPost({
            title: this.state.title.trim(),
            ingredients: this.state.ingredients.trim(),
            preparation: this.state.preparation.trim(),
            localUri: this.state.image

        })
            .then(ref => {
                this.setState({ title: '', ingredients: '', preparation: '', image: null })
                this.props.navigation.navigate('Home')
            })
            .catch(error => {
                alert(error);
            })
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        })

        if (!result.cancelled) {
            this.setState({
                image: result.uri
            })
        }

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home') }}>
                        <Icon name='arrow-back-outline' size={24} color='#D8D9DB' ></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handlePost}>
                        <Text style={{ fontWeight: '500' }}>Post</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.inputContainer}>
                    {/* <Image source={require('../assets/tempAvatar.png')} style={styles.avatar}></Image> */}

                    <TextInput
                        autoFocus={true}
                        placeholder='Título da receita'
                        onChangeText={title => this.setState({ title })}
                        style={{ fontSize: 24 }}
                        value={this.state.title}
                    >
                    </TextInput>

                    

                    <TextInput
                        multiline={true}
                        numberOfLines={10}
                        placeholder='Lista de ingredientes'
                        onChangeText={ingredients => this.setState({ ingredients })}
                        value={this.state.ingredients}
                    >
                    </TextInput>

                    <TextInput
                        multiline={true}
                        numberOfLines={10}
                        placeholder='Descreva o modo de preparo'
                        onChangeText={preparation => this.setState({ preparation })}
                        value={this.state.preparation}
                    >
                    </TextInput>

                </View>

                <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                    <Icon name='camera-outline' size={32} color='#D8D9DB'></Icon>
                </TouchableOpacity>

                <View styles={{ marginHorizontal: 32, marginTop: 32, height: 150, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={{ uri: this.state.image }} style={{ width: '50%', height: '50%'}}></Image>
                </View>
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingVertical: 32,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D9DB'

    },

    inputContainer: {
        margin: 32,
        flexDirection: 'column',

    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    },

    photo: {
        alignItems: 'center',
        marginHorizontal: 32,
        backgroundColor: "#175d03",
        borderRadius: 3

    }

})