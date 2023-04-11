/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState } from 'react';
import styles from './styles.module.scss';

interface ITextProps {
  text: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (text: string) => boolean;
}

const EditableText: React.FC<ITextProps> = ({ text, onChange }) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSubmitChange = () => {
    if (ref.current) {
      onChange?.(ref.current.innerText);
    }
  };

  const handleDoubleClickText = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const element = e.target as HTMLDivElement;
    element.contentEditable = 'true';
    element.focus();
    setEditing(true);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (editing === false) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      const element = e.target as HTMLDivElement;
      element.contentEditable = 'false';
      setEditing(false);
    }
  };

  const handleBlur = () => {
    window.getSelection()?.removeAllRanges();
    handleSubmitChange();
  };

  return (
    <div
      className={styles['choice-text']}
      onDoubleClick={handleDoubleClickText}
      onKeyDown={handleKeydown}
      onBlur={handleBlur}
      ref={ref}
    >
      {text}
    </div>
  );
};

export default EditableText;
