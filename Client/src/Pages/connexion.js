import React from 'react';
import "./connexion.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Auth from '../Auth';
import jwtDecode from 'jwt-decode';
import {motion} from 'framer-motion';
import NavbarCreated from '../Composants/NavbarCreated';
import BoutonRetour from '../Composants/BoutonRetour';
import MapButton from '../Composants/MapBouton';
import AccueilButton from '../Composants/AccueilBouton';
import '../Composants/button.css'
import InscriptionButton from '../Composants/InscriptionBouton';
import ConnexionButton from '../Composants/ConnexionBouton';
import { Alert } from 'react-bootstrap';
function Connexion() {
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState(false);
  const {isAuthenticated, SetisAuthenticated} = useContext(Auth);
  const [ConnexionReussie, setConnexionReussie] = useState(false);
  const [data,setData]=useState({
    "email":"",
    "password":""
  });

  const location = useLocation();
  const errorMessage = location.state?.errorMessage;


  /*function isTokenValid(Token) {
    if(!Token){
      return false
    }
    const secretKey = process.env.KEY_TOKEN;
    const decodedToken = jwtDecode(Token, secretKey);

    // Vérification de la date d'expiration
    const currentDate = new Date().getTime() / 1000;
    if (decodedToken.exp < currentDate) {
      // Le token a expiré
      return false;
    }
  
    // Le token est encore valide
    return true;
  }

  */
  let [token, Settoken]=useState(null);






  function handlechange(event) {
    event.preventDefault();

    const newdata={...data};
    newdata[event.target.id]=event.target.value;
    setData(newdata);
    console.log(newdata)

  }

  const navigate= useNavigate();

  function handlesubmit(event) {
    event.preventDefault();
    const url_connexion = "http://localhost:3000/connexion";
    console.log("data fetch",data)
    const secretKey = process.env.KEY_TOKEN;
    //const decodedToken = jwt_decode(localStorage.getItem('token'), secretKey);
    //console.log(decodedToken)
  fetch(url_connexion, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    credentials: 'include',
    body: JSON.stringify({
      name: `${data.name}`,
      email:`${data.email}`,
      password:`${data.password}`
    }),
  })
  .then((response) =>response.json())
  .then((data) =>{
    console.log("data",data);
    if(data.token){
      localStorage.setItem('token',data.token);
      Settoken(data.token);
      navigate("/geocache");
      localStorage.setItem('id',data.id);
      console.log("mon id réçu est :",localStorage.getItem('id'));
   //   SetisAuthenticated(true);
       //SetisAuthenticated(data.authenticated);
    }

   if( localStorage.getItem('token') && data.authenticated){
      navigate("/geocache");
      localStorage.setItem('id',data.id);
      console.log("mon id réçu est :",localStorage.getItem('id'));
      

    }

    if(localStorage.getItem('token')  && !data.authenticated ){
      setAlert(data.message);
      setShowAlert(true);
      setTimeout(() => {
        navigate("/connexion");
          setShowAlert(false);

        }, 3000);
    // navigate("/connexion",{ state: { errorMessage: data.message} } );
    }
    if(data.non_connect){
      setAlert(data.message);
      setShowAlert(true);
      setTimeout(() => {
        navigate("/connexion");
          setShowAlert(false);

        }, 3000);
      //navigate("/connexion",{ state: { errorMessage: `${data.message}, cliquer sur le bouton pour vous inscrire si vous  ne posséder pas de compte ou reconnectez-vous` } });
    }
    
  })
}
    


 /*useEffect(() =>{
  console.log("use effect");
  console.log("isauthen:", isAuthenticated);
    if(isAuthenticated && isTokenValid(token)){
      navigate("/geocache");

    }
    else if(isAuthenticated && !isTokenValid(token)){
      console.log("yoyoyoyo")
      SetisAuthenticated(false)
      navigate("/connexion",{ state: { errorMessage: data.message} } );
    }
  })*/





  return (
   <div>
      
    <motion.div
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -300, opacity: 0 }}
    >
    <div className='stuck'>
    <h2 style={{textAlign:'center'}}>Connexion</h2>
    
   

    <form onSubmit={(e)=>handlesubmit(e)} >
    
      
      <div className="form-group">
        <label>Email:</label>
          
          <input  onChange={(e)=>handlechange(e)} value={data.email} type="email" className="form-control" id="email" name="user_email" placeholder="email"/>
        
      </div>

      <div className="form-group">
        <label>Password:</label>
          
          <input  onChange={(e)=>handlechange(e)} value={data.password} type="password" className="form-control" id="password" name="user_password" placeholder="password" required/>
        
      </div>


      <br/>
      <button type="submit">Se connecter</button>

    </form>
    
    {showAlert && (
                <Alert style={{position:'absolute',top:50 + 'vh'}}variant="success" onClose={() => setShowAlert(false)} dismissible className="my-3">
                        {alert}
                </Alert>
            )}
    </div>
  </motion.div>
  <div className='AccueilButton'>
                <AccueilButton></AccueilButton>
    </div>
    <div className='InscriptionButton'>
                <InscriptionButton></InscriptionButton>
    </div>
    <div className='ConnexionButton'>
               <ConnexionButton></ConnexionButton>
    </div>
    <div className='MapButton'>
                <MapButton></MapButton>
    </div>
    
  </div>
  );

}

export default Connexion;









