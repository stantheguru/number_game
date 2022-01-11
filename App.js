import React, {useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGamesScreen from './components/screens/StartGamesScreen';
import GameScreen from './components/screens/GameScreen';
import GameOver from './components/screens/GameOver';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0)
  const configureNewGameHandler = () =>{
    setGuessRounds(0)
    setUserNumber(null)
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
    setGuessRounds(0)
  };

  const gameOverHandler = numOfRounds =>{
    setGuessRounds(numOfRounds)
  }

  let content = <StartGamesScreen onStartGame={startGameHandler}/>
  if(userNumber && guessRounds <=0){
    content = <GameScreen 
    userChoice={userNumber}
    onGameOver={gameOverHandler}
    /> 
  }else if(guessRounds  >0){
    content = <GameOver roundsNumber={guessRounds}
     userNumber={userNumber} onRestart={configureNewGameHandler}/>


  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1
  }
});
