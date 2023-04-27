import { CatsService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatRepository } from './cat.repository';
export declare class CatsController {
  private readonly catsService;
  private readonly catRepository;
  constructor(catsService: CatsService, catRepository: CatRepository);
  create(
    createCatDto: CreateCatDto | CreateCatDto[],
  ): Promise<
    | import('./entities/cat.entity').CatEntity
    | import('rxjs').Observable<unknown[]>
  >;
  findAll(): Promise<any>;
  findOne(
    id: any,
  ): import('rxjs').Observable<import('./entities/cat.entity').CatEntity>;
  update(id: any, updateBody: any): any;
  doBatch(): Promise<void>;
  delete(): any;
}
