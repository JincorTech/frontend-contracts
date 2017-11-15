import * as React from 'react';

const pages = {
  '/cmp/app/contracts': 'Contracts'
};

const Pagename = ({ pathname }) => (<span>{pages[pathname]}</span>);

export default Pagename;
