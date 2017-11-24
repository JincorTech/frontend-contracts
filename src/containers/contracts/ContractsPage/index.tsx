import * as React from 'react';
import { Component } from 'react';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import ContractsList from '../../../components/contracts/ContractsList';
import Button from '../../../components/common/Button';
import TabPanel from '../../../components/contracts/TabPanel';
import {
  fetchContracts,
  changeSorting,
  changeFiltering,
  StateMap as StateProps,
  SortingType,
  FilteringType
} from '../../../redux/modules/contracts/contractsPage';

/**
 * Types
 */
export type Props = StateProps & DispatchProps;

export type DispatchProps = {
  fetchContracts: () => void
  changeSorting: (sorting: SortingType) => void
  changeFiltering: (filtering: FilteringType) => void
};

/**
 * Component
 */
class ContractsPage extends Component<Props, {}> {
  public componentDidMount() {
    this.props.fetchContracts();
  }

  public render() {
    const {
      contracts,
      sorting,
      filtering,
      changeSorting,
      changeFiltering
    } = this.props;

    return (
      <div>
        <section styleName="list">
          <TabPanel sorting={sorting} filtering={filtering} changeSorting={changeSorting} changeFiltering={changeFiltering}/>
          <ContractsList contracts={contracts}/>
        </section>
        <section styleName="add-contract">
          <Button>
            + Add contract
          </Button>
          <div styleName="contracts-number">
            <span styleName="number">{contracts.length}</span>
            <span styleName="caption">Number of contracts</span>
          </div>
        </section>
      </div>
    );
  }
}

/**
 * Export
 */
const styledComponent = CSSModules(ContractsPage, require('./styles.css'));

export default connect<StateProps, DispatchProps, Props>(
  (state) => state.contracts.contractsPage,
  {
    fetchContracts,
    changeSorting,
    changeFiltering
  }
)(styledComponent);
