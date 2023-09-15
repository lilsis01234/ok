import React from 'react'
import { Typography} from '@material-tailwind/react';
import './slider.css'
import axios from 'axios';
import { useEffect,useState } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



const SliderNouveauxCollabs = () => {

    const [listeCollabs, setListCollab] = useState([]);
    const today = new Date();
  
      //Récupération de la liste des collaborateurs
      const fetchCollaborateur = () => {
        axios.get('http://localhost:4000/api/collaborateur/all_collaborateurs')
          .then(res => {setListCollab(res.data)})
          .catch(err => console.log(err));
      }
      
      useEffect(() => {
        fetchCollaborateur();
      }, [])

      //Voir la liste des collaborateurs embauchés en ce jour
      const listeCollab = listeCollabs.filter((liste) => {
      const date = new Date(liste.dateEmbauche);
      const currentMonth = today.getMonth();
      const employeeMonth = date.getMonth();
      return employeeMonth === currentMonth;
      });

      //slider
      function SlideCard(){
        const settings = {
         dots: true,
         infinite: true,
         speed: 500,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay:true,
         appendDts: (dots) => {
           return <ul style = {{margin : "0px"}}>{dots}</ul>
         },

       };
   return(
       <>
       {/* affichage du slider */}
        <Slider {...settings}>
          {listeCollab.map((collab, index)=>{
           return(
               <section className="homeSlide contentWidth">
               <div className="box d_flex top" key={index}> 
                    <div className='img_new_collab'>
                       <img src={`http://localhost:4000/${collab.image}`} alt={collab.nom} className="w-75 h-80 object-cover" />
                    </div>
                    <div className='info_new_collab'>
                       <Typography variant="h1" className="text-center text-3xl p-5 nom">{collab.nom} {collab.prenom}</Typography>
                       <h4 className="text-black text-center text-m" >{collab.titrePoste}</h4>
                       <h5 className="text-black text-center text-m">{collab.departement}</h5>
                    </div>
               </div>
               </section>
           )
          })}
         </Slider>  
       
       </>
   )
}

  return (
    <div>
      {listeCollab.length !==0 ?
         (<div className='nouveaux-collabs'><Typography variant="h1" className="text-white text-center text-3xl p-5">Nos nouveaux collaborateurs</Typography>
         <center>
         <SlideCard/> 
         </center></div>) : (<div className='nouveaux-collabs'><Typography variant="h1" className="text-white text-center text-3xl p-5">Nous n'avons pas eu de nouveaux collaborateurs durant ce mois</Typography></div>)}
    </div>
  )
}

export default SliderNouveauxCollabs