import { Paper, Typography, Box, Button } from '@mui/material';
import { ISurveyCache } from 'main/typing';

import React, { useEffect, useState } from 'react';
import useModifiedStatus from 'renderer/Hooks/useModifiedStatus';
import PropertyEditor from '../PropertyEditor';

interface IProps {
  data?: ISurveyCache;
  // eslint-disable-next-line no-unused-vars
  onSave?: (name: string, author: string) => void;
}

const MetaEditor: React.FC<IProps> = ({ data, onSave }) => {
  const [surveyName, setSurveyName] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [modified] = useModifiedStatus();

  // Hook: 在data更新时刷新视图
  useEffect(() => {
    if (data !== undefined) {
      console.log(`[Meta Editor] Got meta data updated`);
      setSurveyName(data.name);
      setAuthor(data.creator);
      modified();
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
      <PropertyEditor
        name="name"
        displayName="问卷名"
        initValue={surveyName}
        binding={setSurveyName}
        sx={{ marginBottom: '2rem' }}
      />
      <PropertyEditor
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
