import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RequestDocument, Request } from '../schema/request';
import { DTOCreateRequest } from '../dto/request.dto';
import { DTOQueryRequest } from '../dto/query-request.dto';
@Injectable()
export class RequestRepository {
  constructor(
    @InjectModel(Request.name) private requestModel: Model<Request>,
  ) {}
  async create(data: DTOCreateRequest): Promise<RequestDocument> {
    const newRequest = await this.requestModel.create(data);
    return await newRequest.populate([
      {
        path: 'user',
      },
      {
        path: 'userRequesed',
      },
    ]);
  }
  async findOne(query: DTOQueryRequest): Promise<RequestDocument | null> {
    const request = await this.requestModel.findOne(query);
    return request
      ? await request.populate([
          {
            path: 'user',
          },
          {
            path: 'userRequesed',
          },
        ])
      : null;
  }
}
