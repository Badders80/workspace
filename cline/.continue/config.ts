export function modifyConfig(config: Config): Config {
  return {
    ...config,
    models: [
      {
        title: "deepseek-v4-flash-cloud",
        provider: "ollama",
        model: "deepseek-v4-flash:cloud",
        apiBase: "http://127.0.0.1:11434",
      },
      {
        title: "deepseek-v4-flash-vision-cloud",
        provider: "ollama",
        model: "deepseek-v4-flash:cloud",
        apiBase: "http://127.0.0.1:11434",
      },
      {
        title: "deepseek-v4-pro-cloud",
        provider: "ollama",
        model: "deepseek-v4-pro:cloud",
        apiBase: "http://127.0.0.1:11434",
      },
      {
        title: "glm-5.1-cloud",
        provider: "ollama",
        model: "glm-5.1:cloud",
        apiBase: "http://127.0.0.1:11434",
      },
      {
        title: "minimax-m2.7-cloud",
        provider: "ollama",
        model: "minimax-m2.7:cloud",
        apiBase: "http://127.0.0.1:11434",
      },
      {
        title: "gemma4-31b-cloud",
        provider: "ollama",
        model: "gemma4:31b-cloud",
        apiBase: "http://127.0.0.1:11434",
      },
    ],
    defaultModel: {
      title: "deepseek-v4-flash-cloud",
      provider: "ollama",
      model: "deepseek-v4-flash:cloud",
      apiBase: "http://127.0.0.1:11434",
    },
  };
}
