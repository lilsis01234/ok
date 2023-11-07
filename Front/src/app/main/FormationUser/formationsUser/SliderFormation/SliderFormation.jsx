import React from 'react'
import Slider from "react-slick";
import {useState,useEffect} from 'react';

function SlideCard({ formation }){
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
     {formation.map((form, index)=>{
       return(
           <section className="homeSlide contentWidth">
           <div className="box d_flex top" key={index}> 
                <div className='info_new_collab'>
                   <h1 className="text-center text-3xl p-5 nom">{form.nom} {form.prenom}</h1>
                   <h4 className="text-black text-center text-m" >{form.titrePoste}</h4>
                   <h5 className="text-black text-center text-m">{form.departement}</h5>
                </div>
           </div>
           </section>
       )
     })}
     </Slider>  
   
   </>
)
}

const SliderFormation = () => {
  const[formations, setFormations]= useState([]);
  return (
    <div>
        <SlideCard formation={formations}/>
    </div>
  )
}

export default SliderFormation