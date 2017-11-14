import * as React from 'react';
import { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import * as CSSModules from 'react-css-modules';
import { InjectedCSSModuleProps } from 'react-css-modules';
// import { namedRoutes } from '../../../routes';

export type Props = InjectedCSSModuleProps & {

};

export type StateProps = {

};

class Sidebar extends Component<Props, any> {
  render() {
    const { link, active, navigation } = this.props.styles;

    return (
      <div styleName="sidebar">
        <div styleName="logo">
          <img src={require('../../../assets/images/logo.svg')} alt="Jincor" />
        </div>

        <div className={navigation}>
          <IndexLink
            className={link}
            activeClassName={active}
            to={'/'}>Messenger</IndexLink>

          <Link
            className={link}
            activeClassName={active}
            to={'/'}>My Company</Link>

          <Link
            className={link}
            activeClassName={active}
            to={'/'}>Contracts</Link>

          <Link
            className={link}
            activeClassName={active}
            to={'/'}>Accounts</Link>

          <Link
            className={link}
            activeClassName={active}
            to={'/'}>Search</Link>
        </div>

        {/* <div styleName='socials'>
          <a href="http://t.me/jincorICOeng" target="_blank">
            <img src={require('../../../assets/images/social-icons/telegram.svg')} />
          </a>
          <a href="https://www.facebook.com/jincorlimited/" target="_blank">
            <img src={require('../../../assets/images/social-icons/facebook.svg')} />
          </a>
          <a href="https://twitter.com/jincor_ico" target="_blank">
            <img src={require('../../../assets/images/social-icons/twitter.svg')} />
          </a>
        </div> */}
      </div>
    );
  }
};

const StyledComponent = CSSModules(Sidebar, require('./styles.css'));

export default StyledComponent;
