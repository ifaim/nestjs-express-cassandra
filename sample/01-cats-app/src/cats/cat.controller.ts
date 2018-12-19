import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Logger,
} from '@nestjs/common';
import { CatsService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { ParseUuidPipe } from './pipes/parse-uuid.pipe';
import {
  InjectRepository,
  isUuid,
  timeuuid,
} from '@iaminfinity/express-cassandra';
import { CatRepository } from './cat.repository';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    @InjectRepository(CatRepository)
    private readonly catRepository: CatRepository,
  ) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto | CreateCatDto[]) {
    if (Array.isArray(createCatDto)) {
      return this.catRepository.saveMultiple(createCatDto);
    }
    const cat = await this.catsService.create(createCatDto).toPromise();
    return cat;
  }

  @Get()
  async findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUuidPipe()) id) {
    return this.catsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUuidPipe()) id, @Body() updateBody) {
    Logger.log(`Is uuid: ${isUuid(id)}`, CatsController.name);

    if (typeof updateBody.time_id === 'string') {
      updateBody.time_id = timeuuid(updateBody.time_id);
    }

    const { time_id, ...restBody } = updateBody;

    return this.catRepository.update({ id, time_id }, restBody);
  }

  @Post('batch')
  async doBatch() {
    await this.catsService.batch();
    return;
  }

  @Delete()
  delete() {
    return this.catRepository.truncate();
  }
}
