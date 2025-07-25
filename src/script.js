document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('timezone-select');
    const display = document.getElementById('time-display');
    const loader = document.getElementById('loader');
    const localTimeDisplay = document.getElementById('local-time-display');

    // Função para exibir o botão de "Tentar novamente"
    const displayRetryButton = (message) => {
        display.innerHTML = `
            <span>${message}</span>
            <button id="retry-button">Tentar novamente</button>
        `;
        // Adiciona o evento de clique ao novo botão para chamar a função getTime novamente
        document.getElementById('retry-button').addEventListener('click', getTime);
    };

    // Función para obtener la hora de la API
    const getTime = async () => {
        const startTime = Date.now();
        const minLoadingTime = 3000; // 3 segundos de delay mínimo

        const selectedTimezone = select.value;
        // Mostra a animação e oculta o texto de resultado
        loader.classList.remove('hidden');
        display.classList.add('hidden');

        try {
            // Hacemos la petición a nuestro backend. Docker Compose mapeará este puerto.
            const response = await fetch(`http://localhost:5001/api/time/${selectedTimezone}`);
            const data = await response.json();

            if (response.ok) {
                display.textContent = `Em ${data.timezone}, são: ${data.time}`;
            } else {
                console.error('API Error:', data.error);
                displayRetryButton('Falha ao obter a hora.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            displayRetryButton('Erro de conexão.');
        } finally {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = minLoadingTime - elapsedTime;

            setTimeout(() => {
                // Garante que a animação seja sempre ocultada e o resultado mostrado
                loader.classList.add('hidden');
                display.classList.remove('hidden');
            }, remainingTime > 0 ? remainingTime : 0);
        }
    }

    const updateLocalTime = () => {
        const now = new Date();
        const localTime = now.toLocaleTimeString('pt-BR');
        localTimeDisplay.textContent = `Hora local: ${localTime}`;
    };

    const createFooter = () => {
        const footerElement = document.getElementById('page-footer');
        if (footerElement) {
            const fullName = "Richard Anthony Gomez Arcos";
            footerElement.innerHTML = `<p><i>${fullName}</i></p>`;
        }
    };

    // Llama a la función cuando cambia la selección
    select.addEventListener('change', getTime);

    setInterval(updateLocalTime, 1000);

    updateLocalTime();

    createFooter();

    // Llama una vez al cargar la página para la opción por defecto
    getTime();
});
