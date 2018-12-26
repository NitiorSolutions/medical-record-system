import React from 'react';
import { Menu, Container, Image } from 'semantic-ui-react';

import './Footer.css';

const Footer = () =>
    (
        <Menu fixed="bottom" inverted compact className="footer">
          <Container>
            <Menu.Menu className="footer-menu">
              All Rights Reserved 2018.
            </Menu.Menu>
          </Container>
        </Menu>
    )

export default Footer;
