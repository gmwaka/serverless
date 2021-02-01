import { Injectable } from '@nestjs/common';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';
import { CounterRepository } from '../repositories/counters.repository';

@Injectable()
export class CountersService {
  constructor(private counterRepository: CounterRepository) {}

  async create(createCounterDto: CreateCounterDto) {
    const createdCounter = await this.counterRepository.createCounter(createCounterDto);
    return createdCounter;
    // return 'This action adds a new counter';
  }

  async findAll() {
    const counters = await this.counterRepository.getCounters();
    return counters;
    // return `This action returns all counters`;
  }

  async findOne(id: string) {
    const counter = await this.counterRepository.getCounter(id);
    return counter;
  }

  async update(id: string) {
    const counter = await this.counterRepository.updateCounter(id);
    return counter;
  }

  async remove(id: string) {
    const counter = await this.counterRepository.removeCounter(id);
    return counter;
  }
}
