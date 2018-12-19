import { Controller, Get, Delete } from '@nestjs/common';
import { InjectRepository, Repository } from '@iaminfinity/express-cassandra';
import { DogEntity } from './entities/dog.entity';

@Controller('dogs')
export class DogController {
  constructor(
    @InjectRepository(DogEntity)
    private readonly dogRepository: Repository<DogEntity>,
  ) {}

  @Get()
  get() {
    return this.dogRepository.find({});
  }

  @Delete()
  async delete() {
    await this.dogRepository.truncate().toPromise();
    return;
  }
}
