import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { BodyPost } from './dtos/validacoes';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get('categorias')
  async categoriasGet() {
    return await this.prisma.categoria.findMany();
  }

  @Get('categoria/:id')
  async categoriaId(@Param('id') id: number) {
    try {
      const resultado = await this.prisma.categoria.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!resultado) {
        throw new HttpException('', HttpStatus.BAD_REQUEST);
      }

      return resultado;
    } catch (error) {
      return new HttpException(
        'O número do id informado não existe',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('categoria')
  async categoriaPost(@Body() bodyPost: BodyPost) {
    return await this.prisma.categoria.create({
      data: bodyPost,
    });
  }

  @Patch('categoria/:id')
  async categoriaPatch(@Param('id') id: number, @Body() bodyPatch: BodyPost) {
    try {
      return await this.prisma.categoria.update({
        where: {
          id: Number(id),
        },
        data: bodyPatch,
      });
    } catch (error) {
      return new HttpException(
        'O número do id informado não existe',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('categoria/:id')
  async categoriaDelete(@Param('id') id: number) {
    try {
      return await this.prisma.categoria.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      return new HttpException(
        'O número do id informado não existe',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
