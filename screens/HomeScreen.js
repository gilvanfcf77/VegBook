import React from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import firebase from 'firebase'


export default class HomeScreen extends React.Component {

    state = {
        posts: [],
        users: []
    }

    setUsers = async () => {

        firebase.firestore()
            .collection('users')
            .onSnapshot(snapshot => {
                const users = []
                snapshot.forEach(doc => {
                    let data = doc.data()
                    users.push(data)
                })
                this.setState({ users: users })
            })
    }

    setPosts = async () => {
        firebase.firestore()
            .collection('posts')
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot => {
                const posts = []
                snapshot.forEach(doc => {
                    // console.log(doc.data());
                    let data = doc.data()
                    let allUsers = this.state.users;
                    for (var i = 0; i < allUsers.length; i++) {
                        //
                        if (allUsers[i].uid === data.uid) {
                            data['name'] = allUsers[i].name;
                        }
                    }
                    posts.push(data)
                })
                this.setState({ posts: posts })
            })
    }   

    componentDidMount() {
        this.setUsers()
        this.setPosts()
    }

    handleLike = (post) => {
        console.log(post);
    }

    renderPost = post => {
        // var color = '#0ff'
        return (
            <View style={styles.feedItem} id={post.index}>
                {/* <Image source={post.avatar} style={styles.avatar} /> */}
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.title}>{post.title}</Text>
                            <Text style={styles.name}>por {post.name}</Text>
                            <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                        </View>
                        {/* <TouchableOpacity>
                            <Icon name='ellipsis-horizontal' size={24} color='#73788B'></Icon>
                        </TouchableOpacity> */}
                    </View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PostDetails', { post: post })}>
                        <Image source={{ uri: post.image }} style={styles.postImage} resizeMode='cover'></Image>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <Text style={{color: '#73788B', marginTop: 5}}>12 </Text>
                        <TouchableOpacity onPress={() => this.handleLike(post)}>
                            <Icon name='heart' size={24} color='#73788B' style={{ marginRight: 16 }}></Icon>
                        </TouchableOpacity>

                        <Text style={{color: '#73788B', marginTop: 5}}>25 </Text>
                        <TouchableOpacity>
                            <Icon name='chatbubbles' size={24} color='#73788B'></Icon>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../assets/loginLogo.png')} style={styles.headerLogo}/>
                    {/* <Text style={styles.headerTitle}>Feed</Text> */}
                </View>


                {/* <View style={styles.filters}>
                    <TouchableOpacity><Text style={{ color: '#4b96eb' }}>Todas</Text></TouchableOpacity>
                    <Text>|</Text>
                    <TouchableOpacity><Text style={{ color: '#4b96eb' }}>Sem lactose</Text></TouchableOpacity>
                    <Text>|</Text>
                    <TouchableOpacity><Text style={{ color: '#4b96eb' }}>Ovolactovegetarianas </Text></TouchableOpacity>
                    <Text>|</Text>
                    <TouchableOpacity><Text style={{ color: '#4b96eb' }}>Veganas</Text></TouchableOpacity>
                </View> */}


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
        // backgroundColor: '#f7fff2'

    },

    header: {
        paddingTop: 32,
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
        marginHorizontal: 0,

    },

    feedItem: {
        backgroundColor: '#fff',
        // borderRadius: 5,
        paddingTop: 16,
        paddingBottom: 16,
        flexDirection: 'row',
        marginVertical: 0,
        borderColor: "#DCDCDC",
        borderWidth: 1
    },
    // avatar: {
    //     width: 36,
    //     height: 36,
    //     borderRadius: 18,
    //     marginRight: 16
    // },
    name: {
        fontSize: 11,
        fontWeight: '500',
        color: '#454D65',
        marginLeft: 10
    },

    timestamp: {
        fontSize: 11,
        color: '#C4C6CE',
        marginTop: 4,
        marginLeft: 10
    },

    post: {
        marginTop: 0,
        fontSize: 14,
        color: '#838899'
    },

    postImage: {
        width: '100%',
        height: 300,
        borderRadius: 5,
        marginVertical: 16,
        // marginRight: 50,
    },

    title: {
        color: '#175d03',
        fontSize: 16,
        marginLeft: 10

    },
    filters: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginTop: 16
    },
    headerLogo:{
        width: 150,
        height: 40
    }

})