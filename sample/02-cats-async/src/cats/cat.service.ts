import { Injectable } from '@nestjs/common';
import { BaseModel, InjectModel, uuid } from '@iaminfinity/express-cassandra';
import { CatEntity } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(CatEntity) private readonly catModel: BaseModel<CatEntity>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<CatEntity> {
    const cat = new this.catModel(createCatDto);
    return await cat.saveAsync();
  }

  async findAll(): Promise<CatEntity[]> {
    return await this.catModel.findAsync({}, { raw: true });
  }

  async findById(id): Promise<CatEntity> {
    if (typeof id === 'string') {
      id = uuid(id);
    }
    return await this.catModel.findOneAsync({ id });
  }
}
