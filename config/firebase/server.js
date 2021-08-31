/*  1) Criar banco de dados no Firestore do Firebase

    2) Em Project Settings é fornecido uma conta de 
    serviço que vai para o config/firebase/server.js
    
    3) Em Project Settings é fornecido um arquivo 
    JSON com a chave privada */

import firebaseServer from 'firebase-admin'

const app = firebaseServer.apps.length
? firebaseServer.app()
: firebaseServer.initializeApp({
    credential: firebaseServer.credential.cert({
        type: "service_account",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        client_cert: process.env.FIREBASE_CLIENT_CERT, 
    })  
}) 

export  {firebaseServer}

/*  4) O index.js vira client.js e no novo index.js 
    guarda as exportações:
     
    import firebaseServer from '/server'
    import firebaseClente, {persistenteMode} from '/client'
    
    export {firebaseClient, persistenteMode, firebaseServer}*/

/* VAI NO .ENV
## Chaves de index.js ou client.js, se tiver "deployado"
## Chaves que vêm do arquivo JSON da config do Firebase (server.js)*/
