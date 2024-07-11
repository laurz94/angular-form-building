import { ControlTypeEnum } from '../../enums';

export interface BaseFieldConfiguration {
  controlType: ControlTypeEnum;
  inputId: string;
  name: string;
  isRequired: boolean;
}
