import { Injectable } from "@nestjs/common";
import { ImdbData } from "../dto/imdb.dto";
import { HttpService } from "../http.utils/http.service";


@Injectable()
export class FilmRepository {
    constructor(private httpService: HttpService) { }
    async getMovieInfo(film: string): Promise<ImdbData> | undefined {
        const baseUrl = process.env.FILM_API;
        const response = await this.httpService.get(baseUrl + `/pc-se/film/${film}`);
        if (response.status === 404) {
            return undefined
        }
        const movie = response.data._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb
        return {
            movieId: movie.id
        }

    }
}