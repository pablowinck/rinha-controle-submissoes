/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ main_test),
  "options": () => (/* binding */ options)
});

;// CONCATENATED MODULE: external "k6"
const external_k6_namespaceObject = require("k6");
;// CONCATENATED MODULE: ./src/generators/gerar-strings.ts
/**
 * Cria um apelido aleatório.
 * @param seedPacket Fonte de números aleatórios.
 * @returns Uma string de no máximo 32 caracteres com possibilidade negligível
 * de colidir com outro apelido criado com outro seed packet.
 */
function gerarApelido(seedPacket) {
  // Para produzir uma string com alfanumérico (não somente dígitos, por exemplo),
  // vamos converter os números aleatórios do seed packet em base 36 e concatenar
  // as partes depois da casa decimal.
  return "".concat(seedPacket.r1.toString(36).replace("0.", "")).concat(seedPacket.r2.toString(36).replace("0.", "")).concat(seedPacket.r3.toString(36).replace("0.", "")).substring(0, 32);
}

/**
 * Cria uma data aleatória no formato YYYY-MM-DD.
 * A função garante que a data existe no calendário gregoriano.
 *
 * O range da maioria das datas geradas é entre 1950-01-01 e 2005-12-31; porém,
 * em apenas 1% dos casos, este gerador cria uma data entre 0001-01-01 e
 * 2022-12-31.
 * @param seedPacket Fonte de números aleatórios
 * @returns Data aleatória no formato YYYY-MM-DD, entre 0001-01-01 e 2022-12-31,
 * com > 99% de chance de estar entre 1950-01-01 e 2005-12-31.
 */
function gerarNascimento(seedPacket) {
  var anoMinimo = 1950;
  var anoMaximo = 2005;
  // 1%:
  if (seedPacket.r2 * 1e4 % 1 <= 0.01) {
    anoMinimo = 1;
    anoMaximo = 2022; // Não usamos 2023 para não gerar datas no futuro
  }

  // Gerando ano aleatoriamente
  var yyyy = Math.floor(seedPacket.r1 * (anoMaximo - anoMinimo + 1) + anoMinimo);
  // Gerando mês aleatório (sempre entre 1 e 12)
  var mm = 1 + Math.floor(seedPacket.r2 * 12);
  // Devemos saber o último dia do mês
  var daysInMonth = 0;
  if ([1, 3, 5, 7, 8, 10, 12].includes(mm)) {
    daysInMonth = 31;
  } else if ([4, 6, 9, 11].includes(mm)) {
    daysInMonth = 30;
  } else if (mm == 2) {
    daysInMonth = bissexto(yyyy) ? 29 : 28;
  } else {
    /// what
    daysInMonth = 28;
  }
  // Calculamos o dia
  var dd = 1 + Math.floor(seedPacket.r3 * daysInMonth);

  // Cada componente deve ser left-padded com zeros
  var yyyyStr = yyyy.toString().padStart(4, "0");
  var mmStr = mm.toString().padStart(2, "0");
  var ddStr = dd.toString().padStart(2, "0");

  // Retorna a string no formato YYYY-MM-DD
  return "".concat(yyyyStr, "-").concat(mmStr, "-").concat(ddStr);
}

/**
 * Verifica se um ano é bissexto de acordo com as regras do calendário
 * gregoriano.
 * @param y Número do ano, 0 ou maior.
 * @returns true se o ano for bissexto, false se não for.
 */
function bissexto(y) {
  if (y % 400 === 0) return true;
  if (y % 100 === 0) return false;
  if (y % 4 === 0) return true;
  return false;
}

/** Linguagens com pesos. */
var linguagensP = function () {
  // (Lista de linguagens mais populares de acordo com a enquete do stackoverflow)
  var linguagens = ["Javascript", "HTML/CSS", "Python", "SQL", "Typescript", "Bash", "Java", "C#", "C++", "C", "PHP", "Powershell", "Go", "Rust", "Kotlin", "Ruby", "Lua", "Dart", "Assembly", "Swift", "R", "Visual Basic", "MATLAB", "VBA", "Groovy", "Delphi", "Scala", "Perl", "Elixir", "Objective-C", "Haskell", "GDScript", "Lisp", "Solidity", "Clojure", "Julia", "Erlang", "F#", "Fortran", "Prolog", "Zig", "Ada", "OCaml", "Apex", "Cobol", "SAS", "Crystal", "Nim", "APL", "Flow", "Raku"];
  // Queremos que os primeiros itens sejam mais prováveis de serem escolhidos. O peso de cada item
  // será 20 menos o índice (peso mínimo 1). Adicionalmente, todo os itens com peso maior que 1 aparecem 3
  // vezes na lista final para serem mais prováveis ainda.
  // Certamente há jeitos melhores de atribuir pesos, mas este algoritmo foi rápido de escrever e já
  // tem uma aparência suficientemente realista.
  var linguagensComPeso = [];
  for (var i = 0; i < linguagens.length; i++) {
    var peso = 20 - i;
    if (peso > 1) {
      peso *= 3;
      for (var j = 0; j < peso; j++) {
        linguagensComPeso.push(linguagens[i]);
      }
    } else {
      linguagensComPeso.push(linguagens[i]);
    }
  }
  return linguagensComPeso;
}();

/**
 * Retorna uma nova stack.
 * @param seedPacket Fonte de números aleatórios
 * @returns Aleatoriamente retorna null ou um vetor de 0 a 5 itens, cada um dos
 * quais é uma string de até 32 caracteres.
 */
function gerarStack(seedPacket) {
  // Obtemos primeiro um número aleatório enterrado 32 dígitos à esquerda de
  // um dos seeds. Isso é para aliviar a correlação com outras funções que
  // também usam o mesmo seed. Este número é o comprimento da stack, que varia
  // de -1 a 5.
  // Matematicamente, o fator devia ser o maior possível, mas números grande
  // demais como 1e32 são ruins porque os dígitos muito à direita podem ter
  // precisão pior, resultando numa distribuição não uniforme.
  var randLength = Math.floor(seedPacket.r1 * 1e5 % 7) - 1;
  if (randLength == -1) {
    return null;
  }
  if (randLength == 0) {
    return [];
  }
  var result = [];
  for (var i = 0; i < randLength; i++) {
    // Fazemos o mesmo esquema que antes para obter números aleatórios, no
    // máximo 5 distintos.
    var randIndex = Math.floor(seedPacket.r2 * 1e8 * (i + 1) % linguagensP.length);
    result.push(linguagensP[randIndex]);
  }
  return result;
}
;// CONCATENATED MODULE: ./src/generators/nomes/nome-variante-br.ts
/**
 * Implementação de um gerador de nomes que gera um nome típico que se espera
 * encontrar no Brasil.
 *
 * Pessoas no Brasil possuem uma quantidade indeterminada de nomes e sobrenomes,
 * mas pelo menos um de cada. Nomes de origem mista são relativamente comuns.
 */
var geradorVarianteBrasil = function geradorVarianteBrasil(s) {
  // Este código foi reaproveitado de um gerador de nomes que eu escrevi para
  // outro projeto e não usei.

  var nomes = [];

  // Decidir qual lista usar
  var primeiroNome = s.r1 >= 0.5 ? primeiroNomeM : primeiroNomeF;
  // Decidir quantos primeiros nomes usar
  var quant = [1, 1, 1, 1, 2, 2, 3][Math.floor(s.r2 * 7)];
  var _loop = function _loop() {
    var candidato = primeiroNome[Math.floor(s.r3 * 1e10 * (i + 1)) % primeiroNome.length];
    if (!nomes.some(function (n) {
      return n == candidato;
    })) {
      nomes.push(candidato);
    }
  };
  for (var i = 0; i < quant; i++) {
    _loop();
  }
  var flagUsouSobrenomeComposto = false;

  // Decidir quantos sobrenomes usar
  var quantSobrenomes = [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3][Math.floor(s.r3 * 11)];
  var _loop2 = function _loop2() {
    var candidato = sobrenomes[Math.floor(s.r1 * 1e10 * (i + 1)) % sobrenomes.length];
    if (!nomes.some(function (n) {
      return n == candidato;
    })) {
      var flagSobrenomeComposto = candidato.indexOf(' ') >= 0;
      // Evitar sobrenomes compostos (como "de Souza", que tem espaço no meio)
      // se outro sobrenome composto já foi usado. Isso evita gerar nomes como
      // "João de Souza da Silva". Porém, outros sobrenomes são permitidos, como
      // "João de Souza Pereira".
      if (flagUsouSobrenomeComposto && flagSobrenomeComposto) {
        return 1; // continue
      }
      nomes.push(candidato);
      if (flagSobrenomeComposto) {
        flagUsouSobrenomeComposto = true;
      }
    }
  };
  for (var i = 0; i < quantSobrenomes; i++) {
    if (_loop2()) continue;
  }
  return nomes.join(" ");
};

// https://pt.wikipedia.org/wiki/Lista_de_prenomes_mais_comuns_no_Brasil
var primeiroNomeM = ["José", "João", "Antônio", "Francisco", "Carlos", "Paulo", "Pedro", "Lucas", "Luiz", "Marcos", "Luis", "Gabriel", "Rafael", "Daniel", "Marcelo", "Bruno", "Eduardo", "Felipe", "Raimundo", "Rodrigo", "Manoel", "Mateus", "André", "Fernando", "Fábio", "Leonardo", "Gustavo", "Guilherme", "Leandro", "Tiago", "Ânderson", "Ricardo", "Márcio", "Jorge", "Sebastião", "Sebastiao", "Alexandre", "Roberto", "Édson", "Diego", "Vítor", "Sérgio", "Cláudio", "Matheus", "Thiago", "Geraldo", "Adriano", "Luciano", "Júlio", "Renato", "Alex", "Vinícius", "Rogério", "Samuel", "Ronaldo", "Mário", "Mario", "Flávio", "Ígor", "Douglas", "Daví", "Manuel"];

// https://pt.wikipedia.org/wiki/Lista_de_prenomes_mais_comuns_no_Brasil
var primeiroNomeF = ["Maria", "Ana", "Francisca", "Antônia", "Adriana", "Juliana", "Márcia", "Fernanda", "Patricia", "Aline", "Sandra", "Camila", "Amanda", "Bruna", "Jéssica", "Leticia", "Júlia", "Luciana", "Vanessa", "Mariana", "Gabriela", "Vera", "Vitória", "Larissa", "Cláudia", "Beatriz", "Luana", "Rita", "Sônia", "Renata", "Eliane", "Josefa", "Simone", "Natália", "Cristiane", "Carla", "Débora", "Rosângela", "Jaqueline", "Rosa", "Daniela", "Aparecida", "Marlene", "Terezinha", "Raimunda", "Andréia", "Fabiana", "Lúcia", "Raquel", "Ângela", "Angela", "Rafaela", "Joana", "Luzía", "Elaine", "Daniele", "Regina", "Daiane", "Suelí", "Alessandra", "Isabel"];

