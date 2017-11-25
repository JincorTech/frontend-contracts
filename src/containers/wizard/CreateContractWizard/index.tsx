import * as React from 'react';
import { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import * as CSSModules from 'react-css-modules';
import Avatar from '../../../components/common/Avatar';

import ContractTypesForm from '../../../containers/wizard/ContractTypesForm';
import ChooseEmployeeForm from '../../../containers/employmentAgreement/ChooseEmployeeForm';
import ChooseEmployeePopup from '../../../components/employmentAgreement/ChooseEmployeePopup';
import CreateContractForm from '../../../containers/employmentAgreement/CreateContractForm';
import VerificationPopup from '../../../components/verification/VerificationPopup';

export type ComponentProps = {
};

export type Props = RouteComponentProps<ComponentProps, {}>;

const CreateContractWizard: SFC<Props> = (props) => {
  return (
    <div styleName="layout">
      <div styleName="header">
        <div styleName="back">
          <div styleName="icon">
            {'<'}
          </div>
          <div styleName="caption">
            {'New smart contract'}
          </div>
        </div>
        <div styleName="avatar">
          <Avatar src={'/src'} fullName={''} id={''}/>
        </div>
      </div>
      <div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default CSSModules(CreateContractWizard, require('./styles.css'));
