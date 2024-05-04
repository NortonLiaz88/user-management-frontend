import {Grid} from '@mui/material';
import {Checkbox as FormCheckbox} from '../../../../components/checkbox';
import {CheckMarks as FormCheckMarks} from '../../../../components/checkmarks';
import {Select as FormSelect} from '../../../../components/select';

import {FormInput} from '../../../../components/input';

export enum InputType {
  Text_Field = 'text_field',
  Select = 'select',
  Checkmarks = 'checkmarks',
  Checkbox = 'checkbox',
}

interface InputFactoryProps {
  type: InputType;
  label?: string;
  xs?: number;
  sm?: number;
  md?: number;
}

export const makeFormInput = ({
  type,
  label = '',
  xs = 12,
  sm = 4,
  md = 4,
}: InputFactoryProps) => {
  switch (type) {
    case InputType.Text_Field:
      return (
        <Grid item xs={xs} sm={sm} md={md}>
          <FormInput placeholder="Insira um dado" label={label} />
        </Grid>
      );
    case InputType.Checkbox:
      return (
        <Grid item xs={xs} sm={sm} md={md}>
          <FormCheckbox onChange={() => null} label={label} />
        </Grid>
      );
    case InputType.Checkmarks:
      return (
        <Grid item xs={xs} sm={sm} md={md}>
          <FormCheckMarks />
        </Grid>
      );
    case InputType.Select:
      return (
        <Grid item xs={xs} sm={sm} md={md}>
          <FormSelect
            onChange={() => null}
            onBlur={() => null}
            selectItems={[]}
            value={''}
            label={label}
          />
        </Grid>
      );
    default:
      return <Grid item xs={xs} sm={sm} md={md} />;
  }
};
