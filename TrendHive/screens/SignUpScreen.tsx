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

type NavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

export default function SignUpScreen() {
  const navigation = useNavigation<NavigationProp>()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signUpWithEmail() {
    setLoading(true)
    console.log('Signing up with:', email, password)

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      console.error('Sign up error:', error.message)
      Alert.alert('Error', error.message)
    } else {
      Alert.alert('Success', 'Please check your email for confirmation')
      navigation.navigate('SignIn')
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text h3>Register</Text>
      <Input label="Email" onChangeText={setEmail} value={email} placeholder="email@address.com" autoCapitalize="none" />
      <Input label="Password" onChangeText={setPassword} value={password} secureTextEntry placeholder="Password" autoCapitalize="none" />
      <Button title="Register" disabled={loading} onPress={signUpWithEmail} />
      <Button title="Back to Sign In" type="clear" onPress={() => navigation.navigate('SignIn')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
})
