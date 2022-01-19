import React from 'react';
import MuiComponents from '../material-ui/MuiComponents';
const { Box } = MuiComponents;

function HorizondalTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} >
          {children}
        </Box>

      )}
    </div>
  );
}
export default HorizondalTabPanel;
