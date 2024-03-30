/*
	<Simples interpretador de uma linguagem de 
	programação própria criado em javascript puro.

	Criado com o intuito de treinar e me acostumar
	com javascript, visto que minha linguagem de 
	programação principal era python.

	Este interpretador foi criado para fins de estudo,
	servindo como exemplo de como funciona a arquitetura
	de uma linguagem de programação de uma forma simples.>

    Copyright (C) <2024> <Luiz Gabriel Magalhães Trindade.>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const fs 		= require("fs");
const file 		= process.argv[2];
var   content 	= [];
var   variables	= {};

/*
	Função criada para a leitura do código
	fonte. O código fonte é lido e armazenado
	em "content".
*/
function readFile(){
	fs.readFile(file, "utf-8", (err, data) => {
		if (err){
			console.log("Erro ao ler o arquivo!");
			return;
		}

		else{
			content = data.trim().split("\n");
			interpreterFile();
		}
	})
}


/*
	Função que interpretará cada comando e onde
	a lógica de cada comando está implementada.
*/
function interpreterFile(){
	var counter = 0;
	var size = content.length-1;

	while (counter <= size){
		let line = content[counter].split(" ");
		let command = line[0];
		//console.log(line);

		//	Escreve um texto na tela.
		if (command == "echo"){
			let contentToWrite = line.slice(1).join(" ");
			for (let char of contentToWrite){
				process.stdout.write(String(char));
			}
		}

		//	Resolve expressẽs matemáticas e exibe o valor na tela.
		else if (command == "math"){
			let expression = line.slice(1).join(" ");
			console.log(eval(expression));
		}

		//	Vai para uma determinada linha.
		else if (command == "goto"){
			let lineToGo = line[1]-1;
			counter = lineToGo;
			continue;
		}

		//	Cria variáveis do tipo text ou number.
		else if (command == "var"){
			if (line[2] in variables){
				/*
					Se a variável já existir, ela é deletada
					e re-assinada.
				*/
				delete variables[line[2]];
				let varType = line[1];
				let varName = line[2];
				var varContent;
				if (varType == "text"){
					var varContent = line.slice(3).join(" ");	
				}
				else if (varType == "number"){
					var varContent = parseFloat(line.slice(3));
				}
				variables[varName] = varContent;
			}

			//	Se a variável ainda não foi criada, será criada.
			else {
				let varType = line[1];
				let varName = line[2];
				var varContent;
				if (varType == "text"){
					var varContent = line.slice(3).join(" ");	
				}
				else if (varType == "number"){
					var varContent = parseFloat(line.slice(3));
				}
				variables[varName] = varContent;
			}
		}

		// Vê o conteúdo de uma variável.
		else if (command == "see"){
			let varToSee = line[1];
			process.stdout.write(String(variables[varToSee]));
		}

		counter += 1;
	}
}

/*
	Função principal que chamará a função
	de leitura do código fonte e iniciará
	o fluxo de execução.
*/
function main(){
	readFile();
}
main();
