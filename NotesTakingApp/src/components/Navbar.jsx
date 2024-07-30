import React from 'react'
import "./Navbar.css"
function Navbar() {
  return (
    <>
     <div className="navbar bg-base-100 sticky" id='navbar'>
       <a className="btn btn-ghost text-xl"><i className="fa-solid fa-quote-left fa-2xs"></i>NoteFlow<i className="fa-solid fa-quote-right fa-2xs"></i></a>
     </div>

    </>
  )
}

export default Navbar