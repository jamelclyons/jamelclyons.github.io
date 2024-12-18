import React, { useState } from 'react';

function HeaderComponent(props) {
  const { name } = props;

  const [dropdown, setDropdown] = useState('hide');

  const toggleMenu = () => {
    if (dropdown == 'hide') {
      setDropdown('show');
    } else {
      setDropdown('hide');
    }
  };

  return (
    <>
      <header>
        <div class="header">
          <div className="top">
            <div class="leftSide">
              <div class="auth"></div>

              <div class="left-menu" id="left-menu">
                <a href="/#/about" onClick={toggleMenu}>
                  <h2 className="title">ABOUT</h2>
                </a>

                <a href="/#/portfolio" onClick={toggleMenu}>
                  <h2 className="title">PORTFOLIO</h2>
                </a>
              </div>
            </div>

            <div class="center">
              <a href="/" onClick={toggleMenu}>
                <h1 className="title">{name}</h1>
              </a>
            </div>

            <div class="rightSide">
              <div class="hamburger" id="toggle" onClick={toggleMenu}>
                <h1 class="open" id="open">
                  III
                </h1>

                <h1 class="close" id="close">
                  X
                </h1>
              </div>

              <div class="right-menu" id="right-menu">
                <a href="/#/resume" onClick={toggleMenu}>
                  <h2 className="title">RESUME</h2>
                </a>
                <a href="/#/contact" onClick={toggleMenu}>
                  <h2 className="title">CONTACT</h2>
                </a>
              </div>
            </div>
          </div>

          {dropdown == 'show' && (
            <nav class="dropdown" id="dropdown">
              <ul className="links">
                <li>
                  <a href="/#/about" onClick={toggleMenu}>
                    <h2 className="title">ABOUT</h2>
                  </a>
                </li>
                <li>
                  <a href="/#/portfolio" onClick={toggleMenu}>
                    <h2 className="title">PORTFOLIO</h2>
                  </a>
                </li>
                <li>
                  <a href="/#/resume" onClick={toggleMenu}>
                    <h2 className="title">RESUME</h2>
                  </a>
                </li>
                <li>
                  <a href="/#/contact" onClick={toggleMenu}>
                    <h2 className="title">CONTACT</h2>
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}

export default HeaderComponent;
