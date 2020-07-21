/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
    }
  }
`;
export const onCreateTblUser = /* GraphQL */ `
  subscription OnCreateTblUser(
    $idUser: String
    $permisos: [String]
    $rol: String
    $apellido: String
    $correo: String
  ) {
    onCreateTblUser(
      idUser: $idUser
      permisos: $permisos
      rol: $rol
      apellido: $apellido
      correo: $correo
    ) {
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
export const onUpdateTblUser = /* GraphQL */ `
  subscription OnUpdateTblUser(
    $idUser: String
    $permisos: [String]
    $rol: String
    $apellido: String
    $correo: String
  ) {
    onUpdateTblUser(
      idUser: $idUser
      permisos: $permisos
      rol: $rol
      apellido: $apellido
      correo: $correo
    ) {
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
export const onDeleteTblUser = /* GraphQL */ `
  subscription OnDeleteTblUser(
    $idUser: String
    $permisos: [String]
    $rol: String
    $apellido: String
    $correo: String
  ) {
    onDeleteTblUser(
      idUser: $idUser
      permisos: $permisos
      rol: $rol
      apellido: $apellido
      correo: $correo
    ) {
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
export const onCreateTblStorage = /* GraphQL */ `
  subscription OnCreateTblStorage(
    $objectId: String
    $tipoObjeto: Int
    $fecha: String
    $origen: String
    $contenido: String
  ) {
    onCreateTblStorage(
      objectId: $objectId
      tipoObjeto: $tipoObjeto
      fecha: $fecha
      origen: $origen
      contenido: $contenido
    ) {
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
export const onUpdateTblStorage = /* GraphQL */ `
  subscription OnUpdateTblStorage(
    $objectId: String
    $tipoObjeto: Int
    $fecha: String
    $origen: String
    $contenido: String
  ) {
    onUpdateTblStorage(
      objectId: $objectId
      tipoObjeto: $tipoObjeto
      fecha: $fecha
      origen: $origen
      contenido: $contenido
    ) {
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
export const onDeleteTblStorage = /* GraphQL */ `
  subscription OnDeleteTblStorage(
    $objectId: String
    $tipoObjeto: Int
    $fecha: String
    $origen: String
    $contenido: String
  ) {
    onDeleteTblStorage(
      objectId: $objectId
      tipoObjeto: $tipoObjeto
      fecha: $fecha
      origen: $origen
      contenido: $contenido
    ) {
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
