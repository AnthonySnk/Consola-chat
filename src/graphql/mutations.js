/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
    }
  }
`;
export const createTblUser = /* GraphQL */ `
  mutation CreateTblUser($input: CreateTblUserInput!) {
    createTblUser(input: $input) {
      idUser
      permisos
      rol
      apellido
      correo
      nombre
      telefono
      fechaRegistro
      cuentas
      supervisor
      telefonoEmpresa
      departamento
      dui
      nit
      password
      direccion
      empresa
      telefonoCasa
    }
  }
`;
export const updateTblUser = /* GraphQL */ `
  mutation UpdateTblUser($input: UpdateTblUserInput!) {
    updateTblUser(input: $input) {
      idUser
      permisos
      rol
      apellido
      correo
      nombre
      telefono
      fechaRegistro
      cuentas
      supervisor
      telefonoEmpresa
      departamento
      dui
      nit
      password
      direccion
      empresa
      telefonoCasa
    }
  }
`;
export const deleteTblUser = /* GraphQL */ `
  mutation DeleteTblUser($input: DeleteTblUserInput!) {
    deleteTblUser(input: $input) {
      idUser
      permisos
      rol
      apellido
      correo
      nombre
      telefono
      fechaRegistro
      cuentas
      supervisor
      telefonoEmpresa
      departamento
      dui
      nit
      password
      direccion
      empresa
      telefonoCasa
    }
  }
`;
export const createTblStorage = /* GraphQL */ `
  mutation CreateTblStorage($input: CreateTblStorageInput!) {
    createTblStorage(input: $input) {
      objectId
      tipoObjeto
      fecha
      origen
      contenido
      avatar
      contenidoConversacion
      conversacion
      divider
      sender
      tipo
      cuenta
      permisos
      rol
      created
      descripcion
      msjBienvenida
      msjOffline
      nombre
      apellido
      accesToken
      nombreWeb
      paginaOrigen
    }
  }
`;
export const updateTblStorage = /* GraphQL */ `
  mutation UpdateTblStorage($input: UpdateTblStorageInput!) {
    updateTblStorage(input: $input) {
      objectId
      tipoObjeto
      fecha
      origen
      contenido
      avatar
      contenidoConversacion
      conversacion
      divider
      sender
      tipo
      cuenta
      permisos
      rol
      created
      descripcion
      msjBienvenida
      msjOffline
      nombre
      apellido
      accesToken
      nombreWeb
      paginaOrigen
    }
  }
`;
export const deleteTblStorage = /* GraphQL */ `
  mutation DeleteTblStorage($input: DeleteTblStorageInput!) {
    deleteTblStorage(input: $input) {
      objectId
      tipoObjeto
      fecha
      origen
      contenido
      avatar
      contenidoConversacion
      conversacion
      divider
      sender
      tipo
      cuenta
      permisos
      rol
      created
      descripcion
      msjBienvenida
      msjOffline
      nombre
      apellido
      accesToken
      nombreWeb
      paginaOrigen
    }
  }
`;
