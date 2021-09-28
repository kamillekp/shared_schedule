import {firebaseServer} from '../../config/firebase/server'

const db = firebaseServer.firestore()
const profile = db.collection('profiles')

export default async (req, res) => {

  const [, token] = req.headers.authorization.split(' ')
  const {user_id} = await firebaseServer.auth().verifyIdToken(token)

  console.log('TOKEN TP: ', token)
  console.log('USER: ', user_id)
  
  const nameProfile = await profile
    .where('userId', '==', user_id)
    .get('username')

  console.log('NAME: ', nameProfile.docs)

  res.status(200).json({ username: nameProfile})
}
