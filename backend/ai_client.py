import openai

class AIClient:
    def __init__(self, api_key: str | None, model: str = "gpt-3.5-turbo"):
        self.model = model
        self.api_key = api_key
        if api_key:
            openai.api_key = api_key

    def chat(self, message: str) -> str:
        # If no API key is configured, return a placeholder message that the user must configure keys
        if not self.api_key:
            return "No AI API key configured. Set OPENAI_API_KEY in backend/.env or implement Ollama client."
        resp = openai.ChatCompletion.create(
            model=self.model,
            messages=[{"role": "user", "content": message}],
            temperature=0.7,
            max_tokens=512,
        )
        return resp.choices[0].message.content.strip()
