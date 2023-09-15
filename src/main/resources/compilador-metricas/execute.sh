#!/bin/bash

#PATH=/home/pablo/projects/rinha-controle-submissoes/target/classes/compilador-metricas

k6 run /home/pablo/projects/rinha-controle-submissoes/target/classes/compilador-metricas/index.js --summary-export=/home/pablo/projects/rinha-controle-submissoes/target/classes/compilador-metricas/summary.json
#sleep 5
node /home/pablo/projects/rinha-controle-submissoes/target/classes/compilador-metricas/compilar-nota.js /home/pablo/projects/rinha-controle-submissoes/target/classes/compilador-metricas/summary.json /home/pablo/projects/rinha-controle-submissoes/target/classes/compilador-metricas/score.json