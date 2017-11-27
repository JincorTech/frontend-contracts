import * as React from 'react';
import { SFC } from 'react';
import ContractsItem from '../ContractsItem';
import { Contract } from '../../../redux/modules/contracts/contractsPage';

export type Props = {
  contracts: Contract[];
};

const ContractsList: SFC<Props> = (props) => (
  <div>
    {props.contracts.map((contract, index) => {
      return <ContractsItem key={index} id={contract.id} name={contract.name} date={contract.createdAt} />;
    })}
  </div>
);

export default ContractsList;
