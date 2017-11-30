import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

export type Props = {
  value: string
  description: string
};

const WalletInput: SFC<Props> = (props) => {
  const {
    value,
    description
  } = props;

  return (
    <div>
      <div styleName="input">
        <div styleName="value">
          {value}
        </div>
        <div styleName="description">
          {description}
        </div>
      </div>
      <div styleName="label">
        <img styleName="icon" src={require('../../../../assets/images/block.svg')}/>
        <span styleName="text">Choose</span>
      </div>
    </div>
  );
};

export default CSSModules(WalletInput, require('./styles.css'));
