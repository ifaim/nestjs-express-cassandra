<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">
  Nest.js module containing useful utilities and decorators for [express-cassandra](https://github.com/masumsoft/express-cassandra).
</p>

## TLDR moving from `nestjs-express-cassandra`

```sh
pnpm remove @iaminfinity/express-cassandra
pnpm i @iaminfinity/express-cassandra@npm:@liliana1110/nest-cassandra:^6.1.0 @liliana1110/nest-cassandra:^6.1.0
``` 

```sh
npm uninstall @iaminfinity/express-cassandra
npm i --save @iaminfinity/express-cassandra@npm:@liliana1110/nest-cassandra:^6.1.0 @liliana1110/nest-cassandra:^6.1.0
``` 

```sh
yarn remove @iaminfinity/express-cassandra
yarn add @iaminfinity/express-cassandra@npm:@liliana1110/nest-cassandra:^6.1.0 @liliana1110/nest-cassandra:^6.1.0
``` 

And you're done. Incrementally and in new code, use the `@liliana1110/nest-cassandra` package instead and replace the following imports (currently aliased but support will drop in 7.x):
(`ExpressCassandraOptionsFactory` currently stays the same, it is a subject to change in 7.x though)
- `ExpressCassandraModule` -> `CassandraModule`
- (internal) `ExpressCassandraCoreModule` -> `CassandraCoreModule`
- `ExpressCassandraModuleOptions` -> CassandraModuleOptions
- `ExpressCassandraModuleAsyncOptions` -> `CassandraModulAsyncOptions`
- `ExpressCassandraStatic` -> `CassandraStatic`

## :warning: Deprecation of the `Express` prefix

Currently, to support drop-in replacement from the (seemingly) unmaintained packgae [nestjs-express-cassandra](https://github.com/ifaim/nestjs-express-cassandra), the `CassandraModule` module is still available as `ExpressCassandraModule` (likewise for other `Express` prefixed objects/types), however they are considered deprecated and will drop in 7.x in favor of omitting a prefix altogethers (instead using `CassandraModule*`)!

## Installation

```bash
$ pnpm i @liliana1110/nest-cassandra
$ npm i --save @liliana1110/nest-cassandra
$ yarn add @liliana1110/nest-cassandra
```

## Basic uage

```typescript
import { CassandraModule } from "@liliana1110/nest-cassandra";

@Module({
  imports: [
    CassandraModule.forRoot({...})
  ],
  providers: [...]
})
export class AppModule {}
```

## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use registerAsync() method, that provides a couple of various ways to deal with async data.

**1. Use factory**

```typescript
CassandraModule.forRootAsync({
  useFactory: () => ({...}),
})
```

Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```typescript
CassandraModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => configService.getDbConfig(),
  inject: [ConfigService],
});
```

**2. Use class**

```typescript
CassandraModule.forRootAsync({
  useClass: ConfigService,
});
```

Above construction will instantiate `ConfigService` inside `CassandraModule` and will leverage it to create options object.

```typescript
class ConfigService implements ExpressCassandraOptionsFactory {
  createExpressCassandraOptions(): CassandraModuleOptions {
    return {...};
  }
}
```

**3. Use existing**

```typescript
CassandraModule.forRootAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
});
```

It works the same as `useClass` with one critical difference - `CassandraModule` will lookup imported modules to reuse already created ConfigService, instead of instantiating it on its own.

## ORM Options

```typescript
import { Entity, Column } from '@liliana1110/nest-cassandra';

@Entity({
  table_name: 'photo',
  key: ['id'],
})
export class PhotoEntity {
  @Column({
    type: 'uuid',
    default: { $db_function: 'uuid()' },
  })
  id: any;

  @Column({
    type: 'text',
  })
  name: string;
}
```

Let's have a look at the `PhotoModule`

```typescript
import { Module } from '@nestjs/common';
import { CassandraModule } from '@liliana1110/nest-cassandra';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PhotoEntity } from './photo.entity';

@Module({
  imports: [CassandraModule.forFeature([PhotoEntity])],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
```

This module uses `forFeature()` method to define which entities shall be registered in the current scope. Thanks to that we can inject the `PhotoEntity` to the `PhotoService` using the `@InjectModel()` decorator:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel, BaseModel } from '@liliana1110/nest-cassandra';
import { PhotoEntity } from './photo.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(PhotoEntity)
    private readonly photoEntity: BaseModel<PhotoEntity>
  ) {}

  getByName(name: string): Promise<PhotoEntity> {
    return this.photoEntity.findOneAsync({ name: name }, { raw: true });
  }
}
```

**Using Column Decorators:**
To auto-generate uuid/timeuuid column, you need to decorate an entity's properties you want to make into a auto-generated
uuid/timeuuid column with a `@GeneratedUUidColumn` decorator.

```typescript
import { Entity, Column, GeneratedUUidColumn } from '@liliana1110/nest-cassandra';

@Entity({
  table_name: 'photo',
  key: ['id'],
})
export class PhotoEntity {
  @GeneratedUUidColumn()
  id: any;

  @GeneratedUUidColumn('timeuuid')
  time_id: any;

  @Column({
    type: 'text',
  })
  name: string;
}
```

To auto-generate createdDate/updatedDate column, you need to decorate an entity's properties you want to make into a auto-generated
createdDate/updatedDate column with a `@CreateDateColumn` or `@UpdateDateColumn` decorator.

To index a column, you need to decorate an entity's properties you want to index with a `@IndexColumn` decorator.

To auto-generate version column, you need to decorate an entity's properties you want to make into a auto-generated
version column with a `@VersionColumn` decorator.

```typescript
import {
  Entity,
  Column,
  GeneratedUUidColumn,
  CreateDateColumn,
  UpdateDateColumn,
  IndexColumn,
  VersionColumn,
} from '@liliana1110/nest-cassandra';

