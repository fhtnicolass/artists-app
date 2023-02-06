# Comandos

python -m venv env //criar o ambiente virtual (se necessário recriar o ambiente, apagar a pasta env e rodar novamente o comando) 

ativar o ambiente virtual: 

Windows:

cd env/Scripts
.\activate 

Linux:

source env/bin/activate

Volte para a pasta api e rode o seguinte comando:

pip install -r requirements.txt

Se tudo estiver ok, inicie a api utilizando o uvicorn com o seguinte código na pasta "api"

uvicorn users:app


Para pegar o estado atual das importações e colocar em um arquivo txt:

pip freeze > requirements.txt

