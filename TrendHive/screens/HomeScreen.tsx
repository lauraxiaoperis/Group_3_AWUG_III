import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from '@rneui/themed'
import { supabase } from '../lib/supabase'

export default function HomeScreen() {
  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <View style={styles.container}>
      <Text h3>Welcome Home!</Text>
      <Button title="Log Out" onPress={signOut} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
})
