import { Controller, Get, Delete, Post, Body, Logger } from '@nestjs/common';
import { InjectRepository, Repository } from '@iaminfinity/express-cassandra';
import { DogEntity } from './entities/dog.entity';

@Controller('dogs')
export class DogController {
  private readonly logger = new Logger(DogController.name);

  constructor(
    @InjectRepository(DogEntity)
    private readonly dogRepository: Repository<DogEntity>,
  ) {}

  @Post()
  async create(@Body() body) {
    const dog = await this.dogRepository.save({ ...body }).toPromise();
    this.logger.log(
      `Dog id ${dog.id.toString()}. Dog has id because ${
        DogEntity.name
      } use @PrimaryGeneratedColumn decorator.`,
    );
    return dog;
  }

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
