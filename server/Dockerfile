# Base image
FROM python:3.12-slim

# Cria o diretório de trabalho
WORKDIR /app

# Copie o arquivo requirements.txt para o contêiner
COPY requirements.txt /app/requirements.txt

# Instala as dependências
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copie o restante do código da aplicação para o contêiner
COPY . /app/

# Expõe a porta 8080
EXPOSE 8080

# Comando para rodar o servidor
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]
