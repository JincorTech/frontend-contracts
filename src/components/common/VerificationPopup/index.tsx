import * as React from 'react';
import * as CSSModules from 'react-css-modules';

import Popup from '../Popup';
import Input from '../Input';
import Button from '../Button';

const VerificationPopup = () => {
  return (
    <Popup
      title=""
      open={true}>
      <div styleName="popup">
        <div styleName="header">
          Two-Step Verification
        </div>
        <div styleName="description">
          Please enter the one-time verification code generated by your authenticator app to confirm signing:
        </div>
        <Input styleName="input" placeholder="Enter code"/>
        <Button>Submit</Button>
      </div>
    </Popup>
  );
};

const StyledComponent = CSSModules(VerificationPopup, require('./styles.css'));

export default StyledComponent;
