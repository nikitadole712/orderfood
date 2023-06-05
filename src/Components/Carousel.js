import React from 'react'

export default function Carousel() {
  return (
    <div>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
        <div className="carousel-inner" id='carousel'>
        <div className="carousel-caption d-none d-md-block" style={{zIndex:"6"}}>
    <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
    </form>
  </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/300x300/?pizza" className="d-block w-100" style={{filter: "brightness(40%)"}} alt="..."/>
    </div>
    
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/300x300/?burger" className="d-block w-100" style={{filter: "brightness(40%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/300x300/?noodles" className="d-block w-100" style={{filter: "brightness(40%)"}} alt="..."/>
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
  )
}
