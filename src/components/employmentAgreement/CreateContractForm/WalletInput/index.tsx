import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import InputCaption from '../../../common/InputCaption';

export type Props = {
  value: string
  description: string
};

const WalletInput: SFC<Props> = (props) => {
  const {
    value,
    description
  } = props;

  const getEllipsisWalletAddress = () => {
    return `${value.slice(0, 12)}...${value.slice(-3)}`;
  };

  return (
    <div>
      <div styleName="input">
        <div styleName="value">
          {getEllipsisWalletAddress()}
        </div>
        <div styleName="description">
          {description}
        </div>
      </div>
      <InputCaption text={'Choose'}/>
    </div>
  );
};

export default CSSModules(WalletInput, require('./styles.css'));
