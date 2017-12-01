import * as React from 'react';

const pages = {
  '/ctr/app/contracts/list': 'Contracts'
};

const Pagename = ({ pathname }) => (<span>{pages[pathname]}</span>);

export default Pagename;
