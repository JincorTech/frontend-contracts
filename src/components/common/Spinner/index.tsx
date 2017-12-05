import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

export type Props = {
  button?: boolean
};

const Spinner: SFC<Props> = (props) => {
  const getColor = (): string => {
    return props.button ? '#fff' : '#2aaaff';
  };

  return (
    <div styleName="spinner">
      <div styleName="bounceOne" style={{ backgroundColor: getColor() }}></div>
      <div styleName="bounceTwo" style={{ backgroundColor: getColor() }}></div>
      <div style={{ backgroundColor: getColor() }}></div>
    </div>
  );
};

export default CSSModules(Spinner, require('./styles.css'));
