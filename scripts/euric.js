import * as webllm from "https://esm.run/@mlc-ai/web-llm";

async function transformEuricContent() {
    // Inicializar el modelo de lenguaje (ejemplo usando web-llm)
   // const model = await webllm.loadModel('Llama-3-8B-Instruct-q4f32_1');

    
   console.log(webllm);
    const initProgressCallback = (initProgress) => {
        console.log(initProgress);
    }
    const selectedModel = "Llama-3-8B-Instruct-q4f32_1-MLC";
    //const selectedModel = "Mistral-7B-Instruct-v0.3";
    const engine = await webllm.CreateMLCEngine(
        selectedModel,
        { initProgressCallback: initProgressCallback }, // engineConfig
    );
    console.log(engine);

    // Seleccionar todas las etiquetas Euric
    const euricTags = document.querySelectorAll('Euric');
      
    for (const tag of euricTags) {
        const originalText = tag.innerText;
        const messages = [
            { role: "system", content: "Actua como una persona conspiranoica, con los siguientes cesgos: "+  
                        " tienes complejo de victimizacion y persecución por ser cristiano\n"+
                        " crees que todo es un plan para fusionar Haití con Republica Dominicana.\n" + 
                        " asumes que si hay una mujer victima de algo, ella está mintiendo" },
            { role: "user", content: "Interpreta este texto en un tweet de 254 caracteres:\n" + originalText },
          ]
        const transformedText = await engine.chat.completions.create({
            messages,
          });
        console.log(transformedText.choices[0].message.content);
        console.log(transformedText.usage);

        tag.innerText = transformedText.choices[0].message.content;
    }
}

// Ejecutar la transformación después de que el contenido de la página se haya cargado
window.addEventListener('DOMContentLoaded', transformEuricContent);