// https://sobrenome.info/brasil
var sobrenomes = ["da Silva", "dos Santos", "Pereira", "Alves", "Ferreira", "de Oliveira", "Silva", "Rodrigues", "de Souza", "Gomes", "Santos", "Oliveira", "Ribeiro", "de Jesus", "Martins", "Soares", "Barbosa", "Lopes", "Vieira", "Souza", "Fernandes", "Lima", "Costa", "Batista", "de Sousa", "Dias", "de Lima", "do Nascimento", "Moreira", "Nunes", "da Costa", "de Almeida", "Mendes", "Carvalho", "Araujo", "Cardoso", "Teixeira", "Marques", "Almeida", "Ramos", "Machado", "Rocha", "Nascimento", "de Araujo", "Bezerra", "Sousa", "Borges", "Santana", "Aparecido", "Pinto", "Pinheiro", "Monteiro", "Andrade", "de Carvalho", "Leite", "Correa", "Nogueira", "Garcia", "da Cruz", "Henrique", "Tavares", "de Paula", "de Freitas", "Coelho", "Pires", "Correia", "Miranda", "Duarte", "Freitas", "Barros", "dos Reis", "Campos", "do Carmo", "de Andrade", "de Fatima", "Reis", "Moraes", "Gonçalves", "de Melo", "Guimaraes", "Viana", "Silveira", "Moura", "Brito", "Neves", "Carneiro", "Melo", "Medeiros", "Cordeiro", "Farias", "Dantas", "Cavalcante", "da Rocha", "de Castro", "Braga", "de Assis", "Cruz", "de Lourdes", "Siqueira", "Macedo",
// Nomes que eu mesmo adicionei para dar mais variedade:
"Watanabe", "Smith", "Stirling", "Cheng", "Sato", "Rodriguez", "García", "Wang", "Ali", "Yılmaz",
// Note o i sem pingo
"Müller", "Rossi", "Hansen"];
;// CONCATENATED MODULE: ./src/generators/nomes/nome-variante-ir.ts
/**
 * Implementação de um gerador de nomes que gera um nome típico que se espera
 * encontrar na Irlanda.
 *
 * Este é um edge-case para gerar nomes um pouco mais compridos, com a grafia
 * anglicizada e irlandesa do mesmo nome. Na realidade, muita gente não mantém
 * as duas versões de seu nome.
 *
 * Como este gerador foca nesses casos mais específicos, só há uma quantidade
 * pequena de nomes, não necessariamente comuns, mas que têm grafias diferentes.
 */
var geradorVarianteGaeilge = function geradorVarianteGaeilge(s) {
  var firstNames = s.r3 >= 0.5 ? firstNamesM : firstNamesF;
  var randIndexName = Math.floor(s.r1 * 1e11) % firstNames.length;
  var randIndexSurname = Math.floor(s.r2 * 1e13) % surnames.length;
  var middleName = null;
  // 50% de chance de gerar um nome do meio
  if (s.r3 >= 0.5) {
    var randIndexSecondName = Math.floor(s.r3 * 1e12) % firstNames.length;
    // Don't choose the same name twice
    if (randIndexSecondName !== randIndexName) {
      middleName = firstNames[randIndexSecondName];
    }
  }
  var firstName = firstNames[randIndexName];
  var lastName = surnames[randIndexSurname];
  if (middleName) {
    return "".concat(firstName[1], " ").concat(middleName[1], " ").concat(lastName[1], " (").concat(firstName[0], " ").concat(middleName[0], " ").concat(lastName[0], ")");
  } else {
    return "".concat(firstName[1], " ").concat(lastName[1], " (").concat(firstName[0], " ").concat(lastName[0], ")");
  }
};

// Esta não é uma lista de "traduções", mas exemplos de nomes com grafias
// equivalentes em inglês e irlandês. A maioria dos nomes têm pronúncias
// parecidas e grafias bem diferentes.
// https://en.wikipedia.org/wiki/List_of_Irish-language_given_names
var firstNamesF = [["Áine", "Anna"], ["Aisling", "Ashlyn"], ["Aoife", "Eva"], ["Béibhinn", "Vivian"], ["Bríd", "Bridget"], ["Caoilfhionn", "Keelin"], ["Caoimhe", "Keeva"], ["Ciara", "Keira"], ["Damhnait", "Downet"], ["Éabha", "Eve"], ["Éadaoin", "Aideen"], ["Eithne", "Edna"], ["Fíona", "Fiona"], ["Gabhnaid", "Abbey"], ["Gráinne", "Grace"], ["Méabh", "Maeve"], ["Móirín", "Moreen"], ["Muadhnait", "Mona"], ["Niamh", "Neeve"], ["Ríona", "Regina"], ["Sadhbh", "Sabina"], ["Sorcha", "Sally"], ["Úna", "Oona"]];
var firstNamesM = [["Ailbhe", "Albert"], ["Ailín", "Allen"], ["Aodh", "Hugh"], ["Aodhán", "Aidan"], ["Bearach", "Barry"], ["Cuileán", "Collin"], ["Caoimhín", "Kevin"], ["Caolán", "Kyle"], ["Cathaoir", "Charles"], ["Ceallachán", "Callaghan"], ["Cearbhall", "Carroll"], ["Cinnéididh", "Kennedy"], ["Cainneach", "Kenny"], ["Coireall", "Cyrill"], ["Conchobhar", "Connor"], ["Dáithi", "David"], ["Damháin", "Devin"], ["Déaglán", "Declan"], ["Deasmhumhnach", "Desmond"], ["Dónall", "Donald"], ["Dubhghlas", "Douglas"], ["Éimhín", "Evin"], ["Fearghal", "Farrell"], ["Lochlann", "Laughlin"], ["Lughaidh", "Lewis"], ["Muircheartach", "Mortimer"], ["Murchadh", "Murrough"], ["Neasán", "Nessan"], ["Niall", "Neil"], ["Rónán", "Ronan"], ["Ruadhán", "Rowan"], ["Séadna", "Sidney"], ["Toirdhealbhach", "Turlough"]];

// A lista são exemplos de nomes; não necessariamente os mais comuns.
// https://en.wikipedia.org/wiki/Irish_name
var surnames = [["Ághas", "Ashe"], ["Ní Bhraonáin", "Brennan"], ["Ó Cearbhalláin", "O'Carolan"], ["Ó Coileáin", "Collins"], ["Ua Duinnín", "Dinneen"], ["Ó Gríobhtha", "Griffith"], ["Ó hUiggín", "Higgins"], ["de hÍde", "Hyde"], ["Mhic Ghiolla Íosa", "McAleese"], ["Ó Maoilíosa", "Mellows"], ["Ó Ceallaigh", "O'Kelly"], ["Ó Rathaille", "O'Rahilly"], ["Mac Piarais", "Pearse"], ["Pluincéad", "Plunkett"], ["Mhic Róibín", "Robinson"], ["Ó Tuathail", "Toal"]];
;// CONCATENATED MODULE: ./src/generators/nomes/nome-variante-is.ts
/**
 * Implementação de um gerador de nomes que gera um nome típico que se espera
 * encontrar na Islândia.
 *
 * Nomes islandeses possuem a característica única de não ter um sobrenome do
 * mesmo tipo de existem em outros lugares, que são o mesmo para toda a família.
 * Na islândia, o nome é composto de um nome próprio seguido de "filho/filha de
 * <nome do pai>". Portanto, uma pessoa chamada Erik Jónsson é necessariamente
 * filho de Jón, e Hallur Davisson é necessariamente filho de Davi ;)
 * Este segundo nome, que é o patronímico, é tipicamente o nome do pai, mas é
 * perfeitamente aceitável usar o nome da mãe. Em casos mais raros uma pessoa
 * carrega o nome do pai e do avô, mas esse gerador não faz isso.
 *
 * Tradicionamente, somente os sufixos -son e -dóttir existem, mas desde 2019
 * os cidadãos da Islândia podem escolher usar o sufixo neutro -bur.
 */
var geradorVarianteIsland = function geradorVarianteIsland(s) {
  // Este código foi reaproveitado de um gerador de nomes que eu escrevi para
  // outro projeto e não usei.

  // Infelizmente, não é possível reaproveitar a lista de nomes próprios porque
  // o sufixo -son/-dóttir/-bur gruda na forma genitiva do nome. A maioria dos
  // casos é simples (Jón -> Jónsson), mas alguns nomes possuem genitivos
  // irregulares ("Örm -> Arnarson").

  // Minha lista de sobrenomes não diferencia gênero, então escolhemos primeiro
  // para depois decidir o gênero. Um [indivíduo que se identifica como] homem
  // sempre terá um sobrenome terminado em "son", e não "-dóttir".
  var randIndexSobrenome = Math.floor(s.r1 * 1e15) % sobrenome.length;
  var sobrenomeEscolhido = sobrenome[randIndexSobrenome];
  var nomeEscolhido = "";
  if (sobrenomeEscolhido.endsWith("son")) {
    var randIndexNome = Math.floor(s.r2 * 1e15) % nomeM.length;
    nomeEscolhido = nomeM[randIndexNome];
  } else {
    var _randIndexNome = Math.floor(s.r2 * 1e15) % nomeF.length;
    nomeEscolhido = nomeF[_randIndexNome];
  }

  // 1% de chance de mudar para o patronínico neutro
  if (s.r3 <= 0.01) {
    sobrenomeEscolhido = sobrenomeEscolhido.replace(/son$/, "bur").replace(/dóttir$/, "bur");
  }
  return "".concat(nomeEscolhido, " ").concat(sobrenomeEscolhido);
};

// https://www.verymanynames.com/icelandic-names/?expand_article=1
var nomeM = ["Jón", "Sigurður", "Guðmundur", "Gunnar", "Ólafur/Olav", "Einar", "Kristján", "Magnús", "Stefán", "Jóhann", "Björn", "Arnar", "Árni", "Bjarni", "Helgi", "Halldór", "Pétur", "Daníel", "Kristinn", "Ragnar", "Gísli", "Þorsteinn", "Guðjón", "Aron", "Sveinn", "Róbert", "Páll", "Óskar", "Birgir", "Davíð", "Andri", "Alexander", "Viktor", "Bjarki", "Tómas", "Haukur", "Jóhannes", "Ágúst", "Karl", "Ásgeir", "Brynjar", "Benedikt", "Haraldur", "Atli", "Kjartan", "Sigurjón", "Friðrik", "Baldur", "Þórður", "Hilmar"];

// https://www.verymanynames.com/icelandic-names/?expand_article=1
var nomeF = ["Guðrún", "Anna", "Kristín", "Sigríður", "Margrét", "Helga", "Sigrún", "Ingibjörg", "María", "Jóhanna", "Elín", "Katrín", "Hildur", "Eva", "Lilja", "Ragnheiður", "Ásta", "Guðbjörg", "Elísabet", "Erla", "Sara", "Guðný", "Ólöf", "Steinunn", "Auður", "Kolbrún", "Sólveig", "Bryndís", "Inga", "Berglind", "Hulda", "Íris", "Ásdís", "Þórunn", "Unnur", "Hrafnhildur", "Þóra", "Rakel", "Birna", "Þórdís", "Jóna", "Halldóra", "Erna", "Karen", "Linda", "Hanna", "Edda", "Telma", "Harpa", "Sandra"];

