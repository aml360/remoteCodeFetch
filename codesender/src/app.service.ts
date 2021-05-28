import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  sendCode() {
    const envFilePath = __dirname + '/code-to-send.js';
    return readFileSync(envFilePath, { encoding: 'ascii' });
  }
}
