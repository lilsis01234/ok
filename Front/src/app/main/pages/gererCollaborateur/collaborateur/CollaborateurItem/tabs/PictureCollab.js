import React from 'react';
import { styled } from '@mui/material/styles';
import { Controller } from 'react-hook-form';
import { Input, Typography, Box } from '@mui/material';

const Root = styled('div')(({ theme }) => ({
  '& .collaboratorPhotoUpload': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
}));

function PictureCollab(props) {
  const { methods } = props;
  const { control } = methods || {};

  if (!methods) {
    return null;
  }

  return (
    <Root>
      <Controller
        name="image"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <Box>
            <Input
              {...field}
              type="file"
              accept="image/*"
            />
          </Box>
        )}
      />
    </Root>
  );
}

export default PictureCollab;
