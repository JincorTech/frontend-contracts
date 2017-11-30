import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

export type Props = {
  text: string
};

const InputCaption: SFC<Props> = (props) => {
  const {
    text
  } = props;

  return (
    <div styleName="label">
      <img styleName="icon" src={require('../../../assets/images/block.svg')} />
      <span styleName="text">{text}</span>
    </div>
  );
};

export default CSSModules(InputCaption, require('./styles.css'));
