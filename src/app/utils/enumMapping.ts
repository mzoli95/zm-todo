import { NotificationType, Priority, Stage, Tag } from '../model/mz.enums';

export const EnumMapping = {
  [NotificationType.Error]: 'error',
  [NotificationType.Info]: 'info',
  [NotificationType.Success]: 'success',
  [NotificationType.Warning]: 'warning',
  [Priority.High]: 'High',
  [Priority.Low]: 'Low',
  [Priority.Medium]: 'Medium',
  [Stage.Done]: 'Done',
  [Stage.InProgress]: 'In Progress',
  [Stage.Todo]: 'Todo',
  [Tag.UserStory]: 'User Story',
  [Tag.Bugfix]: 'Bugfix',
  [Tag.Task]: 'Task',
  [Tag.Error]: 'Error',
  [Tag.Test]: 'Test',
};
