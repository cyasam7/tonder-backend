import { Body, Controller, Post } from '@nestjs/common';
import { DTOCreateRequest } from '../dto/request.dto';
import { RequestService } from '../service/request.service';

@Controller('/request')
export class RequestController {
  constructor(private requestService: RequestService) {}
  @Post()
  create(@Body() data: DTOCreateRequest) {
    this.requestService.createRequest(data);
  }
}
