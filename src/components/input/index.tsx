import {FormControl, OutlinedInputProps} from '@mui/material';
import {FieldError} from '../field-error';
import {InputSkeleton} from '../input-skeleton';
import {Container, CustomOutlinedInput, Label} from './styles';

interface Props extends OutlinedInputProps {
  label: string;
  placeholder: string;
  messageError?: string;
  loading?: boolean;
}

export const FormInput: React.FC<Props> = ({
  label,
  placeholder,
  messageError,
  loading,
  ...rest
}: Props) => {
  return (
    <Container>
      {loading ? (
        <InputSkeleton />
      ) : (
        <FormControl sx={{width: '100%'}}>
          <Label>{label}</Label>
          <CustomOutlinedInput
            placeholder={placeholder}
            fullWidth
            {...rest}
            error={!!messageError}
          />
          {messageError && <FieldError error={messageError} />}
        </FormControl>
      )}
    </Container>
  );
};
