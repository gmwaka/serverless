import * as AWS from 'aws-sdk';
import { CreateCounterDto } from '../counters/dto/create-counter.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export class CounterRepository {
    constructor() {};
    listcounters = [];

    async createCounter(createCounterDto: CreateCounterDto) {
        const newCounter = {
            counterName: createCounterDto.name,
            value: Number(createCounterDto.value),
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

    async getCounters() {
        const result = {};
        this.listcounters.forEach(counter => {
            result[counter.counterName] = counter.value;
        });

        return { ok: true, data: result };
    }
    
    async getCounter(id) {
        var found = false;
        var objectFounded = null;
        for (var i = 0; this.listcounters.length > i; i++) {
            if (this.listcounters[i].counterName === id) {
                found = true;
                objectFounded = this.listcounters[i];
                break;
            }
        }

        if (found) {
            return { ok: true, data: objectFounded };
        } else {
            throw new NotFoundException;
        }
    }

    async updateCounter(id) {
        var found = false;
        var objectUpdated = null;
        for (var i = 0; this.listcounters.length > i; i++) {
            if (this.listcounters[i].counterName === id) {
                this.listcounters[i].value = this.listcounters[i].value + 1;
                found = true;
                objectUpdated = this.listcounters[i];
                break;
            }
        }

        if (found) {
            return { ok: true, data: objectUpdated };
        } else {
            throw new NotFoundException;
        }
    }

    async removeCounter(id) {
        var found = false;
        var objectDeleted = null;
        for (var i = 0; this.listcounters.length > i; i++) {
            if (this.listcounters[i].counterName === id) {
                found = true;
                objectDeleted = this.listcounters[i];
                delete this.listcounters[i];
                break;
            }
        }

        if (found) {
            return { ok: true, data: objectDeleted };
        } else {
            throw new NotFoundException;
        }
    }
    
}