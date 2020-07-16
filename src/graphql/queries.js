/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
      }
      nextToken
    }
  }
`;
export const getTblUser = /* GraphQL */ `
  query GetTblUser($idUser: String!) {
    getTblUser(idUser: $idUser) {
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
export const listTblUsers = /* GraphQL */ `
  query ListTblUsers(
    $filter: TableTblUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTblUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getTblStorage = /* GraphQL */ `
  query GetTblStorage($objectId: String!, $tipoObjeto: Int!) {
    getTblStorage(objectId: $objectId, tipoObjeto: $tipoObjeto) {
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
    }
  }
`;
export const listTblStorages = /* GraphQL */ `
  query ListTblStorages(
    $filter: TableTblStorageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTblStorages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      }
      nextToken
    }
  }
`;
export const queryTblStoragesByTipoObjetoFechaIndex = /* GraphQL */ `
  query QueryTblStoragesByTipoObjetoFechaIndex(
    $tipoObjeto: Int!
    $first: Int
    $after: String
  ) {
    queryTblStoragesByTipoObjetoFechaIndex(
      tipoObjeto: $tipoObjeto
      first: $first
      after: $after
    ) {
      items {
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
      }
      nextToken
    }
  }
`;
