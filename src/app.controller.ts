import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller("/api")
export class AppController {
  constructor(private readonly appService: AppService) { }

}
