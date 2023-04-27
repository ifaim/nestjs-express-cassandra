import { BaseModel } from '@iaminfinity/express-cassandra';
import { CatEntity } from './cats/entities/cat.entity';
import { CreateCatDto } from './cats/dto/create-cat.dto';
export declare class AppService {
  private readonly connection;
  private readonly catModel;
  constructor(connection: any, catModel: BaseModel<CatEntity>);
  create(createCatDto: CreateCatDto): Promise<CatEntity>;
  findById(id: any): Promise<CatEntity>;
}
