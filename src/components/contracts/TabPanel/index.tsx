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
}

const TabPanel: SFC<Props> = (props) => {
  const {
    sorting,
    filtering,
    changeSorting,
    changeFiltering
  } = props;

  return (
    <div styleName="tabs">
      <Tab name={'Latest'} onSelect={() => changeSorting(SortingType.ByDate)}
        isActive={sorting === SortingType.ByDate}/>
      <Tab name={'Sort by name'} onSelect={() => changeSorting(SortingType.ByName)}
        isActive={sorting === SortingType.ByName}/>
      <Tab name={'Unsigned contracts'} onSelect={() => changeFiltering(FilteringType.Unsigned)}
        isActive={filtering === FilteringType.Unsigned}/>
    </div>
  );
};

export default CSSModules(TabPanel, require('./styles.css'));
