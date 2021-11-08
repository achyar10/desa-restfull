import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { RtModule } from './app/rt/rt.module';
import { RwModule } from './app/rw/rw.module';
import { EducationModule } from './app/education/education.module';
import { WorkModule } from './app/work/work.module';
import { ReligionModule } from './app/religion/religion.module';
import { MaritalModule } from './app/marital/marital.module';
import { FamilyCardModule } from './app/family/family.module';
import { RelationshipModule } from './app/relationship/relationship.module';
import { CitizenModule } from './app/citizen/citizen.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const { config } = await import('./config/orm.config');
        return config;
      },
    }),
    UserModule,
    AuthModule,
    RwModule,
    RtModule,
    EducationModule,
    WorkModule,
    ReligionModule,
    MaritalModule,
    RelationshipModule,
    FamilyCardModule,
    CitizenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
