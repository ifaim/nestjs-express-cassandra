import { Module } from '@nestjs/common';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { CatsModule } from './cats';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { CatEntity } from './cats/entities/cat.entity';
import { AppService } from './app.service';

@Module({
  imports: [
    ExpressCassandraModule.forRootAsync({
      useClass: ConfigService,
    }),
    ExpressCassandraModule.forRootAsync({
      name: 'test2',
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.getDbConfig2(),
      inject: [ConfigService],
    }),
    ExpressCassandraModule.forFeature([CatEntity], 'test2'),
    CatsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
