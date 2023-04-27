import { CatsService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatEntity } from './entities/cat.entity';
export declare class CatsController {
  private readonly catsService;
  constructor(catsService: CatsService);
  create(createCatDto: CreateCatDto): Promise<void>;
  findAll(): Promise<CatEntity[]>;
  findOne(id: any): Promise<CatEntity>;
}
