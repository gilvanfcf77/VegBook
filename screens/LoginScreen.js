import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation } from 'react-native'
import firebase from 'firebase'


export default class LoginScreen extends React.Component {

    static navigationOptions = {
        headerShown: false

    }

    state = {
        email: '',
        password: '',
        errorMessage: null
    }

    handleLogin = () => {
        const { email, password } = this.state

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {

        LayoutAnimation.easeInEaseOut();

        return (
            <View style={styles.container}>
                <StatusBar barStyle={'light-content'}></StatusBar>

                {/* <Image source={require('../assets/authHeader.png')} style={{ marginTop: -500 }}></Image> */}

                <Image source={require('../assets/loginLogo.png')} style={styles.image}></Image>

                <Text style={styles.greeting}>
                    {'Hello again.\nWelcome back.'}
                </Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='none'
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        >

                        </TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize='none'
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        >

                        </TextInput>

                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleLogin}
                >
                    <Text style={{ color: "#fff", fontWeight: '500' }}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignSelf: 'center', marginTop: 32 }} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={{ color: '#414959', fontSize: 13 }}>
                        New to VegBook?
                        <Text style={{ fontWeight: '500', color: '#3f882c' }}> Sign Up</Text>
                    </Text>
                </TouchableOpacity>

            </View>




        )

    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'

    },

    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },

    error: {
        color: '#E9446A',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'

    },

    form: {
        marginBottom: 48,
        marginHorizontal: 30

    },

    inputTitle: {
        color: "#175d03",
        fontSize: 10,
        textTransform: 'uppercase'

    },

    input: {
        borderBottomColor: '#000000',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#000000'
    },

    button: {
        marginHorizontal: 30,
        backgroundColor: '#3f882c',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'

    },

    image: {

        alignSelf: 'center',
        height: 50,
        width: 200,

    }

})