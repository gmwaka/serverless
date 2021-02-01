import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { CountersService } from './counters.service';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';

@Controller('counters')
export class CountersController {
  constructor(private readonly countersService: CountersService) {}

  @Post('/counters')
  async create(@Body() createCounterDto: CreateCounterDto, @Res() res:any) {
    try {
      const newCounter: any = await this.countersService.create(createCounterDto);
      if (newCounter.ok) {
        return res.status(HttpStatus.CREATED).json({
          ok: true,
          data: newCounter.data
        });
      }
      else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          ok: false,
          message: 'Error Trying to create a counter'
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'Error Trying to create a counter',
        errors: error
      });
    }
    // return this.countersService.create(createCounterDto);
  }

  @Get()
  findAll() {
    return this.countersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCounterDto: UpdateCounterDto) {
    return this.countersService.update(+id, updateCounterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countersService.remove(+id);
  }
}
