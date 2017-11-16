import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import ContractTypeItem from '../ContractTypeItem';

const ContractTypesForm: SFC<{}> = () => {
  return (
    <div styleName="types">
      <div styleName="header">
        <div styleName="caption">New smart contract</div>
        <div styleName="subcaption">Select type of smart contract to create:</div>
      </div>
      <ContractTypeItem name={'Employment Agreement'} description={'Smart contract for Employment Agreement'} disabled={false}/>
      <ContractTypeItem name={'Supply Contract'} description={'Soon'} disabled={true}/>
      <ContractTypeItem name={'Service Agreement'} description={'Soon'} disabled={true}/>
      <ContractTypeItem name={'Purchase & Sale Agreement'} description={'Soon'} disabled={true}/>
      <ContractTypeItem name={'Lease'} description={'Soon'} disabled={true}/>
      <ContractTypeItem name={'Insurance Agreement'} description={'Soon'} disabled={true}/>
      <ContractTypeItem name={'Sponsorship Agreement'} description={'Soon'} disabled={true}/>
      <ContractTypeItem name={'Franchise Agreement'} description={'Soon'} disabled={true}/>
      <ContractTypeItem name={'Option Agreement'} description={'Soon'} disabled={true}/>
    </div>
  );
};

export default CSSModules(ContractTypesForm, require('./styles.css'));
