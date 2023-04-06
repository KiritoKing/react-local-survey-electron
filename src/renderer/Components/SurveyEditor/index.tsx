import React, { useCallback, useEffect, useState } from 'react';
import { Survey } from 'survey-react-ui';
import { Model, IElement, PanelModel, Question } from 'survey-core';
import { Box } from '@mui/material';
import EditPanel, { ISegment } from '../EditPanel';

interface IProps {
  data: Model;
}

interface IHeight {
  height: number;
  elementId: string;
}

// TODO: 右侧按钮随左侧内容全量刷新，考虑使用内部渲染方案
const SurveyEditor: React.FC<IProps> = ({ data: model }) => {
<<<<<<< HEAD
  const [poses, setPoses] = useState<ISegment[]>([]);
  console.log(model.getAllQuestions().map((item) => item.name));

  const addToPoses = (pos: ISegment) => {
    setPoses((prev) => {
      if (prev.find((p) => p.data.name === pos.data.name)) return prev;
      return [...prev, pos];
    });
=======
  const [segments, setSegments] = useState<ISegment[]>([]);
  let heightTemp: IHeight[] = [];
  const addHeightTemp = (id: string, height: number) => {
    if (heightTemp.find((p) => p.elementId === id)) return;
    console.log(`Element ${id} height updated to ${height}`);
    heightTemp = [...heightTemp, { height, elementId: id }];
>>>>>>> 9c035e159806b02263cb5d42eb29f70c78b8ad3e
  };

  const refreshSegements = useCallback(
    (data: Model) => {
      const newSegments: ISegment[] = [];

      const addSegement = (
        element: IElement,
        prev: ISegment[],
        target: ISegment[]
      ) => {
        // 刷新时寻找之前的列表中是否已有该元素
        const existed = prev.find(
          (p) => (p.data as any).id === (element as any).id
        );

        if (existed !== undefined) target.push(existed); // 如果已存在则直接添加
        else
          target.push({
            height:
              heightTemp.find((h) => h.elementId === (element as any).id)
                ?.height ?? 0,
            data: element,
          }); // 首先插入当前元素（panel本身也要插入作占位符）

        if (element.isPanel) {
          target[target.length - 1].height = 87; // Panel占位符固定高度
          const panel = element as PanelModel;
          panel.elements.forEach((question) => {
            addSegement(question, prev, target);
          });
        }
      };

      data.pages[data.currentPageNo].elements.forEach((element) =>
        addSegement(element, segments, newSegments)
      );

      return newSegments;
    },
    [heightTemp, segments]
  );

  useEffect(() => {
    console.log('Update segments');
    segments.forEach((s) => {
      console.log(`${s.data.name}=${s.height}`);
    });
    setSegments(refreshSegements(model));
  }, [heightTemp]);

  model.locale = 'zh-cn';
  model.currentPage;

  model.onAfterRenderQuestion.add(
    useCallback((sender, options) => {
<<<<<<< HEAD
      console.log(`Question:${options.question.name} rendered`);
      // const rect = options.htmlElement.getBoundingClientRect();
      // const pos: ISegment = {
      //   qHeight: rect.height,
      //   data: options.question,
      // };
      // addToPoses(pos);
=======
      console.log(`Element ${options.question.id} rendered`);
      const { id } = options.question;
      const { height } = options.htmlElement.getBoundingClientRect();
      addHeightTemp(id, height);
>>>>>>> 9c035e159806b02263cb5d42eb29f70c78b8ad3e
    }, [])
  );

  model.onAfterRenderPanel.add(
    useCallback((sender, options) => {
<<<<<<< HEAD
      console.log(`Panel:${options.panel.name} rendered`);
      console.log(
        `Panel ${options.panel.name} Expanded=${options.panel.isExpanded}`
      );
      // addToPoses({ qHeight: 87, data: options.panel });
      // options.panel.questions.forEach((question) => {
      //   console.log(question.isVisible);
      // });
    }, [])
  );

  model.onAfterRenderPage.add(
    useCallback((sender, options) => {
      console.log(`Page:${options.page.name} rendered`);
      // addToPoses({ qHeight: 87, data: options.page });
    }, [])
  );

  model.onAfterRenderSurvey.add(() => {
    console.log('Survey render completed');
  });

=======
      const { elements } = options.panel;
    }, [])
  );

>>>>>>> 9c035e159806b02263cb5d42eb29f70c78b8ad3e
  return (
    <Box
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
      <EditPanel segments={segments} model={model} />
    </Box>
  );
};
export default SurveyEditor;
