import { Question } from 'survey-core';

export type QuestionType =
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
      return '是或否问题';
    case 'checkbox':
      return '多项选择';
    case 'comment':
      return '多行文本框';
    case 'dropdown':
      return '下拉单项选择';
    case 'tagbox':
      return '下拉多项选择';
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
      return '多个单行文本';
    case 'panel':
      return '折叠面板';
    case 'paneldynamic':
      return '动态折叠面板';
    case 'radiogroup':
      return '单项选择';
    case 'rating':
      return '自定义打分';
    case 'ranking':
      return '选项排序';
    case 'signaturepad':
      return '签名板';
    case 'text':
      return '单行文本框';
    default:
      return `未定义-${type}`;
  }
}

export function getQuestionTypeCn(question: Question) {
  return getQuestionTypeNameCn(question.getType() as QuestionType);
}

export const textQuestionTypes = ['text', 'comment'];

export const wrapperTypes = ['panel'];

export const selectorTypes = [
  'dropdown',
  'tagbox',
  'radiogroup',
  'checkbox',
  'ranking',
];

export const simpleSelectorTypes = ['boolean', 'rating'];

export const forbiddenTypes = [
  'expression',
  'html',
  'file',
  'image',
  'imagepicker',
  'matrix',
  'matrixdropdown',
  'matrixdynamic',
  'signaturepad',
  'multipletext',
  'paneldynamic',
];

export const allQuestionTypes = [
  ...textQuestionTypes,
  ...wrapperTypes,
  ...selectorTypes,
  ...simpleSelectorTypes,
];
