import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import FuseNavItem from '../FuseNavItem';
import { selectNavigation, setNavigation, updateNavigation } from 'app/store/fuse/navigationSlice';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import  {setNavigationContext}  from 'app/configs/navigationConfig';
import { selectUser } from 'app/store/userSlice';

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

  const { layout, active, dense, className, onItemClick } = props;
  const dispatch = useDispatch();
  const navigation = useSelector(selectNavigation)
  const user = useSelector(selectUser)

  // console.log(user)

  const [sideBarContext, setSideBarContext] = useState('frontOffice')


  setNavigationContext(sideBarContext)

  function handleItemClick(item) {
    onItemClick?.(item);
  }

  const handleChangeSideBarContext = () => {
    const newContext = sideBarContext === 'frontOffice' ? 'backOffice' : 'frontOffice'
    setSideBarContext(newContext);
  };

  useEffect(() => {
    const newNavigationConfig = setNavigationContext(sideBarContext)
    dispatch(updateNavigation(newNavigationConfig))
    dispatch(setNavigation(newNavigationConfig))
  }, [sideBarContext])

  // useEffect(() => {
  //   dispatch(updateNavigation(navigation))
  // }, [navigation])

  return (
    <StyledList
      className={clsx(
        'navigation whitespace-nowrap px-12 py-0',
        `active-${active}-list`,
        dense && 'dense',
        className
      )}
    >
      {user.role === 'User' ? '' :   <Button onClick={handleChangeSideBarContext}>{sideBarContext === 'frontOffice' ? 'Aller à l\'interface d\'administration' : 'Retourner au menu principale'}</Button>}
      {navigation && navigation.map((_item) => (
        <FuseNavItem
          key={_item.id}
          type={`vertical-${_item.type}`}
          item={_item}
          nestedLevel={0}
          onItemClick={handleItemClick}
        />
      ))}
    </StyledList>
  );
}

export default FuseNavVerticalLayout1;
