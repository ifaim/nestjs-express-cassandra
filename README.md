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

Express Cassandra utilities module for [Nest](https://github.com/nestjs/nest) based on the [express-cassandra](https://github.com/masumsoft/express-cassandra) package.

## Installation

```bash
$ npm i --save @iaminfinity/express-cassandra express-cassandra
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
    return this.photoEntity.findOneAsync({ name: 'somename' }, { raw: true });
  }
}
```

## Stay in touch

- Author - [Fahim Rahman](https://github.com/ifaim)
