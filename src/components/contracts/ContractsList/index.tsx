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
      return <ContractsItem key={index} id={contract.id}
                userName={contract.userName} userId={contract.userId} userAvatar={contract.userAvatar}
                date={contract.createdAt} status={contract.status} />;
    })}
  </div>
);

export default ContractsList;
