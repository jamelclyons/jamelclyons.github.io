import React from 'react';

function HeaderComponent(props) {
  const { name } = props;

  return (
    <header>
      <div class="header">
        <div class="leftSide">
          <div class="auth"></div>

          <div class="left-menu" id="left-menu"></div>
        </div>

        <div class="center">
          <h1 className="title">{name}</h1>
        </div>

        <div class="rightSide">
          <div class="hamburger" id="toggle" onclick="toggleMenu()">
            <h1 class="top" id="open">
              III
            </h1>

            <h1 class="close" id="close">
              X
            </h1>
          </div>

          <div class="right-menu" id="right-menu"></div>
        </div>
      </div>

      <nav class="dropdown" id="dropdown"></nav>
    </header>
  );
}

export default HeaderComponent;
