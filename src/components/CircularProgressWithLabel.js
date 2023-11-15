import React from 'react';
// import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: {
          main : '#FF9C05'
      },
    },
})

export default function CircularProgressWithLabel(props) {
  return (
    <ThemeProvider theme={defaultMaterialTheme}>
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    </ThemeProvider>
  );
}