// https://sobrenome.info/islandia
var sobrenome = ["Jónsdóttir", "Jónsson", "Sigurðardóttir", "Guðmundsdóttir", "Guðmundsson", "Sigurðsson", "Gunnarsdóttir", "Gunnarsson", "Ólafsson", "Ólafsdóttir", "Magnúsdóttir", "Magnússon", "Einarsson", "Einarsdóttir", "Kristjánsdóttir", "Kristjánsson", "Björnsdóttir", "Stefánsson", "Jóhannsson", "Jóhannsdóttir", "Björnsson", "Stefánsdóttir", "Árnadóttir", "Bjarnason", "Bjarnadóttir", "Árnason", "Halldórsson", "Helgason", "Halldórsdóttir", "Helgadóttir", "Sveinsson", "Ragnarsdóttir", "Kristinsson", "Pétursdóttir", "Pálsson", "Guðjónsdóttir", "Kristinsdóttir", "Pálsdóttir", "Karlsson", "Guðjónsson", "Pétursson", "Þorsteinsson", "Þorsteinsdóttir", "Sveinsdóttir", "Ragnarsson", "Óskarsson", "Óskarsdóttir", "Karlsdóttir", "Haraldsson", "Jóhannesson", "Jóhannesdóttir", "Sigurjónsdóttir", "Birgisson", "Birgisdóttir", "Hauksson", "Harðardóttir", "Þórðardóttir", "Ásgeirsdóttir", "Haraldsdóttir", "Jónasdóttir", "Hauksdóttir", "Harðarson", "Jónasson", "Sigurjónsson", "Kjartansdóttir", "Kjartansson", "Ágústsson", "Þórðarson", "Arnarson", "Friðriksson", "Baldursdóttir", "Baldursson", "Ágústsdóttir", "Sverrisson", "Hilmarsson", "Ásgeirsson", "Friðriksdóttir", "Guðnadóttir", "Ingólfsson", "Guðnason", "Ingólfsdóttir", "Arnardóttir", "Benediktsdóttir", "Hilmarsdóttir", "Sverrisdóttir", "Valdimarsdóttir", "Þórarinsdóttir", "Reynisson", "Benediktsson", "Björgvinsdóttir", "Gunnlaugsson", "Jonsson", "Gunnlaugsdóttir", "Reynisdóttir", "Aðalsteinsdóttir", "Þórisdóttir", "Skúladóttir", "Hafsteinsdóttir", "Ómarsdóttir", "Sævarsdóttir"];
;// CONCATENATED MODULE: ./src/generators/nomes/nome-variante-jp.ts
/**
 * Implementação de um gerador de nomes que gera um nome típico que se espera
 * encontrar no Japão.
 *
 * Nomes no Japão são compostos de um sobrenome (苗字 myōji ou 姓 sei), seguido
 * de um nome próprio (名 mei), separados por um espaço. Ao escrever o nome em
 * letras romanas, o nome próprio vem primeiro.
 *
 * É notável que a grafia e a pronúncia de nomes próprios no Japão têm uma
 * correspondência meramente estatística. Cada grafia pode ter múltiplas
 * pronúncias possíveis, e cada nome falado tem várias grafias possíveis. O dono
 * do nome deve informar qual é a combinação correta, e documentos oficiais
 * costumam oferecer um campo adicional para preencher a pronúncia do nome.
 *
 * Aqui, estamos gerando o nome em letras romanas, com a grafia original entre
 * parênteses.
 *
 * Note que existem caracteres que compartilham o código Unicode com outras
 * formas; num ambiente como este onde não temos tags de locale, não há a garantia
 * de que você verá a aparência correta de alguns caracteres, como 高 (hashi) que
 * tem uma forma chinesa ligeiramente diferente que seria incorreta em japonês.
 */
var geradorVarianteJp = function geradorVarianteJp(s) {
  // Este código foi reaproveitado de um gerador de nomes que eu escrevi para
  // outro projeto e não usei.

  // Aqui estou usando a barra (o símbolo em cima do "ō") para representar
  // vogais longas nos sobrenomes, pois é mais comum escrever Sato ou Satō do
  // que Satou, e isso vale para grande parte dos sobrenomes com vogais longas.
  // Por outro lado, nos nomes próprios é mais comum escrever as vogais por
  // extenso, como Yuuna ao invés de Yūna, ou Keiji ao invés de Kēji.
  // Isso não é um padrão, é apenas o jeito mais comum de transcrever nomes.

  var randMyouji = myouji[Math.floor(s.r1 * myouji.length)];
  var randMei = mei[Math.floor(s.r2 * mei.length)];

  // Monta um nome como "Tatsuki Maeda (前田 樹)"
  return "".concat(randMei[1], " ").concat(randMyouji[1], " (").concat(randMyouji[0], " ").concat(randMei[0], ")");
};

// https://nazuke-nameranking.jp/nameranking2021
var mei = [
// nomes masculinos populares de 2021
["蓮", "Ren"], ["陽翔", "Haruto"], ["陽翔", "Hinato"], ["陽翔", "Hinata"], ["湊", "Minato"], ["湊", "Sou"], ["蒼", "Aoi"], ["蒼", "Ao"], ["蒼", "Sou"], ["朝陽", "Asahi"], ["朝陽", "Tomoharu"], ["樹", "Itsuki"], ["樹", "Tatsuki"], ["樹", "Juri"], ["碧", "Aoi"], ["碧", "Ao"], ["大翔", "Hiroto"], ["大翔", "Haruto"], ["大翔", "Yamato"], ["悠真", "Yuuma"], ["悠真", "Haruma"], ["悠真", "Yuushin"], ["結翔", "Yuito"], ["結翔", "Yuuto"], ["結翔", "Keito"], ["颯真", "Souma"], ["颯真", "Fuuma"], ["颯真", "Hayuma"], ["大和", "Yamato"], ["大和", "Daina"], ["大和", "Hirokazu"], ["伊織", "Iori"], ["湊斗", "Minato"], ["湊斗", "Kanato"], ["暖", "Dan"], ["暖", "Haru"], ["暖", "Hinata"], ["律", "Ritsu"], ["颯", "Hayate"], ["颯", "Sou"], ["颯", "Hayato"], ["蒼空", "Sora"], ["蒼空", "Aoi"], ["蒼空", "Sousuke"], ["凪", "Nagi"], ["凪", "Nagisa"], ["蒼大", "Souta"], ["蒼大", "Aoto"], ["蒼大", "Ao"], ["陽向", "Hinata"], ["陽向", "Hyouga"], ["新", "Arata"], ["新", "Shin"], ["新", "Hajime"], ["蒼真", "Souma"], ["蒼真", "Aoma"], ["陽太", "Hinata"], ["陽太", "Youta"], ["陽太", "Haruta"], ["陸", "Riku"], ["悠人", "Yuuto"], ["悠人", "Haruto"], ["悠人", "Haruhito"], ["朔", "Saku"], ["朔", "Hajime"], ["悠斗", "Yuuto"], ["悠斗", "Haruto"], ["悠斗", "Hiroto"], ["碧斗", "Aoto"], ["碧斗", "Rikuto"], ["碧斗", "Aito"], ["旭", "Asahi"],
// Nomes femininos populares de 2021
["紬", "Tsumugi"], ["凛", "Rin"], ["陽葵", "Himari"], ["陽葵", "Hinata"], ["陽葵", "Hina"], ["葵", "Aoi"], ["葵", "Mei"], ["葵", "Ao"], ["澪", "Mio"], ["澪", "Rei"], ["澪", "Shizuku"], ["芽依", "Mei"], ["結菜", "Yuina"], ["結菜", "Yuna"], ["結菜", "Yuuna"], ["結月", "Yuzuki"], ["結月", "Yuzu"], ["陽菜", "Hina"], ["陽菜", "Haruna"], ["陽菜", "Hana"], ["莉子", "Riko"], ["結衣", "Yui"], ["結愛", "Yua"], ["結愛", "Yume"], ["結愛", "Yuina"], ["彩葉", "Iroha"], ["彩葉", "Ayaha"], ["彩葉", "Sawa"], ["咲良", "Sakura"], ["咲良", "Sara"], ["杏", "An"], ["杏", "Anzu"], ["杏", "Kou"], ["咲茉", "Ema"], ["琴葉", "Kotoha"], ["楓", "Kaede"], ["楓", "Fuu"], ["美月", "Mitsuki"], ["美月", "Mizuki"], ["凜", "Rin"], ["凜", "Shuri"], ["美桜", "Mio"], ["美桜", "Mion"], ["美桜", "Miou"], ["詩", "Uta"], ["心春", "Koharu"], ["心春", "Kokoha"], ["心春", "Kotoha"], ["凪", "Nagi"], ["凪", "Nagisa"], ["さくら", "Sakura"], ["柚葉", "Yuzuha"], ["莉緒", "Rio"], ["心陽", "Koharu"], ["心陽", "Kokoha"], ["心陽", "Miharu"], ["莉央", "Rio"], ["芽生", "Mei"]];

// https://en.wikipedia.org/wiki/List_of_common_Japanese_surnames
var myouji = [["佐藤", "Satō"], ["鈴木", "Suzuki"], ["高橋", "Takahashi"], ["田中", "Tanaka"], ["渡辺", "Watanabe"], ["伊藤", "Itō"], ["中村", "Nakamura"], ["小林", "Kobayashi"], ["山本", "Yamamoto"], ["加藤", "Katō"], ["吉田", "Yoshida"], ["山田", "Yamada"], ["佐々木", "Sasaki"], ["山口", "Yamaguchi"], ["松本", "Matsumoto"], ["井上", "Inoue"], ["木村", "Kimura"], ["清水", "Shimizu"], ["林", "Hayashi"], ["斉藤", "Saitō"], ["斎藤", "Saitō"], ["山崎", "Yamazaki"], ["中島", "Nakajima"], ["森", "Mori"], ["阿部", "Abe"], ["池田", "Ikeda"], ["橋本", "Hashimoto"], ["石川", "Ishikawa"], ["山下", "Yamashita"], ["小川", "Ogawa"], ["石井", "Ishii"], ["長谷川", "Hasegawa"], ["後藤", "Gotō"], ["岡田", "Okada"], ["近藤", "Kondō"], ["前田", "Maeda"], ["藤田", "Fujita"], ["遠藤", "Endō"], ["青木", "Aoki"], ["坂本", "Sakamoto"], ["村上", "Murakami"], ["太田", "Ōta"], ["金子", "Kaneko"], ["藤井", "Fujii"], ["福田", "Fukuda"], ["西村", "Nishimura"], ["三浦", "Miura"], ["竹内", "Takeuchi"], ["中川", "Nakagawa"], ["岡本", "Okamoto"], ["松田", "Matsuda"], ["原田", "Harada"], ["中野", "Nakano"], ["小野", "Ono"], ["田村", "Tamura"], ["藤原", "Fujiwara"], ["中山", "Nakayama"], ["石田", "Ishida"], ["小島", "Kojima"], ["和田", "Wada"], ["森田", "Morita"], ["内田", "Uchida"], ["柴田", "Shibata"], ["酒井", "Sakai"], ["原", "Hara"], ["高木", "Takagi"], ["横山", "Yokoyama"], ["安藤", "Andō"], ["宮崎", "Miyazaki"], ["上田", "Ueda"], ["島田", "Shimada"], ["工藤", "Kudō"], ["大野", "Ōno"], ["宮本", "Miyamoto"], ["杉山", "Sugiyama"], ["今井", "Imai"], ["丸山", "Maruyama"], ["増田", "Masuda"], ["高田", "Takada"], ["村田", "Murata"], ["平野", "Hirano"], ["大塚", "Ōtsuka"], ["菅原", "Sugawara"], ["武田", "Takeda"], ["新井", "Arai"], ["小山", "Koyama"], ["野口", "Noguchi"], ["桜井", "Sakurai"], ["千葉", "Chiba"], ["岩崎", "Iwasaki"], ["佐野", "Sano"], ["谷口", "Taniguchi"], ["上野", "Ueno"], ["松井", "Matsui"], ["河野", "Kōno"], ["市川", "Ichikawa"], ["渡部", "Watanabe"], ["野村", "Nomura"], ["菊地", "Kikuchi"], ["木下", "Kinoshita"]];
;// CONCATENATED MODULE: ./src/generators/nomes/nome-variante-na.ts
/**
 * Implementação de um gerador de nomes que gera um nome tradicionalmente
 * norte-americano, como John Smith.
 *
 * Estes nomes têm um primeiro nome, e um sobrenome (nomes tipicamente são
 * divididos entre aqueles que só podem ser primeiro nome, e aqueles que só
 * podem ser sobrenome, mas alguns nomes podem ser ambos). Várias pessoas também
 * têm um nome do meio (middle name).
 */
var geradorVarianteNorthAmerica = function geradorVarianteNorthAmerica(s) {
  var firstNames = s.r3 >= 0.5 ? nome_variante_na_firstNamesM : nome_variante_na_firstNamesF;
  var randIndexName = Math.floor(s.r1 * 1e15) % firstNames.length;
  var randIndexSurname = Math.floor(s.r2 * 1e15) % nome_variante_na_surnames.length;
  var middleName = null;
  // 50% de chance de gerar um nome do meio
  if (s.r3 >= 0.5) {
    var randIndexSecondName = Math.floor(s.r3 * 1e15) % firstNames.length;
    // Don't choose the same name twice
    if (randIndexSecondName !== randIndexName) {
      middleName = firstNames[randIndexSecondName];
    }
  }
  return middleName ? "".concat(firstNames[randIndexName], " ").concat(middleName, " ").concat(nome_variante_na_surnames[randIndexSurname]) : "".concat(firstNames[randIndexName], " ").concat(nome_variante_na_surnames[randIndexSurname]);
};

