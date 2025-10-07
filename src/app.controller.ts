import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      status: 'ok',
      message: 'API is running 🚀',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
