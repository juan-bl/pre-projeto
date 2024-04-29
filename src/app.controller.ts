import { Controller, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get('categorias')
  async categoriasGet() {
    return await this.prisma.categoria.findMany();
  }

  @Get('categoria/:id')
  async categoriaId(@Param('id') id: number) {
    return await this.prisma.categoria.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  @Post('categoria')
  async categoriaPost() {
    return await this.prisma.categoria.create({
      data: {
        nome: 'testeManual',
      },
    });
  }
}