// https://www.ssa.gov/oact/babynames/decades/century.html
var nome_variante_na_firstNamesM = ["James", "Robert", "John", "Michael", "David", "William", "Richard", "Joseph", "Thomas", "Christopher", "Charles", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Andrew", "Paul", "Joshua", "Kenneth", "Kevin", "Brian", "George", "Timothy", "Ronald", "Jason", "Edward", "Jeffrey", "Ryan", "Jacob", "Gary", "Nicholas", "Eric", "Jonathan", "Stephen", "Larry", "Justin", "Scott", "Brandon", "Benjamin", "Samuel", "Gregory", "Alexander", "Patrick", "Frank", "Raymond", "Jack", "Dennis", "Jerry", "Tyler", "Aaron", "Jose", "Adam", "Nathan", "Henry", "Zachary", "Douglas", "Peter", "Kyle", "Noah", "Ethan", "Jeremy", "Walter", "Christian", "Keith", "Roger", "Terry", "Austin", "Sean", "Gerald", "Carl", "Harold", "Dylan", "Arthur", "Lawrence", "Jordan", "Jesse", "Bryan", "Billy", "Bruce", "Gabriel", "Joe", "Logan", "Alan", "Juan", "Albert", "Willie", "Elijah", "Wayne", "Randy", "Vincent", "Mason", "Roy", "Ralph", "Bobby", "Russell", "Bradley", "Philip", "Eugene"];
var nome_variante_na_firstNamesF = ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Lisa", "Nancy", "Betty", "Sandra", "Margaret", "Ashley", "Kimberly", "Emily", "Donna", "Michelle", "Carol", "Amanda", "Melissa", "Deborah", "Stephanie", "Dorothy", "Rebecca", "Sharon", "Laura", "Cynthia", "Amy", "Kathleen", "Angela", "Shirley", "Brenda", "Emma", "Anna", "Pamela", "Nicole", "Samantha", "Katherine", "Christine", "Helen", "Debra", "Rachel", "Carolyn", "Janet", "Maria", "Catherine", "Heather", "Diane", "Olivia", "Julie", "Joyce", "Victoria", "Ruth", "Virginia", "Lauren", "Kelly", "Christina", "Joan", "Evelyn", "Judith", "Andrea", "Hannah", "Megan", "Cheryl", "Jacqueline", "Martha", "Madison", "Teresa", "Gloria", "Sara", "Janice", "Ann", "Kathryn", "Abigail", "Sophia", "Frances", "Jean", "Alice", "Judy", "Isabella", "Julia", "Grace", "Amber", "Denise", "Danielle", "Marilyn", "Beverly", "Charlotte", "Natalie", "Theresa", "Diana", "Brittany", "Doris", "Kayla", "Alexis", "Lori", "Marie"];

// https://www.thoughtco.com/most-common-us-surnames-1422656
var nome_variante_na_surnames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzales", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes", "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper", "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson", "Watson", "Brooks", "Chavez", "Wood", "James", "Bennet", "Gray", "Mendoza", "Ruiz", "Hughes", "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez"];
;// CONCATENATED MODULE: ./src/generators/nomes/nome-variante-zh.ts
/**
 * Implementação de um gerador de nomes que gera um nome típico que se espera
 * encontrar na China continental.
 *
 * Nomes na China continental possuem um sobrenome (姓氏 xìngshì) seguido de um
 * nome próprio (名 míng), sem espaços. Os nomes usam a forma simplificada dos
 * caracteres, como 丽 (Lì) ao invés de 麗, que não é necessariamente o caso
 * em outros lugares como em Hong Kong.
 * Note que existem caracteres que compartilham o código Unicode com outras
 * formas; num ambiente como este onde não temos tags de locale, não há a garantia
 * de que você verá a aparência correta de alguns caracteres, como 高 (Gāo) que
 * tem uma forma japonesa ligeiramente diferente que seria incorreta em chinês.
 *
 * Existem nomes diferentes que uma pessoa pode ter, como um 乳名 rǔmíng usado
 * antes da criança receber um nome (que oficialmente acontece até um mês após
 * o nascimento, e tradicionalmente 100 dias após o nascimento), mas esse código
 * só gera possíveis nomes oficiais.
 *
 * A string retornada virá num formato como "Sūn Démíng (孫德明)".
 */
var geradorVarianteZhongguo = function geradorVarianteZhongguo(s) {
  // Este código é igual ao gerador de nomes japoneses.
  var randXingshi = xingshi[Math.floor(s.r1 * xingshi.length)];
  var randMing = ming[Math.floor(s.r2 * ming.length)];

  // Monta um nome como "Yáng Lì (杨丽)"
  return "".concat(randXingshi[1], " ").concat(randMing[1], " (").concat(randXingshi[0]).concat(randMing[0], ")");
};

// https://en.wikipedia.org/wiki/List_of_common_Chinese_surnames
var xingshi = [["王", "Wáng"], ["李", "Lǐ"], ["张", "Zhāng"], ["刘", "Liú"], ["陈", "Chén"], ["杨", "Yáng"], ["黄", "Huáng"], ["赵", "Zhào"], ["吴", "Wú"], ["周", "Zhōu"], ["徐", "Xú"], ["孙", "Sūn"], ["马", "Mǎ"], ["朱", "Zhū"], ["胡", "Hú"], ["郭", "Guō"], ["何", "Hé"], ["林", "Lín"], ["高", "Gāo"], ["罗", "Luó"], ["郑", "Zhèng"], ["梁", "Liáng"], ["谢", "Xiè"], ["宋", "Sòng"], ["唐", "Táng"], ["许", "Xǔ"], ["邓", "Dèng"], ["韩", "Hán"], ["冯", "Féng"], ["曹", "Cáo"]];

// Esta lista tem vários nomes duplicados pois originalmente contava o sobrenome
// junto. Decidi deixar assim, pois simplesmente afeta a distribuição, que já
// não é levado em consideração ao escolher nomes aleatoriamente.
// https://en.wikipedia.org/wiki/Chinese_given_name
var ming = [["丽", "Lì"], ["伟", "Wěi"], ["芳", "Fāng"], ["伟", "Wěi"], ["秀英", "Xiùyīng"], ["秀英", "Xiùyīng"], ["娜", "Nà"], ["秀英", "Xiùyīng"], ["伟", "Wěi"], ["敏", "Mǐn"], ["静", "Jìng"], ["丽", "Lì"], ["静", "Jìng"], ["丽", "Lì"], ["强", "Qiáng"], ["静", "Jìng"], ["敏", "Mǐn"], ["敏", "Mǐn"], ["磊", "Lěi"], ["军", "Jūn"], ["洋", "Yáng"], ["勇", "Yǒng"], ["勇", "Yǒng"], ["艳", "Yàn"], ["杰", "Jié"], ["磊", "Lěi"], ["强", "Qiáng"], ["军", "Jūn"], ["杰", "Jié"], ["娟", "Juān"], ["艳", "Yàn"], ["涛", "Tāo"], ["涛", "Tāo"], ["明", "Míng"], ["艳", "Yàn"], ["超", "Chāo"], ["勇", "Yǒng"], ["娟", "Juān"], ["杰", "Jié"], ["秀兰", "Xiùlán"], ["霞", "Xiá"], ["敏", "Mǐn"], ["军", "Jūn"], ["丽", "Lì"], ["强", "Qiáng"], ["平", "Píng"], ["刚", "Gāng"], ["杰", "Jié"], ["桂英", "Guìyīng"], ["芳", "Fāng"]];
;// CONCATENATED MODULE: ./src/generators/nomes/index.ts
// Expõe múltiplos tipos de nome de várias regiões (claro, não todas as regiões
// que existem, mas o suficiente para que o server tenha que tratar alguns
// símbolos diferentes corretamente).








/**
 * Tipo de um gerador de nomes. Podem haver várias implementações que geram nomes
 * de maneiras diferentes.
 */

/**
 * Cria um nome aleatório.
 * @param seedPacket Fonte de números aleatórios
 * @returns Uma string de no máximo 100 caracteres que varia dependendo do seed
 * packet. Tenta ter a aparência de um nome real.
 */
