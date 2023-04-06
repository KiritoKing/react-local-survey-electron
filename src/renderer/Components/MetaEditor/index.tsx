import {
  Paper,
  Typography,
  TextField,
  Box,
  Buttonm,
  SxProps,
  Button,
} from '@mui/material';
import { ISurveyCache } from 'main/typing';

import React, { useEffect, useState } from 'react';

interface ITextbox {
  name: string;
  displayName: string;
  initValue?: string;
  // eslint-disable-next-line no-unused-vars
  binding?: (val: string) => void;
  sx?: SxProps;
}

const PropertyTextbox: React.FC<ITextbox> = ({
  name,
  displayName,
  initValue,
  binding,
  sx,
}) => (
  <TextField
    fullWidth
    type="text"
    id={name}
    label={displayName}
    value={initValue}
    onChange={(e) => binding && binding(e.target.value)}
    sx={sx}
  />
);

const MetaEditor: React.FC<{
  data?: ISurveyCache;
  onSave?: (name: string, author: string) => void;
}> = ({ data, onSave }) => {
  const [surveyName, setSurveyName] = useState<string>();
  const [author, setAuthor] = useState<string>();

  useEffect(() => {
    if (data !== undefined) {
      console.log(`Meta data updated: ${data}`);
      setSurveyName(data.name);
      setAuthor(data.creator);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.name, data?.creator]);

  const handleSave = () => {
    if (surveyName === undefined || author === undefined) return;

    console.log(`Saving ${surveyName} By ${author}`);
    onSave && onSave(surveyName, author);
  };

  return (
    <Paper sx={{ padding: '3rem 3rem' }} elevation={3}>
      <Typography variant="h5" marginBottom={3}>
        <b>元数据修改</b>
      </Typography>
      <PropertyTextbox
        name="name"
        displayName="问卷名"
        initValue={surveyName}
        binding={setSurveyName}
        sx={{ marginBottom: '2rem' }}
      />
      <PropertyTextbox
        name="author"
        displayName="作者"
        initValue={author}
        binding={setAuthor}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          marginTop: '1.5rem',
          padding: '1rem',
        }}
      >
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ color: 'white' }}
        >
          保存全部更改
        </Button>
      </Box>
    </Paper>
  );
};

export default MetaEditor;
