# Usamos una imagen oficial de Python ligera
FROM python:3.9-slim

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo de requerimientos e instalamos las dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el resto del código de la aplicación
COPY . .

# Comando para ejecutar la aplicación Flask cuando el contenedor inicie
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]