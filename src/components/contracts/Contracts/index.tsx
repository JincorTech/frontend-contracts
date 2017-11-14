import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import ContractsList from '../ContractsList';
import Button from '../Button';


const Contracts: SFC<{}> = ({}) => {
  return (
    <div styleName="content">
      <section styleName="list">
        {/* <Tabs>
          <span>Latest</span>
          <span>Sort by name</span>
          <span>Unsigned contracts</span>
        </Tabs> */}
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

export default CSSModules(Contracts, require('./styles.css'));
