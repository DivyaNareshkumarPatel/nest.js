import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { LazyModuleLoader } from '@nestjs/core';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private lazyModuleLoader: LazyModuleLoader
  ) { }

  @Get('lazy')
  async loadLazyModule(): Promise<string> {
    const { LazyModule } = await import('./lazy/lazy.module');
    const moduleRef = await this.lazyModuleLoader.load(() => LazyModule);

    const { LazyService } = await import('./lazy/lazy.service');
    const lazyService = moduleRef.get(LazyService);

    return lazyService.execute();
  }

  @Post('cache')
  async setCacheKey(@Query('key') key: string, @Query('value') value: string) {
    await this.appService.setCacheKey(key, value);
    return {
      success: true,
      status: 201,
      message: 'Key cached successfully'
    }
  }

  @Get('cache/:key')
  async getCacheKey(@Param('key') key: string) {
    const data = await this.appService.getCacheKey(key);
    return {
      success: true,
      status: 200,
      data
    }
  }
}
