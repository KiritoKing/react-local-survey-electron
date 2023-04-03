import React from 'react';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import { Box } from '@mui/material';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

interface IProps {
  data: Model;
}

const SurveyEditor: React.FC<IProps> = ({ data: model }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  model.locale = 'zh-cn';

  model.onAfterRenderQuestion.add((sender, options) => {
    const rect = options.htmlElement.getBoundingClientRect();
    const btnContainer = document.createElement('div');
    ref.current?.appendChild(btnContainer);
    console.log(
      `${options.question.name}: top=${rect.top} y=${rect.y}} width=${rect.width} height=${rect.height}`
    );
    if (ref.current !== null) {
      ReactDOM.render(
        <Button
          variant="contained"
          sx={{ top: `${rect.bottom}px`, position: 'absolute' }}
        >
          Hello World
        </Button>,
        btnContainer
      );
    }
  });
  model.onCurrentPageChanged.add(() => {
    if (ref.current)
      ref.current.childNodes.forEach((node) => {
        console.log('removing');
        ReactDOM.unmountComponentAtNode(node as any);
      });
  });

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        mt: 2,
        position: 'relative',
      }}
    >
      <Box sx={{ width: '70%' }}>
        <Survey model={model} mode="display" />
      </Box>
      <Box>111</Box>
    </Box>
  );
};
export default SurveyEditor;
