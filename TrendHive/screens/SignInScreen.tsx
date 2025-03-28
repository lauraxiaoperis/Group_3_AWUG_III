import React, { useState } from 'react'
import { View, Alert, StyleSheet } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input, Text } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

export default function SignInScreen() {
  const navigation = useNavigation<NavigationProp>()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    console.log('Signing in with:', email, password)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      console.error('Auth error:', error.message)
      Alert.alert('Error', error.message)
    } else {
      console.log('Login successful, navigating to Home')
      navigation.navigate('Home')
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text h3>Sign In</Text>
      <Input label="Email" onChangeText={setEmail} value={email} placeholder="email@address.com" autoCapitalize="none" />
      <Input label="Password" onChangeText={setPassword} value={password} secureTextEntry placeholder="Password" autoCapitalize="none" />
      <Button title="Log In" disabled={loading} onPress={signInWithEmail} />
      <Button title="Create Account" type="clear" onPress={() => navigation.navigate('SignUp')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
})
