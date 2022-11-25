import { Fragment, ReactNode } from 'react';
import Navbar from './navbar';

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <Fragment>
      <Navbar />
      {children}
    </Fragment>
  );
}
