import React, {useState, useRef, useEffect} from 'react'
import {View, StyleSheet, Text, Button, Alert} from 'react-native'


import NumberContainer from '../NumberContainer';
import Card from '../Card';

const generateRandomBetween = (min, max, exclude) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) - min;
    if (rndNum === exclude){
        return generateRandomBetween(min, max, exclude);
    } else{
        return rndNum
    }

}

const GameScreen = props =>{
    const [currenTGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice))
    const currentLow = useRef(1)
    const currentHigh = useRef(100)
    const [rounds, setRounds] = useState(0) 

    const { userChoice, onGameOver } = props;

    useEffect(()=>{
        if (currenTGuess === userChoice){
            onGameOver(rounds);
        }
    }, [currenTGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if(direction === "lower" && currenTGuess < props.userChoice
        || direction === "greater" && currenTGuess > props.userChoice){
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', 
            [{text: 'Sorry', style: 'cancel'}])
            return;   
        }
        if(direction === "lower"){
            currentHigh.current = currenTGuess;
        }else{
            currentLow.current = currenTGuess;

        }
        const nextNumber = generateRandomBetween(currentLow.current, 
            currentHigh.current, currenTGuess );
            setCurrentGuess(nextNumber)
            setRounds(curRounds => curRounds + 1)
    }


return (
    <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <NumberContainer>{currenTGuess}</NumberContainer>

        <Card style={styles.buttonContainer}>
            <Button title="LOWER" onPress={nextGuessHandler.bind(this, "lower")}/>
            <Button title="GREATER" onPress={nextGuessHandler.bind(this, "greater'")}/>
        </Card>

    </View>
)
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'

    }
});

export default GameScreen;