function gerarNome(seedPacket) {
  // Temos vários geradores de nomes, que usamos com proporções diferentes.
  var decider = seedPacket.r1 * seedPacket.r2 * 1e15 % 100;
  var generator;
  if (decider < 50) {
    generator = geradorVarianteNorthAmerica;
  } else if (decider < 70) {
    generator = geradorVarianteBrasil;
  } else if (decider < 80) {
    generator = geradorVarianteJp;
  } else if (decider < 90) {
    generator = geradorVarianteIsland;
  } else if (decider < 98) {
    generator = geradorVarianteZhongguo;
  } else {
    generator = geradorVarianteGaeilge;
  }
  return generator(seedPacket).substring(0, 100);
}
;// CONCATENATED MODULE: ./src/generators/gerar-pessoa-casos-fixos.ts
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var geradoresCasosFixos = [function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: gerarStack(s)
    },
    httpEsperado: 201,
    explicacao: "Pessoa sem problemas"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: null,
      nascimento: gerarNascimento(s),
      stack: gerarStack(s)
    },
    httpEsperado: 422,
    explicacao: "Nome null"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nascimento: gerarNascimento(s),
      stack: gerarStack(s)
    },
    httpEsperado: 422,
    explicacao: "Nome faltando"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: Math.floor(s.r2 * 150000000 - 50000000),
      nascimento: gerarNascimento(s),
      stack: gerarStack(s)
    },
    httpEsperado: 400,
    explicacao: "Nome do tipo errado"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: "Maeve Patricia O'Kelly (Meadhbh Pádraigín Ó Ceallaigh)",
      nascimento: gerarNascimento(s),
      stack: gerarStack(s)
    },
    httpEsperado: 201,
    explicacao: "Nome com apóstrofe"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: "",
      nascimento: gerarNascimento(s),
      stack: gerarStack(s)
    },
    httpEsperado: 201,
    explicacao: "Nome vazio"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: "Eduardo Felipe João Daniel Francisco Xavier Salomão Guimarães Gabriel Benjamin Santos Ezequiel Leal",
      nascimento: gerarNascimento(s),
      stack: gerarStack(s)
    },
    httpEsperado: 201,
    explicacao: "Nome com 100 letras"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: "Eduardo Felipe João Daniel Francisco Xavier Salomão Guimarães Gabriel Benjamin Yutief Eytt Praiano 🏖",
      nascimento: gerarNascimento(s),
      stack: gerarStack(s)
    },
    httpEsperado: 201,
    explicacao: "Nome com 100 letras (com emoji)"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: "Pedro de Alcântara João Carlos Leopoldo Salvador Bibiano Francisco Xavier de Paula Leocádio Miguel...",
      nascimento: gerarNascimento(s),
      stack: gerarStack(s)
    },
    httpEsperado: 422,
    explicacao: "Nome com 101 letras"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: null,
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: gerarStack(s)
    },
    httpEsperado: 422,
    explicacao: "Apelido null"
  };
}, function (s) {
  return {
    pessoa: {
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: gerarStack(s)
    },
    httpEsperado: 422,
    explicacao: "Apelido faltando"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: Math.floor(s.r3 * 1000000),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: gerarStack(s)
    },
    httpEsperado: 400,
    explicacao: "Apelido do tipo errado"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s).padStart(32, "0"),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: gerarStack(s)
    },
    httpEsperado: 201,
    explicacao: "Apelido de 32 letras"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: "Friðriksson, the Extremely Strong",
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: gerarStack(s)
    },
    httpEsperado: 422,
    explicacao: "Apelido de 33 letras"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: null,
      stack: gerarStack(s)
    },
    httpEsperado: 422,
    explicacao: "Nascimento null"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      stack: gerarStack(s)
    },
    httpEsperado: 422,
    explicacao: "Nascimento faltando"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: Math.floor(s.r1 * 1e10),
      stack: gerarStack(s)
    },
    httpEsperado: 400,
    explicacao: "Nascimento do tipo errado"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: "2005/06/05",
      stack: gerarStack(s)
    },
    httpEsperado: 400,
    explicacao: "Nascimento no formato errado"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: "05/05/2000",
      stack: gerarStack(s)
    },
    httpEsperado: 400,
    explicacao: "Nascimento no formato errado"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: "2001-11-14T00:00:00",
      stack: gerarStack(s)
    },
    httpEsperado: 400,
    explicacao: "Nascimento no formato errado"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: "2001-8-14",
      stack: gerarStack(s)
    },
    httpEsperado: 400,
    explicacao: "Nascimento no formato errado"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: "",
      stack: gerarStack(s)
    },
    httpEsperado: 400,
    explicacao: "Nascimento vazio"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: "2000-02-29",
      stack: gerarStack(s)
    },
    httpEsperado: 201,
    explicacao: "Nascimento válido, ano bissexto"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: "1582-10-14",
      stack: gerarStack(s)
    },
    httpEsperado: 201,
    explicacao: "Nascimento válido, 1582"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: "2003-02-29",
      stack: gerarStack(s)
    },
    httpEsperado: 422,
    explicacao: "Nascimento inválido"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: "2003-15-12",
      stack: gerarStack(s)
    },
    httpEsperado: 422,
    explicacao: "Nascimento inválido"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: "2000-10-00",
      stack: gerarStack(s)
    },
    httpEsperado: 422,
    explicacao: "Nascimento inválido"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: "2006-06-31",
      stack: gerarStack(s)
    },
    httpEsperado: 422,
    explicacao: "Nascimento inválido"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: null
    },
    httpEsperado: 201,
    explicacao: "Stack null"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s)
    },
    httpEsperado: 201,
    explicacao: "Stack faltando"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: "Typescript, Dart"
    },
    httpEsperado: 400,
    explicacao: "Stack do tipo errado"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: []
    },
    httpEsperado: 201,
    explicacao: "Stack vazia"
  };
}, function (s) {
  var _gerarStack;
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: ((_gerarStack = gerarStack(s)) !== null && _gerarStack !== void 0 ? _gerarStack : []).concat([null])
    },
    httpEsperado: 422,
    explicacao: "Stack com null"
  };
}, function (s) {
  var _gerarStack2;
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: ((_gerarStack2 = gerarStack(s)) !== null && _gerarStack2 !== void 0 ? _gerarStack2 : []).concat([""])
    },
    httpEsperado: 201,
    explicacao: "Stack com string vazia"
  };
}, function (s) {
  var _gerarStack3;
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: ((_gerarStack3 = gerarStack(s)) !== null && _gerarStack3 !== void 0 ? _gerarStack3 : []).concat([Math.floor(s.r1 * 10000)])
    },
    httpEsperado: 400,
    explicacao: "Stack com tipo errado"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: ["C", "D", "F#", "Outras linguagens mto avançadas"]
    },
    httpEsperado: 201,
    explicacao: "Stack com string de 32 letras"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: ["Javascript", "Java", "Python", "C mas só C99 e não C11, 17 nem 23"]
    },
    httpEsperado: 422,
    explicacao: "Stack com string de 33 letras"
  };
}, function (s) {
  var _stack;
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: (_stack = {}, _defineProperty(_stack, 1, "Java"), _defineProperty(_stack, 2, "Kotlin"), _defineProperty(_stack, 3, "Clojure"), _stack)
    },
    httpEsperado: 400,
    explicacao: "Stack como objeto"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: ["Erlang", "Elixir", "F#"]
    },
    httpEsperado: 201,
    explicacao: "Stack com itens repetidos"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: ["G*", "中文培基", "なでしこ", "Эль-76", "🐄"]
    },
    httpEsperado: 201,
    explicacao: "Stack UTF-8"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: ['["C", "C++"]', '["Java", "Kotlin"]']
    },
    httpEsperado: 201,
    explicacao: "Stack com chaves"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: ["reprehenderit", "velit", "adipisicing", "commodo", "veniam", "qui", "incididunt", "veniam", "qui", "ad", "culpa", "dolore", "ipsum", "fugiat", "commodo", "culpa", "dolor", "aute", "Lorem", "ea", "dolore", "magna", "veniam", "cupidatat", "esse", "esse", "anim", "labore", "ex", "ut", "dolore", "Lorem", "veniam", "ullamco", "sint", "duis", "amet", "commodo", "tempor", "ullamco", "esse", "officia", "Lorem", "aliquip", "incididunt", "enim", "enim", "aliqua", "sint", "sunt", "mollit", "sint", "elit", "nostrud", "eiusmod", "occaecat", "labore", "qui", "consectetur", "Lorem", "ea", "veniam", "cillum", "nisi", "enim", "voluptate", "ad", "reprehenderit", "magna", "veniam", "aliqua", "nulla", "occaecat", "et", "exercitation", "officia", "velit", "ex", "quis", "do", "excepteur", "aliqua", "eu", "labore", "non", "et", "et", "consequat", "aliquip", "laborum", "fugiat", "in", "enim", "ea", "elit", "enim", "irure", "labore", "velit", "labore", "labore", "quis", "enim", "pariatur", "occaecat", "laboris", "adipisicing", "Lorem", "voluptate", "pariatur", "fugiat", "ea", "in", "cillum", "sit", "deserunt", "dolor", "minim", "nostrud", "qui", "pariatur", "aliqua", "velit", "ex", "amet", "adipisicing", "labore", "dolore", "culpa", "magna", "cillum", "fugiat", "do", "ea", "quis", "tempor", "do", "magna", "magna", "dolor", "tempor", "cupidatat", "reprehenderit", "Lorem", "quis", "laboris", "minim", "dolore", "ut", "velit", "enim", "fugiat", "exercitation", "exercitation", "qui", "laborum", "elit", "velit", "enim", "Lorem", "proident", "id", "officia", "cillum", "consequat", "commodo", "ad", "culpa", "occaecat", "deserunt", "sint", "ex", "pariatur", "non", "consectetur", "proident", "mollit", "exercitation", "cillum", "consectetur", "adipisicing", "cillum", "amet", "cillum", "velit", "adipisicing", "anim", "pariatur", "sit", "quis", "duis", "nisi", "cupidatat", "est", "nostrud", "dolore", "reprehenderit", "in", "enim", "nulla", "nostrud", "adipisicing", "officia", "culpa", "cillum", "velit", "eu", "ex", "dolor", "aute", "aliqua", "cillum", "eiusmod", "exercitation", "veniam", "nisi", "qui", "et", "sint", "irure", "dolor", "nostrud", "ad", "in", "pariatur", "ut", "dolor", "voluptate", "consequat", "dolor", "ea", "cupidatat", "nisi", "aute", "velit", "consectetur", "aliqua", "fugiat", "fugiat", "sit", "proident", "exercitation", "mollit", "aliquip", "ipsum", "excepteur", "fugiat", "occaecat", "cupidatat", "duis", "laboris", "adipisicing", "veniam", "id", "nostrud", "commodo", "duis", "sint", "consectetur", "ea", "aliqua", "sunt", "ea", "non", "nisi", "ad", "consequat", "nisi", "dolor", "laborum", "deserunt", "eiusmod", "irure", "qui", "ex", "duis", "culpa", "cillum", "pariatur", "veniam", "ullamco", "consequat", "deserunt", "qui", "excepteur", "et", "do", "dolore", "magna", "laborum", "enim", "sint", "esse", "veniam", "do", "Lorem", "eu", "in", "veniam", "excepteur", "qui", "esse", "ad", "duis", "irure", "occaecat", "aliquip", "esse", "reprehenderit", "consectetur", "ad", "deserunt", "Lorem", "sunt", "duis", "non", "cillum", "aute", "labore", "sunt", "in", "consequat", "sit", "sint", "est", "minim", "in", "amet", "laborum", "qui", "labore", "occaecat", "proident", "sit", "voluptate", "ex", "non", "cillum", "cillum", "est", "proident", "mollit", "deserunt", "pariatur", "amet", "laboris", "ut", "culpa", "officia", "nulla", "nisi", "elit", "commodo", "anim", "dolor", "deserunt", "nostrud", "sit", "fugiat", "tempor", "Lorem", "ipsum", "minim", "irure", "dolor", "voluptate", "officia", "et", "laboris", "qui", "quis", "adipisicing", "consequat", "velit", "esse", "voluptate", "sint", "reprehenderit", "laborum", "minim", "ipsum", "nulla", "fugiat", "mollit", "sint", "eiusmod", "ea", "nostrud", "est", "consectetur", "officia", "reprehenderit", "occaecat", "mollit", "veniam", "eiusmod", "mollit", "nisi", "eu", "qui", "mollit", "amet", "commodo", "do", "do", "voluptate", "anim", "et", "ad", "velit", "laboris", "mollit", "elit", "eiusmod", "do", "mollit", "do", "eiusmod", "tempor", "mollit", "nulla", "consectetur", "amet", "dolor", "magna", "fugiat", "deserunt", "laborum", "voluptate", "voluptate", "do", "officia", "dolore", "amet", "ea", "quis", "incididunt", "sunt", "veniam", "ex", "fugiat", "pariatur", "quis", "magna", "enim", "enim", "deserunt", "velit", "amet", "esse", "aute", "elit", "minim", "deserunt", "laboris", "laboris", "sunt", "et", "excepteur", "minim", "ullamco", "sint", "magna", "in", "laborum", "pariatur", "eiusmod", "do", "culpa", "duis", "reprehenderit", "do", "esse", "enim", "tempor", "ut", "deserunt", "enim", "nostrud", "ullamco", "dolor", "anim", "nulla", "adipisicing", "est", "sint", "duis", "incididunt", "irure", "cupidatat", "esse", "ad", "elit", "fugiat", "sunt", "velit", "laboris", "reprehenderit", "sunt", "Lorem", "cillum", "mollit", "officia", "ea", "laboris", "nostrud", "sint", "reprehenderit", "eu", "anim", "minim", "sunt", "aliquip", "occaecat", "culpa", "amet", "aliqua", "proident", "consequat", "proident", "enim", "enim", "dolor", "aliqua", "laboris", "mollit", "ipsum", "reprehenderit", "voluptate", "veniam", "velit", "labore", "sint", "eiusmod", "minim", "reprehenderit", "dolore", "mollit", "eu", "ea", "qui", "exercitation", "duis", "ad", "incididunt", "proident", "voluptate", "est", "laborum", "ex", "eu", "magna", "in", "consequat", "reprehenderit", "dolore", "occaecat", "et", "labore", "velit", "veniam", "duis", "irure", "non", "duis", "sunt", "ut", "irure", "aute", "minim", "quis", "in", "do", "cupidatat", "ullamco", "consectetur", "velit", "ea", "excepteur", "tempor", "ipsum", "sint", "est", "amet", "dolor", "do", "ex", "quis", "non", "laboris", "mollit", "fugiat", "est", "incididunt", "incididunt", "do", "cillum", "adipisicing", "non", "esse", "do", "cillum", "non", "est", "dolor", "sunt", "in", "aliqua", "ex", "exercitation", "occaecat", "elit", "sit", "anim", "cupidatat", "nostrud", "labore", "aliquip", "est", "Lorem", "excepteur", "officia", "ad", "duis", "tempor", "dolore", "aliquip", "cupidatat", "pariatur", "deserunt", "dolore", "enim", "cupidatat", "veniam", "ad", "in", "ut", "ad", "est", "non", "ex", "deserunt", "esse", "consequat", "cupidatat", "eu", "incididunt", "irure", "exercitation", "commodo", "eiusmod", "aute", "nulla", "dolore", "laboris", "cupidatat", "adipisicing", "eiusmod", "cupidatat", "ex", "enim", "esse", "labore", "tempor", "dolore", "culpa", "commodo", "ea", "commodo", "duis", "Lorem", "anim", "ullamco", "elit", "esse", "esse", "amet", "eiusmod", "sunt", "quis", "commodo", "duis", "sunt", "proident", "tempor", "dolor", "id", "et", "qui", "ea", "exercitation", "ullamco", "ullamco", "amet", "ex", "commodo", "irure", "occaecat", "culpa", "ullamco", "anim", "laboris", "esse", "anim", "amet", "irure", "adipisicing", "mollit", "eu", "exercitation", "proident", "enim", "do", "culpa", "adipisicing", "dolore", "excepteur", "id", "nisi", "anim", "consequat", "culpa", "proident", "proident", "velit", "voluptate", "adipisicing", "magna", "minim", "duis", "deserunt", "amet", "amet", "aliqua", "ipsum", "anim", "officia", "officia", "commodo", "aute", "ipsum", "dolor", "cupidatat", "non", "dolore", "ad", "anim", "cupidatat", "deserunt", "cillum", "nisi", "id", "culpa", "aliquip", "nostrud", "esse", "elit", "excepteur", "quis", "nostrud", "nisi", "pariatur", "anim", "eu", "mollit", "qui", "ex", "aliquip", "tempor", "enim", "deserunt", "amet", "pariatur", "ex", "exercitation", "sit", "dolore", "et", "excepteur", "cillum", "laboris", "pariatur", "do", "incididunt", "culpa", "et", "sint", "labore", "sunt", "ullamco", "cillum", "duis", "magna", "occaecat", "ea", "enim", "excepteur", "excepteur", "duis", "laborum", "dolore", "dolore", "qui", "fugiat", "veniam", "ipsum", "consequat", "ullamco", "sit", "magna", "duis", "sunt", "anim", "mollit", "id", "cupidatat", "excepteur", "aliquip", "dolor", "dolor", "mollit", "tempor", "est", "id", "aute", "enim", "ipsum", "deserunt", "culpa", "eiusmod", "voluptate", "dolor", "reprehenderit", "et", "ullamco", "laborum", "cillum", "aliquip", "Lorem", "occaecat", "proident", "esse", "consequat", "consequat", "ipsum", "ea", "occaecat", "aliqua", "laboris", "nostrud", "deserunt", "excepteur", "voluptate", "ipsum", "occaecat", "non", "in", "exercitation", "ex", "officia", "incididunt", "anim", "reprehenderit", "non", "duis", "eu", "dolore", "tempor", "esse", "commodo", "aliqua", "nisi", "ullamco", "reprehenderit", "officia", "eu", "est", "enim", "consequat", "fugiat", "et", "cupidatat", "eiusmod", "dolor", "pariatur", "pariatur", "eu", "velit", "veniam", "voluptate", "consectetur", "id", "eu", "ullamco", "sit", "nisi", "ad", "cillum", "nostrud", "qui", "ipsum", "adipisicing", "fugiat", "duis", "incididunt", "anim", "proident", "aute", "eiusmod", "sit", "ullamco", "tempor", "ullamco", "deserunt", "dolore", "consectetur", "ipsum", "amet", "veniam", "labore", "id", "laborum", "pariatur", "laboris", "cillum", "sunt", "eiusmod", "nostrud", "proident", "ea", "anim", "proident", "eiusmod", "adipisicing", "nostrud", "consequat", "do", "irure", "eiusmod", "magna", "velit", "voluptate", "ut", "ut", "ex", "magna", "in", "veniam", "nostrud", "amet", "mollit", "eiusmod", "ex", "dolore", "mollit", "sint", "cillum", "qui", "aute", "minim", "reprehenderit", "adipisicing", "quis", "ipsum", "sit", "consequat", "est", "esse", "incididunt", "aliquip", "proident", "esse", "est", "nostrud", "minim", "nisi", "tempor", "duis", "sit", "ad", "pariatur", "magna", "cillum", "voluptate", "et", "irure", "laboris", "aliquip", "nisi", "dolor", "et", "ullamco", "velit", "non", "ea", "officia", "consequat", "incididunt", "aliquip", "aliqua", "tempor", "id", "ipsum", "anim", "eu", "eiusmod", "non", "Lorem", "cupidatat", "consectetur", "consequat", "nostrud", "veniam", "elit", "cupidatat", "id", "ex", "excepteur", "adipisicing", "id", "excepteur", "excepteur", "laborum", "minim", "anim"]
    },
    httpEsperado: 201,
    explicacao: "Stack com 1025 itens"
  };
}];
;// CONCATENATED MODULE: ./src/generators/gerar-pessoa.ts




