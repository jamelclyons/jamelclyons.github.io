import React from 'react';

import AddFrameworks from './components/AddFrameworks';
import AddLanguages from './components/AddLanguages';
import AddProject from './components/AddProject';
import AddProjectTypes from './components/AddProjectTypes';
import AddTechnologies from './components/AddTechnologies';

function Add() {
  return (
    <section className="add">
      <>
        <AddLanguages />

        <AddFrameworks />

        <AddProjectTypes />
        
        <AddTechnologies />

        <AddProject />
      </>
    </section>
  );
}

export default Add;
