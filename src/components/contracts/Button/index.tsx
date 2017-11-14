import * as React from 'react';
import { SFC } from 'react';
import { Link } from 'react-router';
import * as CSSModules from 'react-css-modules';

import Spinner from '../Spinner';

export type Props = {
  spinner?: boolean
  size?: number
  styl?: string
  href?: string
  to?: string
};

const Button: SFC<Props> = (props) => {
  const {
    children,
    spinner,
    size,
    styl,
    href,
    to,
    ...restProps
  } = props;

  const getSize = (val) => {
    switch (val) {
      case 'small':
        return 'small';
      default:
        return '';
    }
  };

  const getStyle = (val) => {
    switch (val) {
      case 'secondary':
        return 'secondary';
      default:
        return '';
    }
  };

  const getClasses = () => (
    `button ${getSize(size)} ${getStyle(styl)}`
  );

  const renderElement = () => {
    if (href) {
      return (
        <a
          href={href}
          styleName={getClasses()}
          {...restProps}>
          {spinner ? <Spinner /> : children}
        </a>
      );
    }

    if (to) {
      return (
        <Link
          to={to}
          styleName={getClasses()}
          {...restProps}>
          {spinner ? <Spinner /> : children}
        </Link>
      );
    }

    return (
      <button
        type="button"
        styleName={getClasses()}
        {...restProps}
      >
        {spinner ? <Spinner /> : children}
      </button>
    );
  };

  return renderElement();
};

export default CSSModules(Button, require('./styles.css'));
