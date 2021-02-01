import { Module } from '@nestjs/common';
import { CountersService } from './counters.service';
import { CountersController } from './counters.controller';
import { CounterRepository } from '../repositories/counters.repository';

@Module({
  controllers: [CountersController],
  providers: [CountersService, CounterRepository]
})
export class CountersModule {}
