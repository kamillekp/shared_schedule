/*  1) Criar banco de dados no Firestore do Firebase

    2) Em Project Settings é fornecido uma conta de 
    serviço que vai para o config/firebase/server.js
    
    3) Em Project Settings é fornecido um arquivo 
    JSON com a chave privada */

import admin from 'firebase-admin'

const app = firebase.apps.length
?firebase.app()
:firebase.initializeApp({
    credential: admin.credential.cert({
        type: 'service_account',
        auth_uri: '',
        token_uri: '',
        auth_provider_x509_cert_url: '',
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID ,
        client_cert: process.env.CLIENT_CERT
    })  
}) 


export default admin

/*  4) O index.js vira client.js e no novo index.js 
    guarda as exportações:
     
    import firebaseServer from '/server'
    import firebaseClente, {persistenteMode} from '/client'
    
    export {firebaseClient, persistenteMode, firebaseServer}*/
