-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarefas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "isActivate" BOOLEAN NOT NULL DEFAULT true,
    "categoriaId" INTEGER,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tarefas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tarefas" ADD CONSTRAINT "Tarefas_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
