class utils {
   constructor(){
        this._ = _;
   }

   lerArquivoTexto(arquivo) {
      const leitor = new FileReader();
      let arquivo_lido = '';

      try {
         leitor. addEventListener('load', () => {
            arquivo_lido = leitor.result;
         });
 
         leitor.readAsText(arquivo);
         
     } catch (e) {
         console.log(e);
     }

     return arquivo_lido;
   }

}

const _ =  require('lodash');
const { readFile } = require('fs');

module.exports = new utils();