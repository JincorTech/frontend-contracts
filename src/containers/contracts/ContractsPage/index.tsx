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
  StateMap as ContractsStateProps,
  SortingType,
  Contract,
  FilteringType
} from '../../../redux/modules/contracts/contractsPage';
import {
  StateMap as AppStateProps
} from '../../../redux/modules/app/app';
import Spinner from '../../../components/common/Spinner';

/**
 * Types
 */
export type Props = StateProps & DispatchProps;

export type StateProps = ContractsStateProps & AppStateProps;

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
      changeFiltering,
      admin
    } = this.props;

    const getFilteredContracts = (contracts: Contract[], filtering: FilteringType) => {
      if (filtering === FilteringType.Unsigned) {
        return contracts.filter((contract: Contract) => !contract.signedAt);
      } else {
        return contracts;
      }
    };

    if (!contracts.length) {
      return <Spinner/>
    }

    return (
      <div>
        <section styleName="list">
          <TabPanel sorting={sorting} filtering={filtering} changeSorting={changeSorting} changeFiltering={changeFiltering}/>
          <ContractsList contracts={getFilteredContracts(contracts, filtering)}/>
        </section>
        <section styleName="add-contract">
          <Button disabled={!admin} to='/ctr/app/create/new'>
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
  (state) => {
    return {
      ...state.contracts.contractsPage,
      ...state.app.app
    }
  },
  {
    fetchContracts,
    changeSorting,
    changeFiltering
  }
)(styledComponent);
