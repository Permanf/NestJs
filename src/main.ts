import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { DataSource} from 'typeorm';
import { SessionEntity } from './typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Define and initialize the data source
  const AppDataSource = new DataSource({
    type: 'postgres', // Change to your DBMS (e.g., 'postgres')
    host: 'postgres_db',
    port: 5432, // Adjust for your database
    username: 'postgres',
    password: 'hello123',
    database: 'nestjs-task',
    entities: [SessionEntity], // Ensure you have your entities listed here
    synchronize: true, // Set to false in production
  });

  await AppDataSource.initialize();

  // Get the repository
  const sessionRepository = AppDataSource.getRepository(SessionEntity);
  // const sessionRepository = getRepository(SessionEntity)
  app.setGlobalPrefix('api');
  app.use(
    session({
      name: 'nestjs-session',
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 },
      store: new TypeormStore().connect(sessionRepository)
    })
  )
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5001);
}
bootstrap();