@Entity({
  table_name: 'photo',
  key: ['id'],
})
export class PhotoEntity {
  @GeneratedUUidColumn()
  id: any;

  @GeneratedUUidColumn('timeuuid')
  time_id: any;

  @Column({
    type: 'text',
  })
  @IndexColumn()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @VersionColumn()
  __v1: any;
}
```

**Using Hook Function Decorators:**
An entity of express-cassandra support multiple hook function. For more details [see](https://express-cassandra.readthedocs.io/en/stable/management/#hook-functions).

To create hook function in an entity use `@BeforeSave`, `@AfterSave`, `@BeforeUpdate`, `@AfterUpdate`, `@BeforeDelete`, `@AfterDelete` decorators.

```typescript
import {
  Entity,
  Column,
  GeneratedUUidColumn,
  BeforeSave,
  AfterSave,
  BeforeUpdate,
  AfterUpdate,
  BeforeDelete,
  AfterDelete,
} from '@liliana1110/nest-cassandra';

@Entity({
  table_name: 'photo',
  key: ['id'],
})
export class PhotoEntity {
  @GeneratedUUidColumn()
  id: any;

  @GeneratedUUidColumn('timeuuid')
  time_id: any;

  @BeforeSave()
  beforeSave(instance: this, options: any) {}

  @AfterSave()
  afterSave(instance: this, options: any) {}

  @BeforeUpdate()
  beforeUpdate(query: any, updateValues: any, options: any) {}

  @AfterUpdate()
  afterUpdate(query: any, updateValues: any, options: any) {}

  @BeforeDelete()
  beforeDelete(query: any, options: any) {}

  @AfterDelete()
  afterDelete(query: any, options: any) {}
}
```

## Injecting a Repository

```typescript
import { Module } from '@nestjs/common';
import { CassandraModule } from '@liliana1110/nest-cassandra';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PhotoEntity } from './photo.entity';

@Module({
  imports: [CassandraModule.forFeature([PhotoEntity])],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
```

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from '@liliana1110/nest-cassandra';
import { PhotoEntity } from './photo.entity';
import { Observable } from 'rxjs';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>
  ) {}

  getById(id: id): Observable<PhotoEntity> {
    return this.photoRepository.findOne({ id });
  }
}
```

## Using a Custom Repository

Let's create a repository:

```typescript
import { Repository, EntityRepository } from '@liliana1110/nest-cassandra';
import { PhotoEntity } from './photo.entity';
import { Observable } from 'rxjs';

@EntityRepository(PhotoEntity)
export class PhotoRepository extends Repository<PhotoEntity> {
  findById(id: any): Observable<PhotoEntity> {
    return this.findOne({ id: id });
  }
}
```

Let's have a look at the `PhotoModule`:

```typescript
import { Module } from '@nestjs/common';
import { CassandraModule } from '@liliana1110/nest-cassandra';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PhotoEntity } from './photo.entity';
import { PhotoRepository } from './photo.repository';

@Module({
  imports: [CassandraModule.forFeature([PhotoEntity, PhotoRepository])],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
```

Now let's use `PhotoRepository` in `PhotoService`:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@liliana1110/nest-cassandra';
import { PhotoEntity } from './photo.entity';
import { PhotoRepository } from './photo.repository';
import { Observable } from 'rxjs';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PhotoRepository)
    private readonly photoRepository: PhotoRepository
  ) {}

  getById(id: any): Observable<PhotoEntity> {
    return this.photoRepository.findById(id);
  }
}
```

Injecting connection:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@liliana1110/nest-cassandra';
import { PhotoEntity } from './photo.entity';
import { PhotoRepository } from './photo.repository';
import { Observable } from 'rxjs';

@Injectable()
export class PersonService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(PhotoRepository)
    private readonly photoRepository: PhotoRepository
  ) {}

  getById(id: any): Observable<PhotoEntity> {
    return this.photoRepository.findById(id);
  }
}
```

## Using Elassandra

Express cassandra support `Elassandra`. For more details [see](https://express-cassandra.readthedocs.io/en/stable/elassandra/).

```typescript
@Module({
  imports: [
    ExpressCassandraModule.forRoot({
      clientOptions: {
        // omitted other options for clarity
      },
      ormOptions: {
        // omitted other options for clarity
        migration: 'alter',
        manageESIndex: true,
      }
    })
  ],
  providers: [...]
})
export class AppModule {}
```

```typescript
import { Entity, Column } from '@liliana1110/nest-cassandra';

@Entity<PhotoEntity>({
  table_name: 'photo',
  key: ['id'],
  es_index_mapping: {
    discover: '.*',
    properties: {
      name: {
        type: 'string',
        index: 'analyzed',
      },
    },
  },
})
export class PhotoEntity {
  @Column({
    type: 'uuid',
    default: { $db_function: 'uuid()' },
  })
  id: any;

  @Column({
    type: 'text',
  })
  name: string;
}
```

```typescript
import { Module } from '@nestjs/common';
import { CassandraModule } from '@liliana1110/nest-cassandra';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PhotoEntity } from './photo.entity';

@Module({
  imports: [CassandraModule.forFeature([PhotoEntity])],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
```

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel, BaseModel } from '@liliana1110/nest-cassandra';
import { PhotoEntity } from './photo.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(PhotoEntity)
    private readonly photoEntity: BaseModel<PhotoEntity>
  ) {}

  searchName(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.catModel.search({ q: `name:${name}` }, (err, response) => {
        if (err) {
          return reject(err);
        } else {
          return response(response);
        }
      });
    });
  }
}
```

<hr>

2023 Mia Vališová &ndash Licensed under MIT. Original library by [Fahim Rahman](https://github.com/ifaim).
