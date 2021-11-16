import React from 'react';
import { Text } from 'react-native';

export default class Comment extends React.Component {

    render() {

        const { value } = this.props;

        return (
            <Text style={{ marginLeft: 32, marginRight: 32, marginTop: 32, fontSize: 11 }}>
                {value}
            </Text>
        )
    }

}