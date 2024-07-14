import client from 'api/client'
import Cookies from 'js-cookie'
import { SignUpParams } from 'interfaces/sign_up'
import { SignInParams } from 'interfaces/sign_in'

// sign_up
export const signUp = (params: SignUpParams) => {
  return client.post('auth', params)
}

// sign_in
export const signIn = (params: SignInParams) => {
  return client.post('auth/sign_in', params)
}

// sign_out
export const signOut = () => {
  return client.delete('auth/sign_out', { headers: {
    'access-token': Cookies.get('_access_token'),
    'client': Cookies.get('_client'),
    'uid': Cookies.get('_uid')
  }})
}

// Retrieve authenticated users
export const getCurrentUser = () => {
  if(!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return
  return client.get('/auth/sessions', { headers: {
    'access-token': Cookies.get('_access_token'),
    'client': Cookies.get('_client'),
    'uid': Cookies.get('_uid')
  }})
}