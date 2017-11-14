import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import ContractsItem from '../ContractsItem';

const ContractsList: SFC<{}> = ({}) => {
  return (
    <div styleName="list">
      <ContractsItem name={'Maxim Brook'} date={'01/10/2017'}/>
      <ContractsItem name={'Mike Jefferson'} date={'01/10/2017'}/>
      <ContractsItem name={'Claudia Bullock'} date={'01/10/2017'}/>
    </div>
  );
};

export default CSSModules(ContractsList, require('./styles.css'));
