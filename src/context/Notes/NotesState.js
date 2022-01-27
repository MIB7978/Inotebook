import { useState } from "react";
import NoteContext from "./NotesContext";


const NoteState = (props)=>{
   const s1 = {
       name:"suraj",
       class:"5a"
   }
   const [state, setState] = useState(s1);
   const update  = ()=>{
       setTimeout(() => {
           setState({
            name:"sahu",
            class:"5c"
           })
       }, 2000);
   }   
    return (
        <NoteContext.Provider value={{state,update}}>
           {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState