import { Injectable } from '@nestjs/common';
import {
  BaseModel,
  InjectModel,
  uuid,
  InjectConnection,
} from '@iaminfinity/express-cassandra';
import { CatEntity } from './cats/entities/cat.entity';
import { CreateCatDto } from './cats/dto/create-cat.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection('test2')
    private readonly connection: any,
    // inject CatEntity from connection=test2
    @InjectModel(CatEntity) private readonly catModel: BaseModel<CatEntity>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<CatEntity> {
    const cat = new this.catModel(createCatDto);
    return await cat.saveAsync();
  }

  async findById(id): Promise<CatEntity> {
    if (typeof id === 'string') {
      id = uuid(id);
    }
    return await this.catModel.findOneAsync({ id }, { raw: true });
  }
}
