import { BaseModel } from '@iaminfinity/express-cassandra';
import { CatEntity } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
export declare class CatsService {
  private readonly connection;
  private readonly catModel;
  constructor(connection: any, catModel: BaseModel<CatEntity>);
  create(createCatDto: CreateCatDto): Promise<CatEntity>;
  findAll(): Promise<CatEntity[]>;
  findById(id: any): Promise<CatEntity>;
}
