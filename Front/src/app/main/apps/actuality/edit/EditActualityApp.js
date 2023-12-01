import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '../../../../../@fuse/hooks/useThemeMediaQuery';
import AddActualityTab from './tabs/AddActualityTab';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    '& > .container': {
      maxWidth: '100%',
    },
  },
}));

function EditActualityApp() {

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <Root
      content={
        <div className="flex flex-auto justify-center w-full max-w-5xl mx-auto p-24 sm:p-32">
          <AddActualityTab />
        </div>
      }
      scroll={isMobile ? 'normal' : 'page'}
    />
  );
}

export default EditActualityApp;  