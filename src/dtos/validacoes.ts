import { IsNotEmpty, IsString } from 'class-validator';

export class BodyPost {
  @IsNotEmpty({
    message: 'É obrigatorio informar o nome da categoria.',
  })
  @IsString({
    message: 'O nome precisa ser uma string.',
  })
  nome: string;
}
