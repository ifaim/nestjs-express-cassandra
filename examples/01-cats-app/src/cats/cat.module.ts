import { Module } from '@nestjs/common';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { CatEntity } from './entities/cat.entity';
import { CatsService } from './cat.service';
import { CatsController } from './cat.controller';
import { CatRepository } from './cat.repository';
import { DogEntity } from './entities/dog.entity';
import { DogController } from './dog.controller';

@Module({
  imports: [
    ExpressCassandraModule.forFeature([CatEntity, DogEntity, CatRepository]),
  ],
  controllers: [CatsController, DogController],
  providers: [CatsService],
})
export class CatsModule {}
