import { NotificationType, Priority, Stage, Tag } from '../model/mz.enums';

export const EnumMapping = {
  [NotificationType.Error]: 'error',
  [NotificationType.Info]: 'info',
  [NotificationType.Success]: 'success',
  [NotificationType.Warning]: 'warning',
  [Priority.High]: 'High',
  [Priority.Low]: 'Low',
  [Priority.Medium]: 'Medium',
  [Priority.Critical]: 'Critical',
  [Stage.Done]: 'Done',
  [Stage.InProgress]: 'In Progress',
  [Stage.Todo]: 'Todo',
  [Stage.Test || Tag.Test]: 'Test',
  [Tag.UserStory]: 'User Story',
  [Tag.Bugfix]: 'Bugfix',
  [Tag.Task]: 'Task',
  [Tag.Error]: 'Error',
};
