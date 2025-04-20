# storeTest

Levantar proyecto
  npm run dev


Base de datos
  Comandos
    #levantar bases de datos
      docker-compose up -d postgres
      docker-compose up -d pgadmin
      docker-compose up -d mysql
      docker-compose up -d phpmyadmin

    #ver instancias arriba
      docker_compose ps
      
    #tirar bases de datos
      docker-compose down
      
    #correr bash de la bd
      docker-compose exec postgres bash
      
    #conectar a db
      psql -h localhost -d my_store -U victor
      
    #ver datos
      \d+

ORM (Object Relational Model)
  Es un modelo agnóstico para gestionar peticiones
  Sequelize
  Los métodos estáticos no necesitan una declaración para acceder a ellos

Hashing de contraseñas
  Sirve para proteger en BD

Revisar accescontroll library para seguridad más profunda

