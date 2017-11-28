import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { SFC } from 'react';
import { connect } from 'react-redux';

import Popup from '../../../components/common/Popup';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

import {
  StateMap as StateProps,
  verifyContract,
  changeVerificationCode
} from '../../../redux/modules/verification/verification';

export type Props = StateProps & DispatchProps & ComponentProps;

export type ComponentProps = {
  isOpen: boolean
  onClose: () => void
}

export type DispatchProps = {
  verifyContract: (code: string) => void
  changeVerificationCode: (payload: { name: string, value: string }) => void
}

const VerificationPopup: SFC<Props> = (props) => {
  const {
    verifyContract,
    changeVerificationCode,
    isOpen,
    onClose,
    verificationCode
  } = props;

  const handleChange = (e) => {
    changeVerificationCode(e.target.value);
  }

  return (
    <Popup
      title=""
      open={isOpen}
      close={onClose}>
      <div styleName="popup">
        <div styleName="header">
          Two-Step Verification
        </div>
        <div styleName="description">
          Please enter the one-time verification code generated by your authenticator app to confirm signing:
        </div>
        <Input styleName="input" placeholder="Enter code" value={verificationCode} onChange={handleChange} />
        <Button onClick={() => verifyContract(verificationCode)}>Submit</Button>
      </div>
    </Popup>
  );
};

const StyledComponent = CSSModules(VerificationPopup, require('./styles.css'));

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => state.verification.verification,
  {
    verifyContract,
    changeVerificationCode
  }
)(StyledComponent);
