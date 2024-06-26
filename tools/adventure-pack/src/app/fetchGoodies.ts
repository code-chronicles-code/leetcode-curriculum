export type Goody = {
  code: string;
  imports: string[];
  name: string;
};

export async function fetchGoodies(): Promise<Record<string, Goody>> {
  const response = await fetch("goodies.json");

  if (!response.ok) {
    throw new Error(`Got status ${response.status} from server!`);
  }

  return await response.json();
}
