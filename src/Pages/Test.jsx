import React from "react";
import {getAuth, signInAnonymously} from "firebase/auth";
import {getToken, onMessage} from "firebase/messaging";
// import {messaging, db, storage  } from '../config/firebase';

import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Test() {



// const activarMensajes = async ()=> {
//   const token = await getToken(messaging,{
//     vapidKey: "BN0YqZbP85vCOYjjXQZi8sgHLDYqIzYfin8ebH4rnhi0AMJ0VCm9ohPz4yuEfZBiZKT-E7r26l30s8j8_aUzsjQ"
//   }).catch(error => console.log("No token generated"));


//   if(token) console.log("Generated token:",token);
//   if(!token) console.log("No generated token");
// }

// React.useEffect(()=>{
//   getToken(messaging, { vapidKey: 'BN0YqZbP85vCOYjjXQZi8sgHLDYqIzYfin8ebH4rnhi0AMJ0VCm9ohPz4yuEfZBiZKT-E7r26l30s8j8_aUzsjQ' }).then((currentToken) => {
//     if (currentToken) {
//       // Send the token to your server and update the UI if necessary
//       console.log('Send the token to your server and update the UI if necessary',currentToken);
//       // ...
//     } else {
//       // Show permission request UI
//       console.log('Show permission request UI.');
//       // ...
//     }
//   }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // ...
//   });


// }, []);

  return (
  <div> 
{/* <h1>Wenas</h1>

<ToastContainer />

<button
onClick={activarMensajes}
> Recieve notification</button> */}

  </div>
  );
}

export default Test;