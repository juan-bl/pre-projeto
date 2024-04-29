import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getHello() {
    const categoria = await this.prisma.categoria.create({
      data: {
        nome: 'agora',
      },
    });
    return {
      categoria,
    };
  }
}
