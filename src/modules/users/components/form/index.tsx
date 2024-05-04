import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import { FormContainer } from "../../../../styles/form";
import { SectionHeader } from "../../../../templates/Forms/components";
import { RegisterTemplate } from "../../../../templates/Forms/Register";
import {
  BasicModal,
  ModalTypes,
} from "../../../../components/modal/basic-modal";
import { useUserForm } from "../../hooks/user-form";

import { Select } from "../../../../components/select";
import { FormInput } from "../../../../components/input";
import { UserPermission } from "../../../../enums/user-permission";
import { EnhancedSwitch } from "../../../../components/switch";

interface Props {
  id?: string;
  mode: string;
}

export const UserForm: React.FC<Props> = ({ id, mode }) => {
  const [currentMode, setMode] = useState<"view" | "edit" | "creation">("view");
  const [formLoading, setFormLoading] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [active, setActive] = React.useState(true);

  const {
    getValues,
    getUser,
    onSubmit,
    verifyRequiredError,
    control,
    errors,
    isValid,
  } = useUserForm();

  const navigate = useNavigate();

  useEffect(() => {
    const initForm = async () => {
      setFormLoading(true);
      if (id) {
        await getUser(id);
        console.log(getValues());
      } else {
        setMode("creation");
      }
      setFormLoading(false);
    };
    initForm();
    setMode(mode as "view" | "edit" | "creation");
  }, [id, mode]);

  const handleSubmitForm = async () => {
    await onSubmit();
  };

  const handleConfirmModal = () => {
    navigate(-1);
  };

  const handleCancelModal = () => {
    setOpenCancelModal(false);
  };

  const handlePageTitle = () => {
    if (currentMode === "creation") {
      return "Cadastrar usuário";
    } else if (currentMode === "edit") {
      return "Edição de usuário";
    } else {
      return "Visualizar usuário";
    }
  };

  const handleModalMessage = () => {
    if (currentMode === "creation") {
      return "Você tem certeza que deseja cancelar a criação deste usuário ?";
    } else if (currentMode === "edit") {
      return "Você tem certeza que deseja cancelar a edição deste usuário";
    } else {
      return "Você tem certeza que deseja voltar para listagem de usuário ?";
    }
  };

  return (
    <RegisterTemplate
      title={handlePageTitle()}
      mode={currentMode}
      submitDisabled={!isValid && currentMode !== "view"}
      cancelAction={() => setOpenCancelModal(true)}
      submitAction={() => handleSubmitForm()}
      editAction={() => setMode("edit")}
    >
      <FormContainer>
        <FormContainer>
          <SectionHeader> Dados gerais</SectionHeader>
          <Grid
            container
            spacing={{ xs: 4 }}
            columns={{ xs: 12, sm: 8, md: 12 }}
            alignItems={"flex-start"}
          >
            <Grid item xs={12} sm={4} md={4}>
              <Controller
                name={"username"}
                control={control}
                render={({ field: props }) => (
                  <FormInput
                    disabled={currentMode === "view"}
                    loading={formLoading}
                    value={props.value}
                    label={"Nome de usuário"}
                    messageError={errors?.username?.message}
                    placeholder={"Informe o nome de usuário"}
                    onChange={(e) => {
                      verifyRequiredError(e.target.value, "username");
                      props.onChange(e.target.value);
                    }}
                    onBlur={() => null}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={4}>
              <Controller
                name={"name"}
                control={control}
                render={({ field: props }) => (
                  <FormInput
                    disabled={currentMode === "view"}
                    loading={formLoading}
                    value={props.value}
                    label={"Primeiro nome"}
                    messageError={errors?.name?.message}
                    placeholder={"Informe o primeiro nome"}
                    onChange={(e) => {
                      verifyRequiredError(e.target.value, "name");
                      props.onChange(e.target.value);
                    }}
                    onBlur={() => null}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={4}>
              <Controller
                name={"lastName"}
                control={control}
                render={({ field: props }) => (
                  <FormInput
                    disabled={currentMode === "view"}
                    loading={formLoading}
                    value={props.value}
                    label={"Último nome"}
                    messageError={errors?.lastName?.message}
                    placeholder={"Informe o último nome"}
                    onChange={(e) => {
                      verifyRequiredError(e.target.value, "lastName");
                      props.onChange(e.target.value);
                    }}
                    onBlur={() => null}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={4}>
              <Controller
                name={"email"}
                control={control}
                render={({ field: props }) => (
                  <FormInput
                    disabled={currentMode === "view"}
                    loading={formLoading}
                    value={props.value}
                    label={"email"}
                    messageError={errors?.email?.message}
                    placeholder={"Informe o último nome"}
                    onChange={(e) => {
                      verifyRequiredError(e.target.value, "email");
                      props.onChange(e.target.value);
                    }}
                    onBlur={() => null}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Controller
                name={"permission"}
                control={control}
                render={({ field: props }) => (
                  <Select
                    selectItems={Object.values(UserPermission).map((ele) => ({
                      name: `${ele}`,
                      value: ele,
                    }))}
                    disabled={currentMode === "view"}
                    loading={formLoading}
                    value={props.value}
                    label={"Perfil"}
                    error={errors?.permission?.message}
                    onChange={(e) => {
                      const value = e.target.value;
                      verifyRequiredError(e?.target?.value, "permission");
                      props.onChange(value);
                    }}
                    onBlur={() =>
                      verifyRequiredError(props.value, "permission")
                    }
                  />
                )}
              />
            </Grid>

            {mode === "creation" && (
              <Grid item xs={12} sm={4} md={4}>
                <Controller
                  name={"password"}
                  control={control}
                  render={({ field: props }) => (
                    <FormInput
                      type="password"
                      disabled={currentMode === "view"}
                      loading={formLoading}
                      value={props.value}
                      label={"Senha"}
                      messageError={errors?.password?.message}
                      placeholder={"Informe a senha"}
                      onChange={(e) => {
                        verifyRequiredError(e.target.value, "password");
                        props.onChange(e.target.value);
                      }}
                      onBlur={() => null}
                    />
                  )}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={4} md={2}>
              <Controller
                name={"status"}
                control={control}
                render={({ field: props }) => {
                  return (
                    <EnhancedSwitch
                      disabled={currentMode === "view"}
                      loading={formLoading}
                      checked={active}
                      label={"Status"}
                      value={active}
                      error={errors?.status?.message}
                      onChange={(e) => {
                        const value = e.target.value;
                        setActive((oldValue) => !oldValue);
                        verifyRequiredError(e?.target?.value, "status");
                        props.onChange(value ? "ACTIVE" : "INACTIVE");
                      }}
                      onBlur={() => verifyRequiredError(props.value, "status")}
                    />
                  );
                }}
              />
            </Grid>
          </Grid>
        </FormContainer>
      </FormContainer>

      <BasicModal
        title="Alerta"
        type={ModalTypes.Warning}
        message={handleModalMessage()}
        open={openCancelModal}
        actions={{
          confirm: {
            fn: () => handleConfirmModal(),
            message: "Confirmar",
          },
          cancel: {
            fn: () => handleCancelModal(),
            message: "Cancelar",
          },
        }}
      />
    </RegisterTemplate>
  );
};
