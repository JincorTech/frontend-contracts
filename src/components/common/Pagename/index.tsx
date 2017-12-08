import * as React from 'react';

const pages = {
  '/contracts/app/contracts/list': 'Contracts'
};

const Pagename = ({ pathname }) => (<span>{pages[pathname]}</span>);

export default Pagename;
