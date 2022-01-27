import React, { useContext, useEffect } from 'react';

import NoteContext from '../context/Notes/NotesContext';
export const About = () => {

  const a = useContext(NoteContext);
  useEffect(() => {
    
    a.update();
  
  }, []);
   
  return (
  <>
    <p>this is about {a.state.name} and {a.state.class}</p>
  </>
  );
};

export default About;
