import React from 'react';

import AddFrameworks from './components/add/AddFrameworks';
import AddLanguages from './components/add/AddLanguages';
import AddProjectTypes from './components/add/AddProjectTypes';
import AddTechnologies from './components/add/AddTechnologies';

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
