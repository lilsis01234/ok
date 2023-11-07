import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import ActualitiesHeader from './ActualitiesHeader';
import ActualitiesTable from './ActualitiesTable';

function Actualities() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<ActualitiesHeader />}
      content={<ActualitiesTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default (Actualities);
