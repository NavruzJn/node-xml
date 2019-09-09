import Redis from 'ioredis';
import {redisConfig} from '../config';

const redis = new Redis(redisConfig.port, redisConfig.url);

redis.on('ready', () => console.log('------------> redis is on ready'));
redis.on('end', () => console.log('------------> redis is on end'));
redis.on('error', err => console.error(err));
redis.on('reconnecting', () => console.log('------------> redis is on reconnecting'));

module.exports = redis;