/**
 * Objeto representando uma pessoa válida.
 *
 * Note que funções que retornam pessoas com algum problema (ex.: campo do tipo
 * errado) serão do tipo any.
 */

/**
 * Objeto representando uma pessoa válida com id.
 *
 * Note que somente objetos sem erro (ex.: campo do tipo errado) devem ser
 * anotados com esse tipo. Um objeto que acabou de vir do servidor tem tipo any,
 * pois não se sabe se ele está certo.
 */

/**
 * Guarda uma pessoa que pode ter problema ou não (por isso o tipo de pessoa é
 * any), junto com o código HTTP esperado e uma explicação.
 */

/**
 * Objeto que armazena um conjunto de valores aleatórios no intervalo [0,1)
 * para que não seja necessário gerar números aleatórios com frequência
 * excessiva. Cada variável deve ser independente. Cada variável é gerada com
 * Math.random(), então terá 16 dígitos decimais após a vírgula.
 */

function newSeedPacket() {
  return {
    r1: Math.random(),
    r2: Math.random(),
    r3: Math.random()
  };
}

/**
 * Gera uma nova pessoa aleatoriamente, sem id. A pessoa gerada aqui sempre
 * será válida.
 *
 * O conteúdo do objeto gerado usa o parâmetro seed para derivar os itens que
 * variam. Se você precisa de uma nova pessoa que não foi gerada antes, deixe
 * o parâmetro seed vazio (ou envie um seed novo, que dá no mesmo).
 * @param seed Objeto que determina os itens aleatórios. O propósito primário
 * deste parâmetro é evitar chamadas excessivas e imprevisíveis a métodos
 * aleatórios. Se não for informado, um novo seed é usado automaticamente.
 * Você só precisa especificar este parâmetro se você quiser gerar a mesma
 * pessoa que já foi gerada antes.
 */
function gerarPessoa(seed) {
  var s = seed !== null && seed !== void 0 ? seed : newSeedPacket();
  return {
    apelido: gerarApelido(s),
    nome: gerarNome(s),
    nascimento: gerarNascimento(s),
    stack: gerarStack(s)
  };
}

// var casoFixoIndex = 0;

/**
 * Gera uma nova pessoa que pode ou não ter algum erro, junto com código HTTP
 * esperado para esta pessoa. Estes objetos são escolhidos de uma lista fixa,
 * em ordem.
 * @returns Uma pessoa e o código http esperado.
 */
