import { Injectable, Logger } from '@nestjs/common';
import {
  uuid,
  InjectRepository,
  Repository,
} from '@iaminfinity/express-cassandra';
import { CatEntity } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { tap } from 'rxjs/operators';
import { DogEntity } from './entities/dog.entity';
import { CatRepository } from './cat.repository';
import { Observable } from 'rxjs';

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name);

  constructor(
    @InjectRepository(CatRepository)
    private readonly catRepository: CatRepository,
    @InjectRepository(DogEntity)
    private readonly dogRepository: Repository<DogEntity>,
  ) {}

  create(createCatDto: CreateCatDto): Observable<CatEntity> {
    const cat = this.catRepository.create({ ...createCatDto });
    cat.age = 12;
    cat.breed = 'some';
    return this.catRepository.save(cat).pipe(
      tap(x => {
        this.logger.log(x);
        this.logger.log(
          `Instance of ${CatEntity.name}: ${x instanceof CatEntity}`,
        );
      }),
    );
  }

  findAll() {
    return this.catRepository.findAndCount({});
  }

  findById(id): Observable<CatEntity> {
    if (typeof id === 'string') {
      id = uuid(id);
    }
    return this.catRepository.findOne({ id }).pipe(
      tap(x => {
        this.logger.log(x);
        this.logger.log(
          `Instance of ${CatEntity.name}: ${x instanceof CatEntity}`,
        );
      }),
    );
  }

  async batch() {
    const queries = [];
    const catBuilder = this.catRepository.getReturnQueryBuilder();
    const dogBuilder = this.dogRepository.getReturnQueryBuilder();

    queries.push(catBuilder.save({ name: 'batch cat' }));
    queries.push(dogBuilder.save({ name: 'batch dog' }));

    await this.catRepository.doBatch(queries);

    this.logger.log(`Running batch`, CatsService.name);
    this.logger.log(
      `Batch queries ${JSON.stringify(queries)}`,
      CatsService.name,
    );

    return;
  }
}
