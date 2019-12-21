import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './controllers/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [AuthModule ,
  MongooseModule.forRoot('mongodb://roni6ch:abcde12345@ds257648.mlab.com:57648/bi', { useNewUrlParser: true,useUnifiedTopology:true})],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {
 
}
