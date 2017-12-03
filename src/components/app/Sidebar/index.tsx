import * as React from 'react';
import { Component } from 'react';
import { Link, IndexLink } from 'react-router';
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
          <Link
            className={link}
            activeClassName={active}
            to={'/cmp'}>My Company</Link>

          <Link
            className={link}
            activeClassName={active}
            to={'/cmp/app/search'}>Search</Link>

          <Link
            className={link}
            activeClassName={active}
            to={'/wallets'}>Wallets</Link>

          <Link
            className={link}
            activeClassName={active}
            to={'/ctr'}>Contracts</Link>

          <Link
            className={link}
            activeClassName={active}
            to={'/msg'}>Messenger</Link>
        </div>
      </div>
    );
  }
}

const StyledComponent = CSSModules(Sidebar, require('./styles.css'));

export default StyledComponent;
