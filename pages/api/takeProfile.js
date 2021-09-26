import {firebaseServer} from '../../config/firebase/server'

const db = firebaseServer.firestore()
const profile = db.collection('profiles')

export default async (req, res) => {

  const [, token] = req.headers.authorization.split(' ')
  const {user_id} = await firebaseServer.auth().verifyIdToken(token)
  
  const name = profile.doc(user_id).get({
    username: req.body.username
  })

  console.log('NAME: ', name)

  res.status(200).json({ username: name})
}
