import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Popup from '../../../components/common/Popup';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

import {
  StateMap as StateProps,
  verify,
  changeVerificationCode,
  resetState,
  VerifyType
} from '../../../redux/modules/verification/verification';

export type Props = StateProps & DispatchProps & ComponentProps;

export type ComponentProps = {
  isOpen: boolean
  onClose: () => void,
  contractId?: string
};

export type DispatchProps = {
  verify: (payload: { code: string, type: VerifyType }) => void
  changeVerificationCode: (payload: { name: string, value: string }) => void
  resetState: () => void
};

class VerificationPopup extends Component<Props, {}> {
  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const RedirectPeriod = 1000;

    const {
      verify,
      changeVerificationCode,
      isOpen,
      onClose,
      verificationCode,
      verifyError,
      contractId,
      inProgress,
      verificationFinished,
      resetState
      } = this.props;

    const handleChange = (e) => {
      changeVerificationCode(e.target.value);
    };

    const validateCode = (): boolean => {
      return !!verificationCode.length;
    };

    const isVerified = (): boolean => {
      return !verifyError;
    };

    const renderVerificationFormBody = () => (
      <div>
        <div styleName="header">
          Two-Step Verification
        </div>
        <div styleName="description">
          Please enter the one-time verification code generated by your authenticator app to confirm signing:
        </div>
        <Input styleName="input" placeholder="Enter code" value={verificationCode} onChange={handleChange} />
        <Button disabled={!validateCode()} onClick={() => verify({ code: verificationCode, type: VerifyType.DeployContract })}
                spinner={inProgress}>Submit</Button>
      </div>
    );

    const renderSuccessMessageAndRedirect = () => {
      if (contractId) {
        setTimeout(() => {
          browserHistory.push(`/ctr/app/contract/${contractId}/`);
        }, RedirectPeriod);
      }

      return (
        <div>
          <img styleName="verified-icon" src={require('../../../assets/images/signed.svg')} />
          <span styleName="verified-message">Successfully verified!</span>
        </div>
      );
    };

    const renderFailedMessage = () => {
      return (
        <div>
          <img styleName="verified-icon" src={require('../../../assets/images/signed.svg')} />
          <span styleName="verified-message">Verification failed</span>
          <span styleName="verify-error">{verifyError}</span>
          <Button onClick={resetState}>Retry</Button>
        </div>
      );
    };

    const renderPopupBody = () => {
      if (!verificationFinished) {
        return renderVerificationFormBody();
      } else if (isVerified()) {
        return renderSuccessMessageAndRedirect();
      } else {
        return renderFailedMessage();
      }
    };

    return (
      <Popup
        title=""
        open={isOpen}
        close={onClose}>
        <div styleName="popup">
          {renderPopupBody()}
        </div>
      </Popup>
    );
  }
}

const StyledComponent = CSSModules(VerificationPopup, require('./styles.css'));

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => state.verification.verification,
  {
    verify,
    changeVerificationCode,
    resetState
  }
)(StyledComponent);
