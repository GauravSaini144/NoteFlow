import React from 'react'
import { useEffect, useState } from 'react'
import {nanoid} from "nanoid";
import "./Note.css"
import toast from 'react-hot-toast';
export default function Notes() {
  
  const [notes, setNotes]=useState([]);
  const [data, setData]=useState({id :"", title:"", note:"", date:"", edit:""});
  
  
    
  useEffect(()=>{
    const getNotes=JSON.parse(localStorage.getItem('notes'));
    if(getNotes==null){
      
    }else{
    setNotes(getNotes);}
  },[]);
  

  useEffect(()=>{
    localStorage.setItem('notes', JSON.stringify(notes));
  },[notes]);

   
  const HandleChange=(event)=>{
    setData((currData)=>{
      currData[event.target.name]=event.target.value;
      currData.date=new Date(Date.now()).toLocaleString(); 
      currData.id=nanoid();
      return{
        ...currData
      }
    }
  
    )

  }

   
  const HandleSubmit=(event)=>{
    event.preventDefault();

    if(data.title.length===0 || data.note.length===0){
      toast.error("Please fill the fields");
    }else{
   
    setNotes((prevNote)=>[...prevNote,data]); 
    toast.success("Added Successfully");
    setData({title:"", note:"", date:""})
    }
}

  const DeleteNote=(id)=>{
    const newNotes=notes.filter((note)=> note.id!=id);
    toast.success("removed")
    setNotes(newNotes);
  }

  const UpdateNote=(note)=>{
    document.getElementById('my_modal_3').showModal();
    setData((currdata)=>{
    currdata.id=note.id;
    currdata.title=note.title;
    currdata.note=note.note;
    currdata.date=note.date;
    
    return {
        ...currdata
    }

    })
  }

  const HandleUpdate=(event)=>{
    setData((currdata)=>{
        currdata[event.target.name]=event.target.value;
        currdata.edit=new Date(Date.now()).toLocaleString();
        return {
            ...currdata
        }

    })
  }
  const HandleEditForm=(event)=>{
    event.preventDefault();
    
     
    if(data.title.length===0 || data.note.length===0){
      toast.error("Please fill the fields");
    }else{
     
    const newArr=notes.map((note)=>{
      if(note.id===data.id){
        note.title= data.title;
        note.note=data.note;
        note.date=data.date;
        note.edit=data.edit;

        return note;
      }
      else{
        return note;

      }

    });
    toast.success("Updated");
    setNotes(newArr);
    setData({id :"", title:"", note:"", date:"", edit:""});
    document.getElementById('my_modal_3').close();
  }
  }
  

  const ModalClose=()=>{
    setData({id :"", title:"", note:"", date:"", edit:""});

  }
  return (
    <> <div className='max-w-screen-2xl mx-5 my-10'>
       <form onSubmit={HandleSubmit} className='flex flex-col space-y-6 center'>
    
      <input type="text" className="input input-bordered input-accent w-full max-w-xs" placeholder='Title' name='title' id='title' value={data.title} onChange={HandleChange} />
      <div className='lg:flex lg:flex-row md:flex-col'>
      <textarea className="textarea textarea-accent m-auto w-full " placeholder='Note' name="note" id="note" value={data.note} onChange={HandleChange} ></textarea>
      <button className='lg:mx-2 btn text-white m-auto  text-lg' id='button' style={{width:"30%",height:"70px"}}>Add</button>
      </div>
     </form>
     </div>

     <h1 className=' text-lg w-20 m-auto'>Notes</h1>
    <div className='max-w-screen-2xl  space-y-5 mx-5  align-center justify-center item-center '>
      <hr className='bg-slate-900' />
      {

     notes.map((note)=>{

      return (
        <div key={note.id} className="card w-full NoteCard">
        <div className="card-body">
          <h2 className="card-title font-bold">{note.title}</h2>
          <p className='text-lg'>{note.note}</p>
          <div className='space-y-2 mt-4 '>
            <p className='font-bold'>Created: {note.date}</p>
            {note.edit?
            <p className='font-bold'>Edited: {note.edit}</p>:<></>}
          </div>
          <div className="card-actions justify-end">
         
            <button className="action-button btn text-white border-none" onClick={()=>DeleteNote(note.id)}>Remove</button>
            <button className='btn bg-slate-900 text-white border-none hover:bg-slate-600' onClick={()=>UpdateNote(note)}>Edit</button>
          </div>
        </div>
      </div>
      )
      })
        }</div>

<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={ModalClose}>✕</button>
    </form>
    <h3 className="font-bold text-lg my-2">Edit here</h3>
    <form onSubmit={HandleEditForm} className='space-y-4' >
        <input type="text" className='input input-bordered input-accent w-full max-w-xs' placeholder='title'  value={data.title} name="title" onChange={HandleUpdate}/>
        <textarea type="text" className='textarea textarea-accent m-auto w-full' placeholder='note' name='note' value={data.note} onChange={HandleUpdate} />
        <button className='btn bg-slate-700 text-white border-none hover:bg-slate-600'>Done</button>
    </form>
    
  </div>
</dialog>
        
   </>
  )
}
