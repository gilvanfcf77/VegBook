import React from 'react';
import Comment from './Comment';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';

export default class CommentsList extends React.Component {

    render() {

        const { comments } = this.props;

        function List() {
            const listItems = comments?.map((comment) =>
                <Comment value={comment}/>
            );
            return (
                <View style={{ marginTop: 32, backgroundColor: '#f2f2f2' }}>
                    <Text style={{ marginLeft: 32 }}>Comentários: </Text>
                    {listItems}
                </View>
            );
        }
        return (
            <List comments={comments}></List>

        )
    }

}