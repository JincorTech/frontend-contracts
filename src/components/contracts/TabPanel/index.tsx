import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import Tab from './Tab';
import { SortingType, FilteringType } from '../../../redux/modules/contracts/contractsPage';

export type Props = {
  changeSorting: (sorting: SortingType) => void
  changeFiltering: (filtering: FilteringType) => void
}

const TabPanel: SFC<Props> = (props) => {
  const {
    changeSorting,
    changeFiltering
  } = props;

  return (
    <div styleName="tabs">
      <Tab name={'Latest'} onSelect={() => changeSorting(SortingType.ByDate)}/>
      <Tab name={'Sort by name'} onSelect={() => changeSorting(SortingType.ByName)}/>
      <Tab name={'Unsigned contracts'} onSelect={() => changeFiltering(FilteringType.Unsigned)}/>
    </div>
  );
};

export default CSSModules(TabPanel, require('./styles.css'));
