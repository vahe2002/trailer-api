import { Injectable } from "@nestjs/common";
import { MdbVideo } from "../dto/mdb.dto";
import { HttpService } from "../http.utils/http.service";

@Injectable()
export class MovieDbRepository {
    constructor(private httpService: HttpService) { }
    async getMovieVideos(id: string): Promise<MdbVideo[]> | undefined {
        const baseUrl = process.env.MOVIE_DB_API;
        const apiKey = process.env.MOVIE_DB_API_KEY;
        const result = await this.httpService.get(baseUrl + `/movie/${id}/videos?api_key=${apiKey}&language=en-US`);
        if (result.status === 404)
        return undefined       
        return result.data.results .map((video: MdbVideo) => ({
            key: video.key,
            site: video.site,
            type: video.type
        })
        )
    

    }
}