function gerarPessoaCasoFixo(seed) {
  // Usamos um índice que incrementa para acessar os casos em ordem, para ter
  // uma distribuição uniforme nas chamadas.
  // var nextIndex = (casoFixoIndex + 1) % geradoresCasosFixos.length;
  // var res = geradoresCasosFixos[casoFixoIndex](newSeedPacket());
  // casoFixoIndex = nextIndex;

  // Usar um índice fixo não estava se comportando como esperado. Índices
  // aleatórios são um jeito mais confiável de obter uma distribuição
  // homogênea.
  var newSeed = seed !== null && seed !== void 0 ? seed : newSeedPacket();
  var index = Math.floor(newSeed.r1 * 1e8) % geradoresCasosFixos.length;
  return geradoresCasosFixos[index](newSeed);
}
;// CONCATENATED MODULE: external "k6/http"
const http_namespaceObject = require("k6/http");
var http_default = /*#__PURE__*/__webpack_require__.n(http_namespaceObject);
;// CONCATENATED MODULE: ./src/requests/requests.ts
function requests_typeof(o) { "@babel/helpers - typeof"; return requests_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, requests_typeof(o); }
function requests_defineProperty(obj, key, value) { key = requests_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function requests_toPropertyKey(arg) { var key = requests_toPrimitive(arg, "string"); return requests_typeof(key) === "symbol" ? key : String(key); }
function requests_toPrimitive(input, hint) { if (requests_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (requests_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var HOST = "http://localhost:9999";

/** Envia a request POST que cadastra uma pessoa. */
function cadastrarPessoa(pessoa) {
  // O parâmetro pessoa tem tipo any pois podemos querer enviar pessoas com
  // formato errado. O retorno usa o tipo genérico any pois não confiamos no que
  // está vindo do servidor.
  return http_default().post("".concat(HOST, "/pessoas"), JSON.stringify(pessoa), {
    headers: requests_defineProperty({}, "Content-Type", "application/json")
  });
}

/** Envia a request GET que busca uma pessoa por id. */
function buscarPessoa(id) {
  return http_default().get("".concat(HOST, "/pessoas/").concat(id), {
    tags: {
      name: "".concat(HOST, "/pessoas/<id>")
    }
  });
}

/** Envia a request GET que busca uma lista de pessoas por termo. */
function buscarPorTermo(t) {
  return http_default().get("".concat(HOST, "/pessoas?t=").concat(encodeURI(t).replace("+", "%2b").replace("#", "%23")), {
    tags: {
      name: "".concat(HOST, "/pessoas")
    }
  });
}

/**
 * Envia a request GET que conta pessoas (nota: esperamos o retorno em plaintext).
 *
 * Este endpoint não deve ter sua performance testada. Serve apenas para validar
 * a quantidade de pessoas inseridas no banco.
 * */
function contagemPessoas() {
  return http.get("".concat(HOST, "/contagem-pessoas"));
}
;// CONCATENATED MODULE: ./src/validators/validar-uuid.ts


/** Valida se uma string é um UUID válido. */
function validarUuid(str) {
  return (0,external_k6_namespaceObject.check)(str, {
    "id é UUID": function idÉUUID() {
      return /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(str);
    }
  });
}
;// CONCATENATED MODULE: ./src/validators/validar-pessoa.ts
function validar_pessoa_defineProperty(obj, key, value) { key = validar_pessoa_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function validar_pessoa_toPropertyKey(arg) { var key = validar_pessoa_toPrimitive(arg, "string"); return validar_pessoa_typeof(key) === "symbol" ? key : String(key); }
function validar_pessoa_toPrimitive(input, hint) { if (validar_pessoa_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (validar_pessoa_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function validar_pessoa_typeof(o) { "@babel/helpers - typeof"; return validar_pessoa_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, validar_pessoa_typeof(o); }



/**
 * Compara uma pessoa que foi buscada do servidor com o objeto que usamos para
 * o cadastro. Os dois objetos devem ter todos os campos iguais.
 */
function validarPessoa(expected, actual) {
  return (0,external_k6_namespaceObject.check)(actual, {
    "Pessoa é objeto": function PessoaÉObjeto() {
      return validar_pessoa_typeof(actual) === "object";
    },
    "Pessoa tem id correto": function PessoaTemIdCorreto() {
      return expected.id === actual.id;
    },
    "Pessoa tem apelido correto": function PessoaTemApelidoCorreto() {
      return expected.apelido === actual.apelido;
    },
    "Pessoa tem nascimento correto": function PessoaTemNascimentoCorreto() {
      return expected.nascimento === actual.nascimento;
    },
    "Pessoa tem stack correta": function PessoaTemStackCorreta() {
      return compararStack(expected.stack, actual.stack);
    }
  });
}
function compararStack(expected, actual) {
  // Se ambos forem arrays:
  if (Array.isArray(expected) && Array.isArray(actual)) {
    // Comparamos item por item
    for (var i = 0; i < expected.length; i++) {
      if (expected[i] !== actual[i]) {
        return false;
      }
    }
    return true;
  } else {
    // Se não forem arrays, comparamos se ambos são null.
    // Precisa usar o ===, pois com ==, null compara igual a undefined.
    // Typeof também não funciona direito porque typeof null dá "object".
    return expected === null && actual === null;
    // Todos os outros casos retornam false, pois expected só pode ser string ou
    // null (e se não for, é um bug neste script).
  }
}

/**
 * Verifica se a lista retornada em uma busca por termo realmente contém somente
 * itens que contém o termo buscado no apelido, nome ou em algum lugar da stack.
 * 
 * Opcionalmente, um parâmetro pode ser especificado para indicar a quantidade
 * mínima de itens que deve ser encontrado.
 */
function validarBuscaPorTermo(termo, lista, comprimentoMinimoEsperado) {
  // Primeiro, verificamos se a lista é um array. Se não for, já é uma falha.
  if (!(0,external_k6_namespaceObject.check)(lista, {
    "Retorno da busca por termo é array": function RetornoDaBuscaPorTermoÉArray() {
      return Array.isArray(lista);
    }
  })) {
    return false;
  }
  var castList = lista;

  // Se um tamanho mínimo foi especificado, vamos validar agora.
  if (typeof comprimentoMinimoEsperado === "number") {
    if (!(0,external_k6_namespaceObject.check)(castList, {
      "Lista tem o tamanho mínimo esperado": function ListaTemOTamanhoMínimoEsperado() {
        return castList.length >= comprimentoMinimoEsperado;
      }
    })) {
      return false;
    }
  }

  // Agora, verificamos que todos os itens do array são pessoas com formato válido.
  var _loop = function _loop() {
      var pessoa = castList[i];
      if (!(0,external_k6_namespaceObject.check)(pessoa, validar_pessoa_defineProperty({}, "Retorno da busca por termo deve ser pessoa", function RetornoDaBuscaPorTermoDeveSerPessoa() {
        return validarFormatoPessoa(pessoa);
      }))) {
        return {
          v: false
        };
      }
    },
    _ret;
  for (var i = 0; i < castList.length; i++) {
    _ret = _loop();
    if (_ret) return _ret.v;
  }
  var pessoasList = castList;
  var _iterator = _createForOfIteratorHelper(pessoasList),
    _step;
  try {
    var _loop2 = function _loop2() {
        var pessoa = _step.value;
        // Procuramos o termo no apelido, no nome e nos itens da stack. Se não
        // encontrarmos, deve dar erro.
        if (!(0,external_k6_namespaceObject.check)(pessoa, {
          "Pessoa buscada deve conter o termo.": function PessoaBuscadaDeveConterOTermo() {
            var match = stringContains(pessoa.apelido, termo) || stringContains(pessoa.nome, termo) || arrayContains(pessoa.stack, termo);
            // Ponha um console.log aqui se quiser saber os objetos que deviam ter
            // o termo mas não tem (para debugar seu server)
            if (!match) {
              // console.log(`Busca por termo ${termo} retornou objeto sem o termo: ${JSON.stringify(pessoa, null, 2)}`);
            }
            return match;
          }
        })) {
          return {
            v: false
          };
        }
      },
      _ret2;
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _ret2 = _loop2();
      if (_ret2) return _ret2.v;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return true;
}

/** Verifica se a string `s1` contém a string `s2` */
function stringContains(s1, s2) {
  // Explicação: Nossas regras especificam que case-sensitiveness e normalização
  // Unicode são ambos opcionais na busca. Portanto, é possível que o server
  // retorne uma string que não bate com o termo exatamente, mas somente após
  // aplicar normalização ou remover casing.

  var comparator = function comparator(s1, s2, f) {
    return f(s1).indexOf(f(s2)) >= 0;
  };
  if (comparator(s1, s2, function (s) {
    return s.normalize("NFC").toLocaleLowerCase("pt-BR");
  })) {
    return true;
  }

  // Este caso não deve acontecer, pois atualmente não temos termos de busca
  // que dependem de normalizações de compatibiliade. Isso só poderá ocorrer
  // se introduzirmos algum termo como Ｐｅｄｒｏ, mas não há motivo para
  // fazer isso.
  if (comparator(s1, s2, function (s) {
    return s.normalize("NFKC").toLocaleLowerCase("pt-BR");
  })) {
    return true;
  }

  // Estes casos adicionais somente pegam casos raros como o ı (i minúsculo
  // sem pingo) que indevidamente compara igual ao I (i maiúsculo) se uma
  // comparação colocar ambos em uppercase. Damos essa chance porque o server
  // _pode_ fazer uma comparação dessa se quiser, mas não há motivo real para
  // isso ao invés de uma comparação case-insensitive. Isso pode deixar passar
  // casos que deviam ser rejeitados, mas nossos termos de busca possível são
  // apenas primeiros nomes sem essas exceções super específicas que não devem
  // cair nessa situação.
  if (comparator(s1, s2, function (s) {
    return s.normalize("NFC").toLocaleUpperCase("pt-BR");
  })) {
    return true;
  }
  if (comparator(s1, s2, function (s) {
    return s.normalize("NFKC").toLocaleUpperCase("pt-BR");
  })) {
    return true;
  }
  return false;
}

/** Verifica se a string `st` contém em algum lugar a string `s2` */
function arrayContains(st, t) {
  if (st == null) {
    // Stack null pode, mas não contém nada.
    return false;
  }
  var _iterator2 = _createForOfIteratorHelper(st),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var st_t = _step2.value;
      if (stringContains(st_t, t)) {
        return true;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return false;
}
function validarFormatoPessoa(pessoa) {
  var res = (0,external_k6_namespaceObject.check)(pessoa, {
    "Pessoa tem apelido": function PessoaTemApelido() {
      return typeof pessoa.apelido == "string";
    },
    "Pessoa tem nome": function PessoaTemNome() {
      return typeof pessoa.nome == "string";
    },
    "Pessoa tem nascimento": function PessoaTemNascimento() {
      return typeof pessoa.nascimento == "string";
    },
    "Pessoa tem nascimento no formato certo": function PessoaTemNascimentoNoFormatoCerto() {
      return validarFormatoNascimento(pessoa.nascimento);
    },
    "Pessoa tem stack correta": function PessoaTemStackCorreta() {
      return validarFormatoStack(pessoa.stack);
    }
  });
  return res;
}
function validarFormatoNascimento(str) {
  if (typeof str !== "string") {
    return false;
  }
  if (str.length !== 10) {
    return false;
  }
  if (str[4] !== '-' || str[7] !== '-') {
    return false;
  }
  var yyyy = parseInt(str.substring(0, 4));
  var mm = parseInt(str.substring(5, 7));
  var dd = parseInt(str.substring(8, 10));
  if (!yyyy || Number.isNaN(yyyy) || !mm || Number.isNaN(mm) || !dd || Number.isNaN(dd)) {
    // Nós não guardarmos datas com ano 0000. Mês e dia, é claro, não podem ser
    // 0. Undefined também não pode. NaN significa falha no parse, e não pode.
    return false;
  }
  if (yyyy < 0) {
    return false;
  }

  // Quantidade de dias no mês
  // Este código foi copiado do gerador de data, que já tinha essa lógica.
  var daysInMonth = 0;
  if ([1, 3, 5, 7, 8, 10, 12].includes(mm)) {
    daysInMonth = 31;
  } else if ([4, 6, 9, 11].includes(mm)) {
    daysInMonth = 30;
  } else if (mm == 2) {
    daysInMonth = bissexto(yyyy) ? 29 : 28;
  } else {
    // Outros meses são inválidos.
    return false;
  }
  if (dd < 1 || dd > daysInMonth) {
    return false;
  }
  return true;
}
function validarFormatoStack(st) {
  if (st == null) {
    // Nulo pode.
    return true;
  }
  if (!Array.isArray(st)) {
    return false;
  }
  for (var i = 0; i < st.length; i++) {
    if (typeof st[i] !== "string") {
      return false;
    }
  }
  return true;
}
;// CONCATENATED MODULE: external "k6/metrics"
const metrics_namespaceObject = require("k6/metrics");
;// CONCATENATED MODULE: ./src/main-test.ts
function main_test_typeof(o) { "@babel/helpers - typeof"; return main_test_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, main_test_typeof(o); }
function main_test_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = main_test_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { main_test_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function main_test_defineProperty(obj, key, value) { key = main_test_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function main_test_toPropertyKey(arg) { var key = main_test_toPrimitive(arg, "string"); return main_test_typeof(key) === "symbol" ? key : String(key); }
function main_test_toPrimitive(input, hint) { if (main_test_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (main_test_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || main_test_unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function main_test_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return main_test_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return main_test_arrayLikeToArray(o, minLen); }
function main_test_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var options = {
  stages: [
  // load
  {
    duration: "1m",
    target: 100
  }, {
    duration: "1m",
    target: 200
  }, {
    duration: "30s",
    target: 0
  },
  // ramp down
  // smoke
  {
    duration: "1m",
    target: 3
  }, {
    duration: "30s",
    target: 0
  },
  // ramp down
  // stress
  {
    duration: "4m",
    target: 200
  }, {
    duration: "2m",
    target: 400
  }, {
    duration: "30s",
    target: 0
  },
  // ramp down
  // spike
  {
    duration: "2m",
    target: 2000
  }, {
    duration: "1m",
    target: 0
  }, {
    duration: "1m",
    target: 2000
  }, {
    duration: "1m",
    target: 0
  }]
};

// Este contador não liga para o status específico, somente se o status é 0
// ou não. Status 0 significa que a request não foi finalizada, por exemplo por
// algum erro de timeout.
// Se o servidor não der conta de responder a request, vai contar como má
// performance. Se o servidor der a resposta errada, causará um check failed e
// vai abaixar a pontuação de correctness.
var httpCompletedRate = new metrics_namespaceObject.Rate('http_reqs_completed');

/** Incrementa a métrica de requests completas, e retorna true iff a request completou. */
function httpCount(res) {
  // Um Rate diferencia entre valores que são truthy e falsy.
  // Status 0 significa que a request não completou.
  httpCompletedRate.add(res.status);
  return !!res.status;
}
/* harmony default export */ const main_test = (function () {
  // Este ciclo faz várias inserções, uma após a outra sem paradas, e depois
  // dorme por 1 segundo.
  // Total: 50 inserções e até 40 buscas por id
  (0,external_k6_namespaceObject.group)("Ciclo de inserção e leitura", function () {
    // Primeira etapa: Vamos cadastrar várias pessoas e lembrar do id de todas,
    // assim como os objetos que enviamos.

    // Este array contém outros arrays dentro. Cada um destes sub-arrays tem o id
    // retornado na request no primeiro item, e a pessoa que geramos no segundo
    // item. Vamos usar para comparar depois com os itens que buscarmos no banco.
    var novasPessoas = [];
    var _loop = function _loop() {
        var pessoa = gerarPessoa();
        var res = cadastrarPessoa(pessoa);
        // O cadastro de pessoa pode retornar o body que quiser, então não podemos
        // testar isso.
        if (
        // httpCount retorna false se a request não completou corretamente; se
        // for o caso, não realizamos o check. Assim, o check vira uma métrica
        // funcional se não considera as requests que o server não conseguiu
        // responder.
        !httpCount(res) || !(0,external_k6_namespaceObject.check)(res, {
          "Status 201 para pessoa criada": function Status201ParaPessoaCriada() {
            return res.status === 201;
          }
        })) {
          // Pode dar console.log aqui se for necessário debugar seu server
          // console.log(
          //   `Unexpected failure with error ${res.status
          //   } for input: ${JSON.stringify(pessoa, null, 2)}`
          // );
          return 0; // continue
        }
        if (!(0,external_k6_namespaceObject.check)(res, {
          "Header Location retornado com valor correto": function HeaderLocationRetornadoComValorCorreto() {
            return !!res.headers["Location"] && res.headers["Location"].startsWith("/pessoas/");
          }
        })) {
          return 0; // continue
        }

        // Extraímos o id do header Location, que é o único retorno obrigatório no
        // caso de 201.
        var id = res.headers["Location"].replace("/pessoas/", "");
        if (!(0,external_k6_namespaceObject.check)(id, {
          "Id deve ser UUID": function IdDeveSerUUID() {
            return validarUuid(id);
          }
        })) {
          return 0; // continue
        }
        novasPessoas.push([id, pessoa]);
      },
      _ret;
    for (var i = 0; i < 20; i++) {
      _ret = _loop();
      if (_ret === 0) continue;
    }

    // Segunda etapa: Vamos enviar alguns casos fixos antes de conferir se as
    // pessoas que cadastramos realmente existem no banco.
    var _loop2 = function _loop2() {
      var _pessoaCasoFixo$expli;
      var pessoaCasoFixo = gerarPessoaCasoFixo();
      var res = cadastrarPessoa(pessoaCasoFixo.pessoa);
      var httpOk = httpCount(res);
      var explicacao = "Status ".concat(pessoaCasoFixo.httpEsperado, ", ").concat((_pessoaCasoFixo$expli = pessoaCasoFixo.explicacao) !== null && _pessoaCasoFixo$expli !== void 0 ? _pessoaCasoFixo$expli : "pessoa com erro");
      if (httpOk) {
        (0,external_k6_namespaceObject.check)(res, main_test_defineProperty({}, explicacao, function () {
          return res.status == pessoaCasoFixo.httpEsperado;
        }));
      }
    };
    for (var i = 0; i < 10; i++) {
      _loop2();
    }

    // Terceira etapa: Vamos voltar no array de pessoas geradas e validar que todas
    // realmente existem no banco.
    var _loop3 = function _loop3() {
        var _novasPessoas$_i = _slicedToArray(_novasPessoas[_i], 2);
        idPessoaCriada = _novasPessoas$_i[0];
        pessoaCriada = _novasPessoas$_i[1];
        var res = buscarPessoa(idPessoaCriada);
        if (!httpCount(res) || !(0,external_k6_namespaceObject.check)(res, {
          "Status 200": function Status200() {
            return res.status == 200;
          }
        })) {
          return 0; // continue
        }
        if (!(0,external_k6_namespaceObject.check)(res, {
          "Contém body que é string": function ContémBodyQueÉString() {
            return typeof res.body === "string";
          }
        })) {
          return 0; // continue
        }
        validarPessoa(_objectSpread({
          id: idPessoaCriada
        }, pessoaCriada), res.json());
      },
      idPessoaCriada,
      pessoaCriada,
      _ret2;
    for (var _i = 0, _novasPessoas = novasPessoas; _i < _novasPessoas.length; _i++) {
      _ret2 = _loop3();
      if (_ret2 === 0) continue;
    }
    (0,external_k6_namespaceObject.sleep)(1);
  });

  // Este grupo e idêntico à segunda etapa do ciclo de inserção e leitura, mas
  // extraído para que possa rodar separadamente.
  //
  // Total: 30 inserções.
  (0,external_k6_namespaceObject.group)("Funcional somente", function () {
    var _loop4 = function _loop4() {
      var _pessoaCasoFixo$expli2;
      var pessoaCasoFixo = gerarPessoaCasoFixo();
      var res = cadastrarPessoa(pessoaCasoFixo.pessoa);
      var httpOk = httpCount(res);
      var explicacao = "Status ".concat(pessoaCasoFixo.httpEsperado, ", ").concat((_pessoaCasoFixo$expli2 = pessoaCasoFixo.explicacao) !== null && _pessoaCasoFixo$expli2 !== void 0 ? _pessoaCasoFixo$expli2 : "pessoa com erro");
      if (httpOk) {
        (0,external_k6_namespaceObject.check)(res, main_test_defineProperty({}, explicacao, function () {
          return res.status == pessoaCasoFixo.httpEsperado;
        }));
      }

      // Aqui seria possível fazer algo como uma busca pelo apelido para verificar
      // se a pessoa realmente existe ou não, mas uma das ideias desse grupo
      // separado é focar nos checks para os testes de caso fixo.
    };
    for (var i = 0; i < 30; i++) {
      _loop4();
    }
    (0,external_k6_namespaceObject.sleep)(1);
  });

  // Este grupo faz algumas buscas e também algumas inserções, e depois dorme
  // por 1 segundo.
  //
  // Total: 61 buscas por termo, 20 inserções e 20 buscas por id
  (0,external_k6_namespaceObject.group)("Busca por termo", function () {
    // As regras permitem que a busca por termo retorne apenas 50 itens, e por
    // isso nós nunca podemos esperar que um certo item específico seja retornado.
    // O que podemos fazer, porém, é verificar que a busca realmente retornou
    // apenas itens que contém o termo buscado.
    var seedPackets = [];
    for (var _i2 = 0; _i2 < 20; _i2++) {
      seedPackets.push(newSeedPacket());
    }

    // 20 buscas por nome
    var _loop5 = function _loop5() {
      var seedPacket = _seedPackets[_i3];
      // Pega um nome, como "Pedro", ou "John".
      var termo1 = gerarNome(seedPacket).split(" ")[0];
      var res1 = buscarPorTermo(termo1);
      if (httpCount(res1) && (0,external_k6_namespaceObject.check)(res1, {
        "Status 200": function Status200() {
          return res1.status == 200;
        },
        "Contém body que é string": function ContémBodyQueÉString() {
          return typeof res1.body === "string";
        }
      })) {
        // Body ok, verifica o conteúdo
        validarBuscaPorTermo(termo1, res1.json());
      }
    };
    for (var _i3 = 0, _seedPackets = seedPackets; _i3 < _seedPackets.length; _i3++) {
      _loop5();
    }

    // 20 buscas por número aleatório
    var _loop6 = function _loop6() {
      var seedPacket = _seedPackets2[_i4];
      // Gera um número aleatório de dois dígitos, como "55", ou "26".
      var termo2 = (Math.floor(seedPacket.r2 * 1e7) % 100).toString(10);
      var res2 = buscarPorTermo(termo2);
      if (httpCount(res2) && (0,external_k6_namespaceObject.check)(res2, {
        "Status 200": function Status200() {
          return res2.status == 200;
        },
        "Contém body que é string": function ContémBodyQueÉString() {
          return typeof res2.body === "string";
        }
      })) {
        validarBuscaPorTermo(termo2, res2.json());
      }
    };
    for (var _i4 = 0, _seedPackets2 = seedPackets; _i4 < _seedPackets2.length; _i4++) {
      _loop6();
    }

    // 20 buscas por item aleatório de stack
    var _loop7 = function _loop7() {
      var seedPacket = _seedPackets3[_i5];
      // Gera um item de uma stack, reusando a constante que é usada pelo gerador
      // de stack.
      var termo3 = linguagensP[Math.floor(seedPacket.r3 * linguagensP.length)];
      var res3 = buscarPorTermo(termo3);
      if (httpCount(res3) && (0,external_k6_namespaceObject.check)(res3, {
        "Status 200": function Status200() {
          return res3.status == 200;
        },
        "Contém body que é string": function ContémBodyQueÉString() {
          return typeof res3.body === "string";
        }
      })) {
        validarBuscaPorTermo(termo3, res3.json());
      }
    };
    for (var _i5 = 0, _seedPackets3 = seedPackets; _i5 < _seedPackets3.length; _i5++) {
      _loop7();
    }

    // 20 inserções seguidas de uma única busca por termo bem específico
    // Geramos um termo bem específico, para buscar e verificar que os
    // resultados contém pelo menos aquela quantidade de pessoas.
    // NOTA: Boa parte deste código é uma cópia do outro script acima.

    // O nosso "termo bem específico" usa o mesmo algoritmo que a geração de
    // apelido, mas na verdade será usado no nome.
    var termo4 = gerarApelido(seedPackets[0]);
    var novasPessoas = [];
    var _loop8 = function _loop8() {
        var pessoa = gerarPessoa();

        // 1/2 de chance de inserir no nome,
        // 1/2 de chance de dar um append na stack (criando se não existir)
        if (seedPackets[0].r1 >= 0.5) {
          pessoa.nome = termo4;
        } else {
          var _pessoa$stack;
          pessoa.stack = ((_pessoa$stack = pessoa.stack) !== null && _pessoa$stack !== void 0 ? _pessoa$stack : []).concat([termo4]);
        }
        // Agora a pessoa possui o "termo bem específico".

        var res = cadastrarPessoa(pessoa);
        // O cadastro de pessoa pode retornar o body que quiser, então não podemos
        // testar isso.
        if (!httpCount(res) || !(0,external_k6_namespaceObject.check)(res, {
          "Status 201 para pessoa criada": function Status201ParaPessoaCriada() {
            return res.status === 201;
          }
        })) {
          // Pode dar console.log aqui se for necessário debugar seu server
          // console.log(
          //   `Unexpected failure with error ${res.status
          //   } for input: ${JSON.stringify(pessoa, null, 2)}`
          // );
          return 0; // continue
        }
        if (!(0,external_k6_namespaceObject.check)(res, {
          "Header Location retornado com valor correto": function HeaderLocationRetornadoComValorCorreto() {
            return !!res.headers["Location"] && res.headers["Location"].startsWith("/pessoas/");
          }
        })) {
          return 0; // continue
        }

        // Extraímos o id do header Location, que é o único retorno obrigatório no
        // caso de 201.
        var id = res.headers["Location"].replace("/pessoas/", "");
        if (!(0,external_k6_namespaceObject.check)(id, {
          "Id deve ser UUID": function IdDeveSerUUID() {
            return validarUuid(id);
          }
        })) {
          return 0; // continue
        }
        novasPessoas.push([id, pessoa]);
      },
      _ret3;
    for (var i = 0; i < 20; i++) {
      _ret3 = _loop8();
      if (_ret3 === 0) continue;
    }

    // O array novasPessoas agora guarda todas as pessoas com o termo específico
    // que foram inseridas com 201. Vamos buscar pelo termo específico e esperar
    // pelo menos essa quantidade de respostas.
    var res4 = buscarPorTermo(termo4);
    if (httpCount(res4) && (0,external_k6_namespaceObject.check)(res4, {
      "Status 200": function Status200() {
        return res4.status == 200;
      },
      "Contém body que é string": function ContémBodyQueÉString() {
        return typeof res4.body === "string";
      }
    })) {
      var res4Json = res4.json();
      if (validarBuscaPorTermo(termo4, res4Json, novasPessoas.length)) {
        // Também vamos adicionar umas buscas por id aqui. Isso serve para duas
        // coisas: aumentar um pouco a quantidade de buscas por id para ser
        // mais ou menos o mesmo que as outras requests, e também para ver se
        // o server não está trazendo resultados inventados. Teoricamente também
        // poderíamos fazer isso para todos os resultados de todas as buscas
        // para ter ainda mais certeza.

        // Este cast é seguro aqui por causa da chamada que valida a busca
        // por termo.
        var list = res4Json;
        var _iterator = main_test_createForOfIteratorHelper(list),
          _step;
        try {
          var _loop9 = function _loop9() {
              var pessoa = _step.value;
              var res = buscarPessoa(pessoa.id);
              if (!httpCount(res) || !(0,external_k6_namespaceObject.check)(res, {
                "Status 200": function Status200() {
                  return res.status == 200;
                }
              })) {
                return 0; // continue
              }
              if (!(0,external_k6_namespaceObject.check)(res, {
                "Contém body que é string": function ContémBodyQueÉString() {
                  return typeof res.body === "string";
                }
              })) {
                return 0; // continue
              }

              // Agora vamos comparar os dados trazidos pelo endpoint com os dados
              // que vieram na lista quando fizemos a busca por termo.

              validarPessoa(pessoa, res.json());
            },
            _ret4;
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            _ret4 = _loop9();
            if (_ret4 === 0) continue;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
    (0,external_k6_namespaceObject.sleep)(1);
  });

  // Não estamos chamando o endpoint de contagem de pessoas, pois as regras
  // especificam que o endpoint de contagem não é considerado nos testes de
  // performance, apenas para contar a quantidade de registros que foram
  // inseridos no banco.
});
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main-test.js.map