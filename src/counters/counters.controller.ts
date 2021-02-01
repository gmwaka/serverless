import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { CountersService } from './counters.service';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';

@Controller('counters')
export class CountersController {
  constructor(private readonly countersService: CountersService) {}

  @Post()
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
  async findAll() {
    return this.countersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string,  @Res() res:any) {
    try {
      const counter: any = await this.countersService.findOne(id);
      if (counter.ok) {
        return res.status(HttpStatus.OK).json({
          ok: true,
          data: counter.data
        });
      }
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        message: 'Not Found',
        errors: error
      });
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Res() res:any) {
    try {
      const counter: any = await this.countersService.update(id);
      if (counter.ok) {
        return res.status(HttpStatus.OK).json({
          ok: true,
          data: counter.data
        });
      }
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        message: 'Not Found',
        errors: error
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res:any) {
    try {
      const counter: any = await this.countersService.remove(id);
      if (counter.ok) {
        return res.status(HttpStatus.OK).json({
          ok: true,
          data: counter.data
        });
      }
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        message: 'Not Found',
        errors: error
      });
    }
  }
}
