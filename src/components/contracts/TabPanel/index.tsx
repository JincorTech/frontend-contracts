import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import Tab from './Tab';
import { SortingType, FilteringType } from '../../../redux/modules/contracts/contractsPage';

export type Props = {
  sorting: SortingType
  filtering: FilteringType
  changeSorting: (sorting: SortingType) => void
  changeFiltering: (filtering: FilteringType) => void
  showFilterByName: boolean
};

const TabPanel: SFC<Props> = (props) => {
  const {
    sorting,
    filtering,
    changeSorting,
    changeFiltering,
    showFilterByName
  } = props;

  const isFilteringActive = filtering === FilteringType.Unsigned;

  return (
    <div styleName="tabs">
      <Tab name={'Latest'} onSelect={() => changeSorting(SortingType.ByDate)}
        isActive={sorting === SortingType.ByDate} />
      {showFilterByName ?
        <Tab name={'Sort by name'} onSelect={() => changeSorting(SortingType.ByName)}
          isActive={sorting === SortingType.ByName} /> : null
      }
      <Tab name={'Unsigned contracts'} onSelect={() => changeFiltering(isFilteringActive ? FilteringType.All : FilteringType.Unsigned)}
        isActive={isFilteringActive}/>
    </div>
  );
};

export default CSSModules(TabPanel, require('./styles.css'));
