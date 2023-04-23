import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from '../../logic/services/app.service';
import { AppController } from '../controllers/app.controller';
import { FilmRepository } from 'src/integration/repositories/film.repository';
import { MovieDbRepository } from 'src/integration/repositories/moviedb.repository';
import { HttpService } from 'src/integration/http.utils/http.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, FilmRepository, MovieDbRepository, HttpService],
})
export class AppModule {}
