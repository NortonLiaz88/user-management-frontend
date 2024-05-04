import {Add, FileDownload, Search} from '@mui/icons-material';
import React, {useState} from 'react';
import {ListSearch} from '../list-search';
import {PrimaryButton} from '../primary-button';
import {
  ActionWrapper,
  ButtonContainer,
  Container,
  SearchContainer,
  Title,
} from './styles';

interface Props {
  title: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  navigateToRegister: () => void;
  actionButton?: () => void;
}

export const ListHeader: React.FC<Props> = ({
  title,
  searchValue,
  setSearchValue,
  navigateToRegister,
  actionButton,
}: Props) => {
  const [searching, setSearching] = useState(false);
  return (
    <Container>
      <Title>{title}</Title>
      <ActionWrapper>
        <SearchContainer>
          {searching ? (
            <ListSearch
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              close={() => setSearching(false)}
            />
          ) : (
            <PrimaryButton
              mode="outlined"
              onClick={() => setSearching(true)}
              iconType={'plain'}
              icon={
                <Search
                  sx={{
                    fill: 'url(#myGradient)',
                    width: 24,
                    height: 24,
                    marginRight: -2,
                  }}
                />
              }>
              {''}
            </PrimaryButton>
          )}
        </SearchContainer>
        <ButtonContainer>
          <PrimaryButton
            mode="filled"
            onClick={() => navigateToRegister()}
            iconType={'plain'}
            icon={<Add sx={{color: '#fff', width: 24, height: 24}} />}>
            Novo cadastro
          </PrimaryButton>
        </ButtonContainer>

        {actionButton && (
          <ButtonContainer>
            <PrimaryButton
              mode="filled"
              onClick={() => actionButton()}
              iconType={'plain'}
              icon={
                <FileDownload sx={{color: '#fff', width: 24, height: 24}} />
              }>
              Exportar
            </PrimaryButton>
          </ButtonContainer>
        )}
      </ActionWrapper>
    </Container>
  );
};
