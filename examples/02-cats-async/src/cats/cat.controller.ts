import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatsService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatEntity } from './entities/cat.entity';
import { ParseUuidPipe } from './pipes/parse-uuid.pipe';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<CatEntity[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUuidPipe()) id) {
    return this.catsService.findById(id);
  }
}
