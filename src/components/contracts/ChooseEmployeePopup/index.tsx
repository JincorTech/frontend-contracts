import * as React from 'react';
import { connect } from 'react-redux';
import * as CSSModules from 'react-css-modules';

// import { closeInvitePopup, inviteUsers } from '../../../redux/modules/referrals/invitePopup';

import Popup from '../Popup';
import Input from '../Input';
import EmployeesList from '../EmployeesList';

const ChooseEmployeePopup = (props) => {
  const {
    open,
    spinner,
    closeInvitePopup,
    inviteUsers
  } = props;

  return (
    <Popup
      title=""
      open={true}
      // close={() => closeInvitePopup()}
      >
      <div>
        <Input styleName="input" placeholder="Search"/>
        <div styleName="header">
          Employees
        </div>
        <EmployeesList/>
      </div>
    </Popup>
  );
};

const StyledComponent = CSSModules(ChooseEmployeePopup, require('./styles.css'));

export default StyledComponent;

// export default connect(
//   (state) => ({
//     open: state.referrals.invitePopup.open,
//     spinner: state.referrals.invitePopup.spinner
//   }),
//   {
//     closeInvitePopup,
//     inviteUsers
//   }
// )(InvitePopup);
