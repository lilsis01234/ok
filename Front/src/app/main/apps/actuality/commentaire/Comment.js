import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import CommentHeader from './CommentHeader';
import CommentTable from './CommentTable';

function Comment() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<CommentHeader />}
      content={<CommentTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default (Comment);
