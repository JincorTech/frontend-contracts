import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import ContractsList from '../../../components/contracts/ContractsList';
import Button from '../../../components/common/Button';
import TabPanel from '../../../components/contracts/TabPanel';

const ContractsPage: SFC<{}> = ({}) => {
  return (
    <div>
      <section styleName="list">
        <TabPanel/>
        <ContractsList/>
      </section>
      <section styleName="add-contract">
        <Button>
          + Add contract
        </Button>
        <div styleName="contracts-number">
          <span styleName="number">250</span>
          <span styleName="caption">Number of contracts</span>
        </div>
      </section>
    </div>
  );
};

export default CSSModules(ContractsPage, require('./styles.css'));
