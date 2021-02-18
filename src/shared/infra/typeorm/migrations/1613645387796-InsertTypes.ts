import { MigrationInterface, QueryRunner } from 'typeorm';

export default class InsertTypes1613645387796 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Acompanhamento Hospitalar','helpedDate','helpDateHospitalPartner');
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Consulta Médica','helpedDate','helpDateHealthCare');
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Consulta Dentária','helpedDate','helpDateDentalCare');
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Preparo de Refeição','helpedDate','helpDateFoodPreparation');
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Entrega de Refeição','helpedDate','helpDateFoodDelivery');
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Doação de Alimento','helpedDate','helpDateFoodDonation');
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Trabalhos Manuais','helpedDate','helpDateGeneralHandwork');
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Limpeza e Manutenção','helpedDate','helpDateCleaningAndMaintaining');
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Construção Civil','helpedDate','helpDateCivilConstruction');
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Mobilização Social','helpedDate','helpDateSocialMobilization');
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Necessidade Financeira','helpedDate','helpDateFinancialNecessity');
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Doações em Geral','helpedDate','helpDateGeneralDonate');
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Intercessão','helpedDate','helpDateIntercession');
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Recreação','helpedDate','helpDateRecreation');
      INSERT INTO public."type" ("name",group_name,id) VALUES ('Outros','helpedDate','helpDateOther');
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
