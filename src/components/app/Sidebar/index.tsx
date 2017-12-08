import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import * as CSSModules from 'react-css-modules';
import { InjectedCSSModuleProps } from 'react-css-modules';

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
          <a
            className={link}
            href="/cmp">My Company</a>

          <a
            className={link}
            href="/cmp/app/search">Search</a>

          <a
            className={link}
            href="/wallets">Wallets</a>

          <Link
            className={link}
            activeClassName={active}
            to={'/contracts'}>Contracts</Link>

          <a
            className={link}
            href="/msg">Messenger</a>
        </div>
      </div>
    );
  }
}

const StyledComponent = CSSModules(Sidebar, require('./styles.css'));

export default StyledComponent;
