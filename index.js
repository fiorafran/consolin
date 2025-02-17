import Openai from "openai";
import readline from "readline";

const client = new Openai({
  apiKey: process.env.APIKEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages = [
  {
    role: "system",
    content: `Eres Odin, el primer asistente virtual creado por Fiora. Tu personalidad es profesional, amistoso y carismatico. 
      - Siempre debes informar al usuario, no puedes dejar al usuario esperando sin enviarle un mensaje o avisarle que estas trabajando en resolver su consulta.
      - Siempre que te despidas del usuario, o si el usuario quiere terminar la sesion o se despide, utiliza la funcion 'terminar_sesion'.
      - No informes el uso de herramientas al usuario eso ensucia el chat.`,
  },
];

const callFunctions = (fn, args) => {
  const mapperFunctions = {
    terminar_sesion: () => true,
    obtener_clima: (args) => {
      const parseArgs = JSON.parse(args);

      // Simulando obtener clima desde una API
      return `\n🤖 Bot: El clima de ${parseArgs.ciudad} es ${
        Math.floor(Math.random() * 100) - 50
      } °C`;
    },
  };

  return mapperFunctions[fn](args) || true;
};
const tools = [
  {
    type: "function",
    function: {
      name: "terminar_sesion",
      description:
        "Siempre debes Utilizar esta herramienta cuando te despidas del usuario o detectes que necesites terminar el chat, sesion o conversacion con el usuario",
    },
    parameters: {},
  },
  {
    type: "function",
    function: {
      name: "obtener_clima",
      description: "Obtiene el clima actual de una ciudad",
      parameters: {
        type: "object",
        properties: {
          ciudad: {
            type: "string",
            description: "Nombre de la ciudad",
          },
        },
        required: ["ciudad"],
      },
    },
  },
];

const sendMessage = async (userInput) => {
  messages.push({ role: "user", content: userInput });

  try {
    const res = await client.chat.completions.create({
      messages,
      model: process.env.MODEL,
      tools: tools,
      temperature: 0.3,
      tool_choice: "auto",
    });

    if (res.error) throw new Error(`❌ ${res.error.message}`);

    const roleAndMsg = res.choices[0].message;
    const replyBot = res.choices[0].message.content;

    if (replyBot) console.log("\n🤖 Bot:", replyBot);

    messages.push(roleAndMsg);

    if (res.choices[0].message.tool_calls) {
      const { name = "", arguments: args = "" } =
        res.choices[0].message.tool_calls[0].function;

      const responseFn = callFunctions(name, args);

      if (typeof responseFn === "string") {
        console.log(responseFn);
      }

      if (typeof responseFn === "boolean") return true;
    }
  } catch (e) {
    console.error("❌ Error en la API:", e.message);
  }
};

const chat = () => {
  rl.question(">> ", async (userInput) => {
    const exit = await sendMessage(userInput);
    if (exit) {
      console.log("\n🤖 Bot: ¡Hasta luego! Vuelve pronto! 👋😊");
      rl.close();
      return;
    }
    chat();
  });
  return;
};

console.log("Bienvenido al asistente 😊. Escribe tu consulta para comenzar...");

chat();
