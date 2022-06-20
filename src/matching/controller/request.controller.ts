import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DTOCreateRequest } from '../dto/request.dto';
import { RequestService } from '../service/request.service';

@Controller('/request')
@ApiTags('Request')
export class RequestController {
  constructor(private requestService: RequestService) {}
  @Post()
  async create(@Body() data: DTOCreateRequest): Promise<void> {
    await this.requestService.createRequest(data);
  }
}
