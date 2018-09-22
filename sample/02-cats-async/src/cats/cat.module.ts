import { Module } from '@nestjs/common';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { CatEntity } from './entities/cat.entity';
import { CatsService } from './cat.service';
import { CatsController } from './cat.controller';

@Module({
  imports: [ExpressCassandraModule.forFeature([CatEntity])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
