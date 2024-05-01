import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class BodyPost {
  @IsNotEmpty({
    message: 'É obrigatorio informar o nome da categoria.',
  })
  @IsString({
    message: 'O nome precisa ser uma string.',
  })
  nome: string;
}

export class BodyPostTarefa {
  @IsString({
    message: 'O nome precisa ser uma string.',
  })
  nome: string;

  @IsNotEmpty({
    message: 'É obrigatorio informar um valor booleano.',
  })
  @IsBoolean({
    message: 'O valor precisa ser um booleano "true" ou "false"',
  })
  isActivate: boolean;

  categoriaId: number;
}
export class BodyPatchTarefa {
  nome: string;
  isActivate: boolean;
  categoriaId: number;
}
