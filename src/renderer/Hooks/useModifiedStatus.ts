import { useContext } from 'react';
import { ContentModifyContext } from 'renderer/Components/Layout';

export default function useModifiedStatus() {
  const { modified, saved } = useContext(ContentModifyContext);
  return [modified, saved];
}
