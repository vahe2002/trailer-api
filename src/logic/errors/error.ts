import { HttpException, HttpStatus } from '@nestjs/common';


export const MOVIE_NOT_FOUND = new HttpException(
    'Movie not found',
    HttpStatus.NOT_FOUND
)

export const TRAILER_NOT_FOUND = new HttpException(
    'Trailer not found',
    HttpStatus.NOT_FOUND
)