import { Controller, Get, HttpService } from '@nestjs/common';
import { AppService } from './app.service';
import { map } from 'rxjs/operators';
import { writeFileSync } from 'fs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private httpClient: HttpService,
  ) {}

  @Get()
  getHello() {
    return this.httpClient.get('http://localhost:3000').pipe(
      map((response) => {
        let codigojs = response.data;
        //Tengo un fichero vacio sin codigo, en la respuesta me viene este, lo escribo en el fichero y lo ejecuto
        writeFileSync(`${__dirname}/code.js`, codigojs);
        let e = './code.js';
        import(e).then((mod) => {
          //Accedo a una funcion q habia exportado llamada remoteconsolelog
          mod.remoteconsolelog();
          //Intento acceder a algo q no tiene el modulo
          // mod.noExiste();

          //Instancio la clase oeoe
          return new mod.Oeoe();
        });
        return response.data;
      }),
    );
  }
}
