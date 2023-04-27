import { Module } from '@nestjs/common';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
