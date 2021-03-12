import React from 'react';
import axios from 'axios';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const Home = () => {
    
  const [result, setResult] = React.useState();

  React.useEffect(() => {
    axios.get('http://10.0.2.2:3333/users')
        .then(res => {
          setResult(res.data.message)
        })
        .catch(err => setResult(err.message))
  }, []);

  return (
    <View style={styles.view}>
      <Text>{result}</Text>  
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Home;
