from flask import Flask, jsonify
from flask_cors import CORS
import requests
import datetime

# Configuración inicial
app = Flask(__name__)
# Habilitamos CORS para permitir peticiones desde nuestro frontend
CORS(app)

# Definimos la ruta de nuestra API
@app.route('/api/time/<path:timezone>')
def get_time(timezone):
    # URL de la API externa
    api_url = f"http://worldtimeapi.org/api/timezone/{timezone}"
    print(f"Intentando conectar a: {api_url}") # Log para depuración
    try:
        # Añadimos un timeout de 10 segundos a la petición
        response = requests.get(api_url, timeout=10)
        response.raise_for_status()  # Lanza un error si la petición no fue exitosa (ej. 404)
        data = response.json()
        # Formateamos la fecha y hora para que sea más legible
        current_time = datetime.datetime.fromisoformat(data['datetime'])
        formatted_time = current_time.strftime('%H:%M:%S de %d-%m-%Y')
        return jsonify({"timezone": data['timezone'], "time": formatted_time})
    except requests.exceptions.RequestException as e:
        print(f"ERRO de rede: {e}") # Log do erro específico
        # Manejo de errores (ej. timezone no encontrada o fallo de red)
        return jsonify({"error": f"Não foi possível obter a hora para {timezone}. Detalhes: {e}"}), 404