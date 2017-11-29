import * as React from 'react';

const pages = {
  '/ctr/app/contracts': 'Contracts'
};

const Pagename = ({ pathname }) => (<span>{pages[pathname]}</span>);

export default Pagename;
