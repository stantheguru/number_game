import React, {useState} from 'react'
import {View, 
    StyleSheet, 
    Button, 
    Text, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert
    
} from 'react-native'


import Card from '../Card';
import Input from '../Input';
import colors from '../../constants/colors';
import NumberContainer from '../NumberContainer';

const StartGamesScreen=props=>{

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState(); 

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))

    }

    const resetInputHandler = () =>{
        setEnteredValue('');
        setConfirmed(false)
    };

    const confrimInputHandler=()=>{
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber>99){
            Alert.alert('Invalid Number', 'Number has to be a number between 1 and 99', 
            [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()


    };

    let confirmedOutput;
    if (confirmed){
        confirmedOutput = 
        <Card style={styles.summarryContainer}>
        <Text> You selected</Text>
        <NumberContainer>
        {selectedNumber}
        </NumberContainer>

        <Button title = "START GAME" 
        onPress={()=>props.onStartGame(selectedNumber)}/>

        </Card>
    }

    
    return (
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss()
        }}>
            
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game</Text>

            <Card style={styles.inputContainer}>
                <Text >Select a Number</Text>
                <Input blurOnSubmit style={styles.input} 
                autoCorrect={false} 
                keyboardType="number-pad"
                maxLength={2}
                auroCapitalize="none"
                onChangeText = {numberInputHandler}
                value = {enteredValue}
                />
                <View style={styles.buttonContainer} >
                    <View style={styles.button}><Button color={colors.primary} title="Reset" onPress={resetInputHandler}/></View>
                    <View style={styles.button}><Button  color={colors.accent} title="Confirm" onPress={confrimInputHandler}/></View>

                </View>
                
            </Card>

                {confirmedOutput}

        </View>
        </TouchableWithoutFeedback>
    )

};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center',

    },
    title:{
        fontSize:20,
        marginVertical:10,

    },
    inputContainer:{
        width:300,
        maxWidth:'80%',
        alignItems:'center',
        


    },
    buttonContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:15
    },
    button:{
        width:100
    }, 
    input: {
        width: 50,
        textAlign: 'center'
    },
    summarryContainer: {
        marginTop:20,
        alignItems: 'center'


    }
    
});

export default StartGamesScreen;