import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import FuseNavItem from '../FuseNavItem';
import { useSelector } from 'react-redux';
import {selectSidebarContext, setSidebarContext } from 'app/store/fuse/sideBarContextSlice'
import { Button } from '@mui/material';


const StyledList = styled(List)(({ theme }) => ({
  '& .fuse-list-item': {
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.04)',
    },
    '&:focus:not(.active)': {
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,.05)',
    },
  },
  '& .fuse-list-item-text': {
    margin: 0,
  },
  '& .fuse-list-item-text-primary': {
    lineHeight: '20px',
  },
  '&.active-square-list': {
    '& .fuse-list-item, & .active.fuse-list-item': {
      width: '100%',
      borderRadius: '0',
    },
  },
  '&.dense': {
    '& .fuse-list-item': {
      paddingTop: 0,
      paddingBottom: 0,
      height: 32,
    },
  },
}));

function FuseNavVerticalLayout1(props) {
  const { navigation, layout, active, dense, className, onItemClick } = props;
  console.log(navigation.entities)
  const navigationData = navigation.entities


  function handleItemClick(item) {
    onItemClick?.(item);
  }


  const dispatch = useDispatch();
  const sidebarContext = useSelector(selectSidebarContext)
  console.log(sidebarContext)

  const toogleSidebarContext = () => {
    const newContext = sidebarContext === 'frontOffice' ? 'backOffice' : 'frontOffice';
    dispatch(setSidebarContext(newContext));
  };
  


  return (
    <StyledList
      className={clsx(
        'navigation whitespace-nowrap px-12 py-0',
        `active-${active}-list`,
        dense && 'dense',
        className
      )}
    >
      <Button onClick={toogleSidebarContext}>{sidebarContext === 'frontOffice' ? 'Aller à l\'interface d\'administration': 'Revenir à la menu principale'} </Button>
      {Object.keys(navigationData).map((key) => (
        <FuseNavItem
          key={key}
          type={`vertical-${navigationData[key].type}`}
          item={navigationData[key]}
          nestedLevel={0}
          onItemClick={handleItemClick}
        />
      ))}
    </StyledList>
  );
}

export default FuseNavVerticalLayout1;
