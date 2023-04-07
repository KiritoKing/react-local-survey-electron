import { useConfirm } from 'material-ui-confirm';

export default function useDeleteConfirm(
  title = '删除确认',
  msg = '确定要删除吗？'
) {
  const confirm = useConfirm();
  return () =>
    confirm({
      title,
      description: msg,
      confirmationButtonProps: { variant: 'contained', color: 'error' },
      cancellationText: '取消',
      confirmationText: '删除',
      dialogActionsProps: { sx: { padding: 3 } },
    });
}
