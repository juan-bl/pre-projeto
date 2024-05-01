import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class BodyPost {
  @IsNotEmpty({
    message: 'É obrigatorio informar o nome da categoria.',
  })
  @IsString({
    message: 'O nome precisa ser uma string.',
  })
  nome: string;
}

export class BodyPatch {
  nome: string;
}

export class BodyPostTarefa {
  @IsNotEmpty({
    message: 'É obrigatorio informar o >nome<.',
  })
  @IsString({
    message: 'O valor de >nome< precisa ser uma string.',
  })
  nome: string;

  @IsNotEmpty({
    message: 'É obrigatorio informar o >isActivate<.',
  })
  @IsBoolean({
    message: 'O valor de >isAcitivate< precisa ser um booleano.',
  })
  isActivate: boolean;

  @IsNotEmpty({
    message: 'É obrigatorio informar o >categoriaId<.',
  })
  @IsInt({
    message: 'O valor de >categoriaId< precisa ser um numero inteiro.',
  })
  categoriaId: number;
}
export class BodyPatchTarefa {
  nome: string;
  isActivate: boolean;
  categoriaId: number;
}
