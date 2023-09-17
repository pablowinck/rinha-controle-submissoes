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
  return seedPacket.r1.toPrecision(32).toString().replace("0.", "").substring(0, 32);
}

/**
 * Cria um nome aleatório.
 * @param seedPacket Fonte de números aleatórios
 * @returns Uma string de no máximo 100 caracteres que varia dependendo do
 * seed packet. Pode ou não ter a aparência de um nome real.
 */
function gerarNome(seedPacket) {
  // TODO: Usar listas de nomes para gerar strings que realmente pareçam nomes,
  // incluindo nomes com letras de idiomas variados.
  var randomElement = seedPacket.r2.toPrecision(10).toString().replace("0.", "");
  return "Mr. " + randomElement;
}

/**
 * Cria uma data aleatória no formato YYYY-MM-DD entre 1950-01-01 e 2005-01-01.
 * A função garante que a data existe no calendário gregoriano.
 *
 * Note que outras partes do código deverão testar datas fora do range descrito,
 * mas as datas geradas desta maneira sempre estarão dentro do range.
 * @param seedPacket Fonte de números aleatórios
 * @returns Data aleatória no formato YYYY-MM-DD.
 */
function gerarNascimento(seedPacket) {
  // Gerando número aleatório entre 1950 e 2005
  var yyyy = Math.floor(seedPacket.r1 * (2005 - 1950 + 1) + 1950);
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
      nome: 6,
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
      apelido: 12,
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
      nascimento: 2,
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
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: ["C#", null]
    },
    httpEsperado: 422,
    explicacao: "Stack com null"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: ["Pascal", ""]
    },
    httpEsperado: 201,
    explicacao: "Stack com string vazia"
  };
}, function (s) {
  return {
    pessoa: {
      apelido: gerarApelido(s),
      nome: gerarNome(s),
      nascimento: gerarNascimento(s),
      stack: ["C#", 25]
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

/**
 * Gera uma nova pessoa que pode ou não ter algum erro, junto com código HTTP
 * esperado para esta pessoa. Estes objetos são escolhidos de uma lista fixa.
 *
 * O conteúdo do objeto gerado usa o parâmetro seed para derivar os itens que
 * variam. Normalmente faz mais sentido deixar este parâmetro vazio, mas você
 * pode especificar o mesmo seed se precisar da mesma pessoa.
 * @param seed: Fonte de informação aleatória usada para escolher a pessoa com
 * erro.
 * @returns Uma pessoa e o código http esperado.
 */
function gerarPessoaCasoFixo(seed) {
  var s = seed !== null && seed !== void 0 ? seed : newSeedPacket();

  // Ponto aberto para pensar: como esses casos são fixos, é melhor usar um
  // índice que incrementa para devolver todos os casos em ordem?
  var randIndex = Math.floor(s.r1 * 1e7 % geradoresCasosFixos.length);
  return geradoresCasosFixos[randIndex](s);
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
  return http_default().get("".concat(HOST, "/pessoas?t=").concat(encodeURI(t)));
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
function validarTipagemPessoa(actual) {
  return (0,external_k6_namespaceObject.check)(actual, {
    "Pessoa é objeto": function PessoaÉObjeto() {
      return validar_pessoa_typeof(actual) === "object";
    },
    "Pessoa tem id string": function PessoaTemIdString() {
      return typeof actual.id === "string";
    },
    "Pessoa tem apelido string": function PessoaTemApelidoString() {
      return typeof actual.apelido === "string";
    },
    "Pessoa tem nascimento string": function PessoaTemNascimentoString() {
      return typeof actual.nascimento === "string";
    },
    "Pessoa tem stack array ou null": function PessoaTemStackArrayOuNull() {
      return Array.isArray(actual.stack) || actual.stack === null;
    }
  });
}
function compararStack(expected, actual) {
  // Se ambos forem arrays:
  if (Array.isArray(expected === null || expected === void 0 ? void 0 : expected.filter(function (stack) {
    return !!stack;
  })) && Array.isArray(actual)) {
    // Comparamos item por item
    if (!expected) return true;
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
;// CONCATENATED MODULE: ./src/main-test.ts
function main_test_typeof(o) { "@babel/helpers - typeof"; return main_test_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, main_test_typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { main_test_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function main_test_defineProperty(obj, key, value) { key = main_test_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function main_test_toPropertyKey(arg) { var key = main_test_toPrimitive(arg, "string"); return main_test_typeof(key) === "symbol" ? key : String(key); }
function main_test_toPrimitive(input, hint) { if (main_test_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (main_test_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var options = {
  stages: [
  // load
  {
    duration: "20s",
    target: 100
  }]
};
/* harmony default export */ const main_test = (function () {
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
      if (!(0,external_k6_namespaceObject.check)(res, {
        "Status 201 para pessoa criada": function Status201ParaPessoaCriada() {
          return res.status === 201;
        }
      })) {
        // Pode dar console.log aqui se for necessário debugar seu server
        return 0; // continue
      }
      if (!(0,external_k6_namespaceObject.check)(res, {
        "Header Location retornado com valor correto": function HeaderLocationRetornadoComValorCorreto() {
          return !!res.headers["Location"] && res.headers["Location"].startsWith("/pessoas/");
        }
      })) {
        return 0; // continue
      }
      // Extraímos o id do header Location, que o único lugar da response onde é
      // obrigatório ele existir no caso de 201.

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
    var explicacao = "Status ".concat(pessoaCasoFixo.httpEsperado, ", ").concat((_pessoaCasoFixo$expli = pessoaCasoFixo.explicacao) !== null && _pessoaCasoFixo$expli !== void 0 ? _pessoaCasoFixo$expli : "pessoa com erro");
    (0,external_k6_namespaceObject.check)(res, main_test_defineProperty({}, explicacao, function () {
      return res.status == pessoaCasoFixo.httpEsperado;
    }));
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
      if (!(0,external_k6_namespaceObject.check)(res, {
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

  // Quarta etapa: Vamos buscar por termos que sabemos que existem no banco.
  // Vamos usar os 4 primeiros caracteres do nome da pessoa que cadastramos, e
  // o terceiro caracter em caixa alta
  var _loop4 = function _loop4() {
      var _novasPessoas2$_i = _slicedToArray(_novasPessoas2[_i2], 2);
      idPessoaCriada = _novasPessoas2$_i[0];
      pessoaCriada = _novasPessoas2$_i[1];
      var res = buscarPorTermo("".concat(pessoaCriada.nome.substring(0, 2)).concat(pessoaCriada.nome.substring(2, 3).toUpperCase()).concat(pessoaCriada.nome.substring(3, 4)));
      if (!(0,external_k6_namespaceObject.check)(res, {
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

      //TODO: verificar se o termo esta presente na resposta
      JSON.parse(res.body).forEach(validarTipagemPessoa);
    },
    idPessoaCriada,
    pessoaCriada,
    _ret3;
  for (var _i2 = 0, _novasPessoas2 = novasPessoas; _i2 < _novasPessoas2.length; _i2++) {
    _ret3 = _loop4();
    if (_ret3 === 0) continue;
  }

  // Quinta etapa: Vamos buscar por termos que sabemos que não existem no banco.
  var res = buscarPorTermo("termo que não existe no banco");
  (0,external_k6_namespaceObject.check)(res, {
    "Status 200": function Status200() {
      return res.status == 200;
    },
    "Contém body que é string": function ContémBodyQueÉString() {
      return typeof res.body === "string";
    },
    "Body é array vazio": function BodyÉArrayVazio() {
      return JSON.parse(res.body).length === 0;
    }
  });
  (0,external_k6_namespaceObject.sleep)(1);
});
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=index.js.map