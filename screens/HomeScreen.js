import React from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import firebase from 'firebase'


export default class HomeScreen extends React.Component {

    state = {
        posts: null,
        name: ''
    }

    

    getUserName = (userId) => {
        const names = ['Albert', 'Kayle', 'Jordan', 'Michael', 'Diana']
        // firebase.firestore()
        //     .collection('users')

        //     .get()

        //     .then(snapshot => {

        //         snapshot.forEach(doc => {

        //             let data = doc.data()

        //             if (data.uid === userId) {
        //                 console.log(data.name);
        //                 this.setState({ name: data.name })
        //             }
        //         })
        //     })
        //     .catch(error => console.log(error))

        var randomName = names[Math.floor(Math.random()*names.length)];

        return randomName

    }

    setPosts = () => {
        firebase.firestore()
            .collection('posts')
            .orderBy("timestamp", "desc")
            .get()
            .then(snapshot => {
                const posts = []
                snapshot.forEach(doc => {
                    let data = doc.data()
                    this.getUserName(doc.uid);
                    data['name'] = this.getUserName();
                    posts.push(data)
                })
                this.setState({ posts: posts })
            })
            .catch(error => console.log(error))
    }

    handleSomething() {
        this.setPosts();
      
      }

    componentDidMount(){
        this.setPosts()
        
    }

    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <Image source={post.avatar} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.title}>{post.title}</Text>
                            <Text style={styles.name}>por {post.name}</Text>
                            <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                        </View>
                        <TouchableOpacity>
                            <Icon name='ellipsis-horizontal' size={24} color='#73788B'></Icon>
                        </TouchableOpacity>
                    </View>

                    {/* <Text style={styles.post}>
                        {post.ingredients}
                    </Text>

                    <Text style={styles.post}>
                        {post.preparation}
                    </Text> */}

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PostDetails', { post: post })}>
                        <Image source={{ uri: post.image }} style={styles.postImage} resizeMode='cover'></Image>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity>
                            <Icon name='heart' size={24} color='#73788B' style={{ marginRight: 16 }}></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name='chatbubbles' size={24} color='#73788B'></Icon>
                        </TouchableOpacity>
                        {/* <Icon name='heart' size={24} color='#73788B' style={{marginRight: 16}}></Icon> */}
                    </View>

                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Feed</Text>
                </View>

                <FlatList
                    style={styles.feed}
                    data={this.state.posts}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />

            </View>

        )

    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f7fff2'

    },

    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EBECF4',
        shadowColor: '#454D65',
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10

    },

    headerTitle: {
        fontSize: 20,
        fontWeight: '500'
    },

    feed: {
        marginHorizontal: 16,

    },

    feedItem: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 8,
        flexDirection: 'row',
        marginVertical: 8,
        borderColor: "#175d03",
        borderWidth: 1
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
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
        color: '#838899'
    },

    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        // marginVertical: 16,
        marginRight: 50
    },

    title: {
        color: '#175d03',
        fontSize: 16

    }

})