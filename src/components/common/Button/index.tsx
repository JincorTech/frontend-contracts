import * as React from 'react';
import { SFC } from 'react';
import { Link } from 'react-router';
import * as CSSModules from 'react-css-modules';

import Spinner from '../Spinner';

export type Props = {
  disabled?: boolean
  spinner?: boolean
  href?: string
  to?: string
  onClick?: () => void
};

const Button: SFC<Props> = (props) => {
  const {
    disabled,
    children,
    spinner,
    href,
    to,
    ...restProps
  } = props;

  const getClass = () => disabled ? 'disabled' : 'button';

  const renderElement = () => {
    if (href) {
      return (
        <a
          href={href}
          styleName={getClass()}
          {...restProps}>
          {spinner ? <Spinner /> : children}
        </a>
      );
    }

    if (to) {
      return (
        <Link
          to={to}
          styleName={getClass()}
          {...restProps}>
          {spinner ? <Spinner /> : children}
        </Link>
      );
    }

    return (
      <button
        type="button"
        styleName={getClass()}
        {...restProps}
      >
        {spinner ? <Spinner /> : children}
      </button>
    );
  };

  return renderElement();
};

export default CSSModules(Button, require('./styles.css'));
