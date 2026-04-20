export class GenerationError extends Error {
  constructor(
    message: string, 
    public model?: string, 
    public originalError?: any
  ) {
    super(message);
    this.name = "GenerationError";
  }
}

export function handleGenerationError(error: any, model: string) {
  const message = error?.message || "Unknown error during artifact generation.";
  console.warn(`[ENGINE] ${model} failed: ${message}`);
  return new GenerationError(message, model, error);
}