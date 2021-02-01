import * as AWS from 'aws-sdk';
import { CreateCounterDto } from '../counters/dto/create-counter.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export class CounterRepository {
    constructor() {};
    listcounters = [];

    async createCounter(createCounterDto: CreateCounterDto) {
        const newCounter = {
            id: uuid(),
            counterName: createCounterDto.name,
            value: createCounterDto.value,
        };
        this.listcounters.push(newCounter);

        /* try {
            await new AWS.DynamoDB.DocumentClient()
                .put({
                    TableName: process.env.COUNTERS_TABLE_NAME,
                    Item: newCounter,
                })
                .promise();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        */

        return { ok: true, data: newCounter };
    }
}