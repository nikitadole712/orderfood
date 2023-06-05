import React from 'react';
import Footer from '/home/vmaral/Desktop/Nikita/Projects/orderfood/src/Components/Footer.js';
import Navbar from '/home/vmaral/Desktop/Nikita/Projects/orderfood/src/Components/Navbar.js';
import Card from '../Components/Card';
import { useState,useEffect } from 'react';

export default function Home() {
const [foodCategory, setFoodCat]=useState([]);
const [foodItem, setfoodItem] = useState([]);
const [search, setSearch]= useState([]);



const loadData = async ()=>{
  let response = await fetch("http://localhost:5000/api/getdata",{
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    }
  });
  response = await response.json();

  setfoodItem(response[0]);
  setFoodCat(response[1]);

}
useEffect(()=>{
  loadData();
},[])




  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
        <div className="carousel-inner" id='carousel'>
        <div className="carousel-caption d-none d-md-block" style={{zIndex:"6"}}>
    <div className="d-flex justify-content-center">
      <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      
    </div>
  </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/300x300/?pizza" className="d-block w-100" style={{filter: "brightness(40%)"}} alt="..."/>
    </div>
    
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/300x300/?burger" className="d-block w-100" style={{filter: "brightness(40%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/300x300/?donuts" className="d-block w-100" style={{filter: "brightness(40%)"}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
      </div>
      <div className='container'>
        {
          foodCategory !==[]
          ? foodCategory.map((data)=>{
            return(<div className='row mb-3 '>
            <div key={data._id} className='f-s m-3 fw-bold fs-3'>
              {data.CategoryName}
              </div>
            
              <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }}/>
              {foodItem !==[]
              ? foodItem.filter((items)=>(items.CategoryName === data.CategoryName))
            .map(filterItems=>{
              return(
                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                  <Card foodName={filterItems.name}
                  item={filterItems}
                  options={filterItems.options[0]}
                  imgSrc={filterItems.img}></Card>
                </div>
              )
            }):<div>No such data found</div>}
              </div>
            ) 
            })
          : ""
        }
        
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
