import * as React from 'react';
import DashboardPage from './DashboardPage';
import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';

export default function DashboardAccueil() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  return (
    <FusePageCarded
      header={" "}
      content={<DashboardPage />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}
