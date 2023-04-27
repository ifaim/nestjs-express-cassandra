import { Repository } from '@iaminfinity/express-cassandra';
import { CatEntity } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { DogEntity } from './entities/dog.entity';
import { CatRepository } from './cat.repository';
import { Observable } from 'rxjs';
export declare class CatsService {
  private readonly catRepository;
  private readonly dogRepository;
  private readonly logger;
  constructor(
    catRepository: CatRepository,
    dogRepository: Repository<DogEntity>,
  );
  create(createCatDto: CreateCatDto): Observable<CatEntity>;
  findAll(): any;
  findById(id: any): Observable<CatEntity>;
  batch(): Promise<void>;
}
