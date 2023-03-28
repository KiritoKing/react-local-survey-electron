import { ISurveyCache } from 'main/typing';
import { Paper, Typography, IconButton, Box } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import SurveyListItemMenu from '../SurveyItemMenu';

interface IProps {
  data: ISurveyCache;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

// eslint-disable-next-line react/function-component-definition
const SurveyListItem: React.FC<IProps> = ({
  data,
  onClick,
  onDelete,
  onEdit,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const nav = useNavigate();
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleViewResults = () => {
    handleClose();
    nav(`/results/${data.id}`);
  };
  return (
    <div className={styles.wrapper} aria-hidden>
      <Paper
        className={styles['survey-card']}
        elevation={3}
        sx={{ flexDirection: 'row' }}
      >
        <div className={styles['content-wrapper']}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', ml: 1, mt: 0.6 }}>
            {data.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ ml: 1, mt: 0.8, color: '#95a5a6', fontSize: '0.8rem' }}
          >
            创建者: {data?.creator ? data.creator : '未知'}
          </Typography>
          <Typography
            variant="body1"
            sx={{ ml: 1, mt: 0.8, color: '#95a5a6', fontSize: '0.8rem' }}
          >
            创建时间: {data?.lastModified ? data.lastModified : '未知'}
          </Typography>
        </div>
        <Box
          sx={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            pb: '1rem',
          }}
        >
          <IconButton onClick={handleOpenMenu} aria-label="more">
            <MoreHorizIcon />
          </IconButton>
          <IconButton sx={{ mt: '1rem' }} onClick={onClick} aria-label="open">
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
        <SurveyListItemMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onDelete={() => {
            handleClose();
            onDelete && onDelete();
          }}
          onEdit={() => {
            handleClose();
            onEdit && onEdit();
          }}
          onViewResults={handleViewResults}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        />
      </Paper>
    </div>
  );
};

export default SurveyListItem;
