<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Express Cassandra utilities module for [NestJS](https://github.com/nestjs/nest) based on the [express-cassandra](https://github.com/masumsoft/express-cassandra) package.

## Installation

```bash
$ npm i --save @iaminfinity/express-cassandra
```
## Usage

Import `ExpressCassandraModule`:

```typescript
@Module({
  imports: [
    ExpressCassandraModule.forRoot({...})
  ],
  providers: [...]
})
export class AppModule {}
```

## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use registerAsync() method, that provides a couple of various ways to deal with async data.

**1. Use factory**

```typescript
ExpressCassandraModule.forRootAsync({
  useFactory: () => ({...}),
})
```

Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```typescript
ExpressCassandraModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => configService.getDbConfig(),
  inject: [ConfigService],
})
```

**2. Use class**

```typescript
ExpressCassandraModule.forRootAsync({
  useClass: ConfigService,
})
```

Above construction will instantiate `ConfigService` inside `ExpressCassandraModule` and will leverage it to create options object.

```typescript
class ConfigService implements ExpressCassandraOptionsFactory {
  createExpressCassandraOptions(): ExpressCassandraModuleOptions {
    return {...};
  }
}
```

**3. Use existing**

```typescript
ExpressCassandraModule.forRootAsync({
  imports: [ConfigModule],
  useExisting: ConfigService
})
```

It works the same as `useClass` with one critical difference - `ExpressCassandraModule` will lookup imported modules to reuse already created ConfigService, instead of instantiating it on its own.

## ORM Options

```typescript
import { Entity, Column } from '@iaminfinity/express-cassandra';

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
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PhotoEntity } from './photo.entity';

@Module({
  imports: [ExpressCassandraModule.forFeature([PhotoEntity])],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
```

This module uses `forFeature()` method to define which entities shall be registered in the current scope. Thanks to that we can inject the `PhotoEntity` to the `PhotoService` using the `@InjectModel()` decorator:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel, BaseModel } from '@iaminfinity/express-cassandra';
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
import { Entity, Column, GeneratedUUidColumn } from '@iaminfinity/express-cassandra';

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
} from '@iaminfinity/express-cassandra';

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
} from '@iaminfinity/express-cassandra';

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

## Using Repository

```typescript
import { Module } from '@nestjs/common';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PhotoEntity } from './photo.entity';

@Module({
  imports: [ExpressCassandraModule.forFeature([PhotoEntity])],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
```

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from '@iaminfinity/express-cassandra';
import { PhotoEntity } from './photo.entity';
import { Observable } from 'rxjs';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
  ) {}

  getById(id: id): Observable<PhotoEntity> {
    return this.photoRepository.findOne({id});
  }
}
```

## Using Custom Repository

Let's create a repository:

```typescript
import { Repository, EntityRepository } from '@iaminfinity/express-cassandra';
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
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PhotoEntity } from './photo.entity';
import { PhotoRepository } from './photo.repository';

@Module({
  imports: [ExpressCassandraModule.forFeature([PhotoEntity, PhotoRepository])],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
```

Now let's use `PhotoRepository` in `PhotoService`:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@iaminfinity/express-cassandra';
import { PhotoEntity } from './photo.entity';
import { PhotoRepository } from './photo.repository';
import { Observable } from 'rxjs';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PhotoRepository)
    private readonly photoRepository: PhotoRepository,
  ) {}

  getById(id: any): Observable<PhotoEntity> {
    return this.photoRepository.findById(id);
  }
}
```

Injecting connection:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@iaminfinity/express-cassandra';
import { PhotoEntity } from './photo.entity';
import { PhotoRepository } from './photo.repository';
import { Observable } from 'rxjs';

@Injectable()
export class PersonService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(PhotoRepository)
    private readonly photoRepository: PhotoRepository,
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
import { Entity, Column } from '@iaminfinity/express-cassandra';

@Entity<PhotoEntity>({
  table_name: 'photo',
  key: ['id'],
  es_index_mapping: {
    discover: '.*',
    properties: {
      name : {
        type : 'string',
        index : 'analyzed',
      },
    },
  }
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
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PhotoEntity } from './photo.entity';

@Module({
  imports: [ExpressCassandraModule.forFeature([PhotoEntity])],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
```

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel, BaseModel } from '@iaminfinity/express-cassandra';
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

## Stay in touch

- Author - [Fahim Rahman](https://github.com/ifaim)
