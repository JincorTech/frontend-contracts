import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

export type Props = {
  text: string
};

const Caption: SFC<Props> = (props) => {
  return (
    <div styleName="caption">
      {props.text}
    </div>
  );
};

export default CSSModules(Caption, require('./styles.css'));
