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
import {
  BodyPatch,
  BodyPatchTarefa,
  BodyPost,
  BodyPostTarefa,
} from './dtos/validacoes';

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
        include: {
          tarefas: true,
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
  async categoriaPatch(@Param('id') id: number, @Body() bodyPatch: BodyPatch) {
    try {
      if (bodyPatch.nome === '' || typeof bodyPatch.nome !== 'string') {
        return {
          message:
            'O nome não pode estar vazio, ou ser diferente de uma string se for alterar',
        };
      }

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

  @Get('tarefas')
  async tarefasGet() {
    return await this.prisma.tarefas.findMany();
  }

  @Get('tarefa/:id')
  async tarefasId(@Param('id') id: number) {
    try {
      const resultado = await this.prisma.tarefas.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          categoria: true,
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

  @Post('tarefa')
  async tarefaPost(@Body() bodyPost: BodyPostTarefa) {
    try {
      if (bodyPost.categoriaId) {
        if (typeof bodyPost.categoriaId !== 'number') {
          return new HttpException(
            'A categoriaId precisa ser um numero.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      return await this.prisma.tarefas.create({
        data: bodyPost,
      });
    } catch (error) {
      return new HttpException(
        'O número do id da categoria informado não existe',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('tarefa/:id')
  async tarefaPatch(
    @Param('id') id: number,
    @Body() bodyPatch: BodyPatchTarefa,
  ) {
    try {
      if (
        bodyPatch.nome === undefined &&
        bodyPatch.isActivate === undefined &&
        bodyPatch.categoriaId === undefined
      ) {
        return new HttpException(
          'Para realizar o update é priciso informar pelo menos um dado a ser atualizado.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (bodyPatch.nome) {
        if (bodyPatch.nome === '' || typeof bodyPatch.nome !== 'string') {
          return new HttpException(
            'O nome não pode estar vazio, ou ser diferente de uma string se for alterar',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      if (bodyPatch.isActivate) {
        if (typeof bodyPatch.isActivate !== 'boolean') {
          return new HttpException(
            'O isActivate precisa ser um booleano se for alterar',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      if (bodyPatch.categoriaId) {
        if (typeof bodyPatch.categoriaId !== 'number') {
          return new HttpException(
            'A categoriaId precisa ser um numero se for alterar',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const patchTarefas = await this.prisma.tarefas.update({
        where: {
          id: Number(id),
        },
        data: bodyPatch,
      });

      return patchTarefas;
    } catch (error) {
      if (error.code === 'P2003') {
        return new HttpException(
          'O número do id da categoria informado não existe',
          HttpStatus.BAD_REQUEST,
        );
      }

      return new HttpException(
        'O número do id informado ma requisição não existe', //P2025
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('tarefa/:id')
  async tarefaDelete(@Param('id') id: number) {
    try {
      return await this.prisma.tarefas.delete({
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
