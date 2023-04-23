import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from 'src/logic/services/app.service';
import { MovieIdDto } from '../../logic/dto/movie.id.dto';
import { TrailerLinkDto } from 'src/logic/dto/trailer.link.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/trailer')
  async getTrailer(@Query() query: MovieIdDto):Promise<TrailerLinkDto> {

   return await this.appService.getTrailer(query)

  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
    
  
}
