import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNavigation } from 'app/store/fuse/navigationSlice';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { navbarCloseMobile } from 'app/store/fuse/navbarSlice';
import { selectSidebarContext, setSidebarContext } from 'app/store/fuse/sideBarContextSlice';

function Navigation(props) {
  const dispatch = useDispatch();
  const navigation = useSelector(selectNavigation);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  
  return useMemo(() => {
    function handleItemClick(item) {
      if (isMobile) {
        dispatch(navbarCloseMobile());
      }
    }

    return (
      <FuseNavigation
        className={clsx('navigation', props.className)}
        navigation={navigation}
        layout={props.layout}
        dense={props.dense}
        active={props.active}
        onItemClick={handleItemClick}
      />
    );
  }, [dispatch, isMobile, navigation, props.active, props.className, props.dense, props.layout]);
}

Navigation.defaultProps = {
  layout: 'vertical',
};

export default memo(Navigation);
