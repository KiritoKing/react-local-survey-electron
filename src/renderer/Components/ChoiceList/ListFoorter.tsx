import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

const ListFooter: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    <Button
      onClick={onClick}
      sx={{ margin: 1 }}
      variant="outlined"
      startIcon={<AddIcon />}
    >
      添加
    </Button>
    <Typography
      sx={{
        textAlign: 'center',
        mt: 2,
        color: '#57606f',
        fontSize: '14px',
      }}
    >
      温馨提示：双击文本可以修改内容
    </Typography>
  </Box>
);

export default ListFooter;
