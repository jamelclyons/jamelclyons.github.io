import React from 'react';

import AddFrameworks from './components/AddFrameworks';
import AddLanguages from './components/AddLanguages';
import AddProjectTypes from './components/AddProjectTypes';
import AddTechnologies from './components/AddTechnologies';

function AddSkill() {
  return (
    <section className="add">
      <>
        <AddLanguages />

        <AddFrameworks />

        <AddProjectTypes />
        
        <AddTechnologies />
      </>
    </section>
  );
}

export default AddSkill;
