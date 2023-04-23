import { Injectable } from '@nestjs/common';
import { MovieIdDto } from 'src/logic/dto/movie.id.dto';
import { FilmRepository } from 'src/integration/repositories/film.repository';
import { MovieDbRepository } from 'src/integration/repositories/moviedb.repository';
import { TrailerLinkDto } from '../dto/trailer.link.dto';
import { MdbVideo } from 'src/integration/dto/mdb.dto';
import { MOVIE_NOT_FOUND, TRAILER_NOT_FOUND } from '../errors/error';

@Injectable()
export class AppService {
  constructor(
    private filmRepository: FilmRepository,
    private mdbRepository: MovieDbRepository
  ) { }
  getHello(): string {
    return 'Hello! Welcome to the trailer app!';
  }

  async getTrailer(movie: MovieIdDto): Promise<TrailerLinkDto> {
    const imdbData = await this.filmRepository.getMovieInfo(movie.id)
    if (imdbData === undefined) {
      throw MOVIE_NOT_FOUND
    }
    const videoList = await this.mdbRepository.getMovieVideos(imdbData.movieId)
    if (videoList === undefined) {
      throw TRAILER_NOT_FOUND
    }

    const trailerData = this.mapData(videoList, 'trailer')
    if (trailerData === undefined) {
      throw TRAILER_NOT_FOUND
    }
    switch (trailerData.site) {
      case 'YouTube':
        return {
          url: `https://www.youtube.com/watch?v=${trailerData.key}`
        }

      case 'Vimeo':

        return {
          url: `https://vimeo.com/${trailerData.key}`
        }

      default:
        return {
          url: ''
        }
    }



  }
  private mapData(list: MdbVideo[], key: string): MdbVideo {

    return list.find(video => video.type.toLocaleLowerCase() === key.toLowerCase())
  }


}
