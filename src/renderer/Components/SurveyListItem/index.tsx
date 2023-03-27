import { ISurveyCache } from 'main/typing';
import { Paper, Typography, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React from 'react';
import styles from './styles.module.scss';
import SurveyListItemMenu from '../SurveyListItemMenu';

interface IProps {
  data: ISurveyCache;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
}

// eslint-disable-next-line react/function-component-definition
const SurveyListItem: React.FC<IProps> = ({ data, onClick }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={styles.wrapper} onClick={onClick} aria-hidden>
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

        <IconButton
          onClick={handleOpenMenu}
          className={styles['more-popout']}
          aria-label="more"
        >
          <MoreHorizIcon />
        </IconButton>
        <SurveyListItemMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
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
