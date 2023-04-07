import { Question } from 'survey-core';

type QuestionType =
  | 'boolean'
  | 'checkbox'
  | 'comment'
  | 'dropdown'
  | 'tagbox'
  | 'expression'
  | 'file'
  | 'html'
  | 'image'
  | 'imagepicker'
  | 'matrix'
  | 'matrixdropdown'
  | 'matrixdynamic'
  | 'multipletext'
  | 'panel'
  | 'paneldynamic'
  | 'radiogroup'
  | 'rating'
  | 'ranking'
  | 'signaturepad'
  | 'text';

export function getQuestionTypeNameCn(type: QuestionType | string) {
  switch (type) {
    case 'boolean':
      return '勾选框';
    case 'checkbox':
      return '多选框';
    case 'comment':
      return '多行评论';
    case 'dropdown':
      return '下拉框';
    case 'tagbox':
      return '标签框';
    case 'expression':
      return '表达式';
    case 'file':
      return '文件上传';
    case 'html':
      return 'HTML';
    case 'image':
      return '图片';
    case 'imagepicker':
      return '图片选择';
    case 'matrix':
      return '矩阵';
    case 'matrixdropdown':
      return '下拉矩阵';
    case 'matrixdynamic':
      return '动态矩阵';
    case 'multipletext':
      return '多行文本';
    case 'panel':
      return '面板';
    case 'paneldynamic':
      return '动态面板';
    case 'radiogroup':
      return '单选框';
    case 'rating':
      return '评分';
    case 'ranking':
      return '排名';
    case 'signaturepad':
      return '签名';
    case 'text':
      return '单行文本';
    default:
      return `未定义-${type}`;
  }
}

export function getQuestionTypeCn(question: Question) {
  return getQuestionTypeNameCn(question.getType() as QuestionType);
}

export const textQuestionTypes = [
  'text',
  'comment',
  'expression',
  'html',
  'multipletext',
];

export const wrapperTypes = ['panel', 'paneldynamic'];

export const selectorTypes = ['dropdown', 'tagbox', 'radiogroup', 'checkbox'];

export const allQuestionTypes = [
  ...textQuestionTypes,
  ...wrapperTypes,
  ...selectorTypes,
  'boolean',
  'file',
  'image',
  'imagepicker',
  'matrix',
  'matrixdropdown',
  'matrixdynamic',
  'rating',
  'ranking',
  'signaturepad',
];
