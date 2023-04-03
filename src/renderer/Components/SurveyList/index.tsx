/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import { SurveyListContext } from 'renderer/App';
import { ISurveyCache } from '../../../main/typing';
import SurveyListItem from '../SurveyItem';
import ItemList from '../ItemList';

interface IProps {
  data?: ISurveyCache[];
  onFail?: () => void;
}

const SurveyList: React.FC<IProps> = ({ data, onFail }) => {
  const nav = useNavigate();
  const confirm = useConfirm();
  const refreshSurveys = useContext(SurveyListContext).refreshHandler;

  const handleOpen = (survey: ISurveyCache) => {
    if (survey.data === undefined) {
      onFail && onFail();
      return;
    }
    console.log(
      `Name: ${survey.name}\nUUID: ${survey.id}\nHasData: ${
        survey.data !== undefined
      }\nPath: ${survey.path}`
    );
    nav(`/survey/${survey.id}`);
  };

  const handleDelete = (survey: ISurveyCache) => {
    confirm({
      title: '删除问卷',
      description: `你确定要删除问卷吗？这将永久清除该问卷和其结果，且不可恢复！`,
      confirmationButtonProps: { variant: 'contained', color: 'error' },
      cancellationText: '取消',
      confirmationText: '清除',
    })
      .then(() => {
        console.log(`Delete: ${survey.id}`);
        window.electron.ipcRenderer.sendMessage('delete-survey', [survey.id]);
        refreshSurveys();
        return null;
      })
      .catch(() => console.log('Delete Canceld'));
  };

  const handleEdit = (survey: ISurveyCache) => {
    nav(`/editor/${survey.id}`);
  };

  const itemTemplate = (item: ISurveyCache) => (
    <SurveyListItem
      onClick={() => handleOpen(item)}
      onDelete={() => handleDelete(item)}
      onEdit={() => handleEdit(item)}
      data={item}
    />
  );

  return <ItemList itemSource={data} template={itemTemplate} />;
};

export default SurveyList;
