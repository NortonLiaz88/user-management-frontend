import {Search} from '@mui/icons-material';
import React from 'react';
import {Cancel, Container, Input} from './styles';

interface Props {
  close: () => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const ListSearch: React.FC<Props> = ({
  close,
  searchValue,
  setSearchValue,
}: Props) => {
  const handleClose = () => {
    setSearchValue('');
    close();
  };

  return (
    <Container>
      <Search
        sx={{
          fill: 'url(#myGradient)',
          width: 24,
          height: 24,
        }}
      />
      <Input
        placeholder="Digite aqui"
        name="search"
        id="search"
        // value={searchValue}
        onChange={event => setSearchValue(event.target.value)}
      />
      <Cancel onClick={() => handleClose()} />
    </Container>
  );
};
