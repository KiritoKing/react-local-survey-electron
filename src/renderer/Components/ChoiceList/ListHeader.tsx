import { Box, Tooltip, Typography } from '@mui/material';

const ListHeader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      ml: '4.5rem',
    }}
  >
    <Typography sx={{ fontSize: '14px', color: '#57606f' }}>显示值</Typography>
    <Tooltip title="在导出表中实际存储的值" placement="top">
      <Typography sx={{ fontSize: '14px', color: '#57606f', mr: 1 }}>
        实际值
      </Typography>
    </Tooltip>
  </Box>
);

export default ListHeader;
