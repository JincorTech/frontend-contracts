import * as React from 'react';
import * as CSSModules from 'react-css-modules';

import Popup from '../../common/Popup';
import Input from '../../common/Input';
import EmployeesList from '../../common/EmployeesList';

const ChooseEmployeePopup = () => {
  return (
    <Popup
      title=""
      open={true}>
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
