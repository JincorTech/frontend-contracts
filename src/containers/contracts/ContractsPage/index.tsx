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
  FilteringType,
  ContractStatus
} from '../../../redux/modules/contracts/contractsPage';
import {
  StateMap as AppStateProps
} from '../../../redux/modules/app/app';
import Spinner from '../../../components/common/Spinner';
import EmptyContracts from '../../../components/contracts/EmptyContracts';

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
      spinner,
      sorting,
      filtering,
      changeSorting,
      changeFiltering,
      admin
    } = this.props;

    const getNotDraftContracts = (contracts: Contract[]) => {
      return contracts.filter((contract: Contract) => contract.status !== ContractStatus.Draft);
    }

    const getFilteredContracts = (contracts: Contract[], filtering: FilteringType) => {
      const notDraftContracts = getNotDraftContracts(contracts);

      if (filtering === FilteringType.Unsigned) {
        return notDraftContracts.filter((contract: Contract) => contract.status !== ContractStatus.Signed);
      } else {
        return notDraftContracts;
      }
    };

    if (spinner) {
      return <Spinner/>;
    }

    return (
      <div>
        {contracts.length ?
          <section styleName="list">
            <TabPanel sorting={sorting} filtering={filtering} changeSorting={changeSorting}
                      changeFiltering={changeFiltering} showFilterByName={admin}/>
            <ContractsList contracts={getFilteredContracts(contracts, filtering)} />
          </section> :
          <EmptyContracts />
        }
        <section styleName="add-contract">
          <Button disabled={!admin} to="/ctr/app/create/new">
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
    };
  },
  {
    fetchContracts,
    changeSorting,
    changeFiltering
  }
)(styledComponent);
