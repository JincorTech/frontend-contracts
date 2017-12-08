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
  isSubmit?: boolean
  onClick?: () => void
  value?: string
  styleName?: string
};

const Button: SFC<Props> = (props) => {
  const {
    disabled,
    children,
    spinner,
    href,
    to,
    isSubmit,
    onClick,
    value,
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
          {spinner ? <Spinner button={true}/> : children}
        </a>
      );
    }

    if (to) {
      return (
        <Link
          to={to}
          styleName={getClass()}
          {...restProps}>
          {spinner ? <Spinner button={true}/> : children}
        </Link>
      );
    }

    if (isSubmit) {
      return (
        spinner ?
        <div styleName={getClass()} {...restProps}>
          <Spinner button={true}/>
        </div> :
        <input type="submit"
          styleName={getClass()}
          value={value}
          {...restProps}
        />
      );
    }

    return (
      <button
        type="button"
        styleName={getClass()}
        onClick={onClick}
        {...restProps}
      >
        {spinner ? <Spinner button={true}/> : children}
      </button>
    );
  };

  return renderElement();
};

export default CSSModules(Button, require('./styles.css'));
