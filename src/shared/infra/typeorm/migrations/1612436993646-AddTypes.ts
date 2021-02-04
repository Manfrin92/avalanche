import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddTypes1612436993646 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO public."type" (id,"name",group_name) VALUES ('helpDateRide','Carona','helpedDate');
    INSERT INTO public."type" (id,"name",group_name) VALUES ('skillDoctor','Médico (a)','skills');
    INSERT INTO public."type" (id,"name",group_name) VALUES ('skillCooker','Cozinheiro (a)','skills');
    INSERT INTO public."type" (id,"name",group_name) VALUES ('skillDriver','Motorista','skills');
    INSERT INTO public."type" (id,"name",group_name) VALUES ('skillNurse','Enfermeiro (a)','skills');
    INSERT INTO public."type" (id,"name",group_name) VALUES ('skillGeneralServices','Serviços Gerais','skills');
    INSERT INTO public."type" (id,"name",group_name) VALUES ('skillHospitalPartner','Acompanhante Hospital','skills');
    INSERT INTO public."type" (id,"name",group_name) VALUES ('skillFinancialHelper','Ajudante Financeiro','skills');
    INSERT INTO public."type" (id,"name",group_name) VALUES ('skillMediator','Mediador (a)','skills');
    INSERT INTO public."type" (id,"name",group_name) VALUES ('skillMason','Pedreiro (a)','skills');
    INSERT INTO public."type" (id,"name",group_name) VALUES ('skillCarpinter','Carpinteiro (a)','skills');
    INSERT INTO public."type" (id,"name",group_name) VALUES ('skillLawyer','Advogado (a)','skills');
    INSERT INTO public."type" (id,"name",group_name) VALUES ('skillLanguage','Idioma','skills');
    INSERT INTO public."type" (id,"name",group_name) VALUES ('skillOther','Outros','skills');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
