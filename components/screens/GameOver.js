import React from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'


const GameOver = props =>{
    return (
    <View style={styles.screen}>
        <Text>Game is Over</Text>
        <Text>Number of Rounds: {props.roundsNumber}</Text>
        <Text>Number was: {props.userNumber}</Text>
        <Button title="NEW GAME" onPress={props.onRestart}/>
    </View>)
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center',
        justifyContent: 'center'

    },
    

});

export default GameOver;