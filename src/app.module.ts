import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { RtModule } from './app/rt/rt.module';
import { RwModule } from './app/rw/rw.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
