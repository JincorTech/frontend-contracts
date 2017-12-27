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
import { isInteger } from '../../../helpers/common/format';

export type Props = StateProps & DispatchProps & ComponentProps;

export type ComponentProps = {
  isOpen: boolean
  onClose: () => void,
  contractId?: string,
  type: VerifyType
};

export type DispatchProps = {
  verify: (payload: { code: string, type: VerifyType }) => void
  changeVerificationCode: ( value: string ) => void
  resetState: () => void
};

class VerificationPopup extends Component<Props, {}> {
  private verifyCodeInput;

  public componentDidUpdate(): void {
    if (this.verifyCodeInput) {
      this.verifyCodeInput.inputElement.focus();
    }
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const RedirectPeriod = 1000;
    const VerificationCodeLength = 6;
    const VerificationCodePartLength = VerificationCodeLength / 2;

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
      resetState,
      type
    } = this.props;

    const getSourceVerificationCode = ( formattedCode: string): string => {
      return formattedCode.replace(' ', '');
    };

    const handleChange = (e) => {
      const value = getSourceVerificationCode(e.target.value);
      if (value && (value.length > VerificationCodeLength || !isInteger(value))) {
        return;
      }

      changeVerificationCode(value);
    };

    const getFormattedVerificationCode = ( code: string ): string => {
      if (code.length <= VerificationCodePartLength) {
        return code;
      }
      return `${code.substring(0, VerificationCodePartLength)} ${code.substring(VerificationCodePartLength)}`;
    };

    const validateCode = (): boolean => {
      return verificationCode.length === VerificationCodeLength;
    };

    const isVerified = (): boolean => {
      return !verifyError;
    };

    const renderVerificationFormBody = () => (
      <div>
        <div styleName="header">
          <span styleName="caption">Two-Step Verification</span>
        </div>
        <div styleName="description">
          We sent the code to your email address. Please, check your inbox or spam folder.
        </div>
        <Input styleName="input" placeholder="Enter code" value={getFormattedVerificationCode(verificationCode)}
                onChange={handleChange} ref={(input) => this.verifyCodeInput = input}/>
        <Button styleName="button" disabled={!validateCode()} onClick={() => verify({ code: verificationCode, type: type })}
                spinner={inProgress}>Submit</Button>
      </div>
    );

    const renderSuccessMessageAndRedirect = () => {
      if (contractId) {
        setTimeout(() => {
          // React-router hack to remounting component
          browserHistory.push(`/contracts/`);
          browserHistory.push(`/contracts/app/contract/${contractId}`);
        }, RedirectPeriod);
      }

      return (
        <div styleName="success-container">
          <img styleName="verified-icon" src={require('../../../assets/images/signed.svg')} />
          <span styleName="verified-message">Successfully verified!</span>
        </div>
      );
    };

    const renderFailedMessage = () => {
      return (
        <div>
          <div styleName="failed-container">
            <img styleName="verified-icon" src={require('../../../assets/images/failed.svg')} />
            <span styleName="verified-message">Verification failed</span>
            <span styleName="verify-error">{verifyError || 'Unknown error'}</span>
          </div>
          <Button styleName="button" onClick={resetState}>Retry</Button>
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
        styleName="popup"
        title=""
        open={isOpen}
        close={onClose}>
        {renderPopupBody()}
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
