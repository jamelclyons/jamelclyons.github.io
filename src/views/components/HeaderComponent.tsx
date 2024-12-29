import React, { useState } from 'react';

interface HeaderComponentProps {
  name: string;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ name }) => {

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
        <div className="header">
          <div className="top">
            <div className="leftSide">
              <div className="auth"></div>

              <div className="left-menu" id="left-menu">
                <a href="/#/about" onClick={toggleMenu}>
                  <h2 className="title">ABOUT</h2>
                </a>

                <a href="/#/portfolio" onClick={toggleMenu}>
                  <h2 className="title">PORTFOLIO</h2>
                </a>
              </div>
            </div>

            <div className="center">
              <a href="/" onClick={toggleMenu}>
                <h1 className="title">{name}</h1>
              </a>
            </div>

            <div className="rightSide">
              <div className="hamburger" id="toggle" onClick={toggleMenu}>
                <h1 className="open" id="open">
                  III
                </h1>

                <h1 className="close" id="close">
                  X
                </h1>
              </div>

              <div className="right-menu" id="right-menu">
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
            <nav className="dropdown" id="dropdown">
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
