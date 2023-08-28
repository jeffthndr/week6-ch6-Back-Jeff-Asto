import createDebug from 'debug';
import { readFile, writeFile } from 'fs/promises';
import { Character, CharacterNoId } from '../entities/character.js';
import { HttpError } from '../types/http.error.js';
import { Repository } from './repository.js';
const debug = createDebug('W6CH6:Repo:CharactersFsRepo');

export class CharactersFsRepository implements Repository<Character> {
  private file: string;
  constructor() {
    this.file = 'data.json';
    debug('Instantiated');
  }

  async getAll(): Promise<Character[]> {
    const data: Character[] = JSON.parse(
      await readFile(this.file, { encoding: 'utf-8' })
    );
    return data;
  }

  async getById(id: Character['id']): Promise<Character> {
    const data: Character[] = await this.getAll();
    const item = data.find((item) => item.id === id);
    if (!item)
      throw new HttpError(
        404,
        'Not Found',
        'Character not found in file system',
        {
          cause: 'Trying getById',
        }
      );
    return item;
  }

  async create(newData: CharacterNoId): Promise<Character> {
    const newCharacter: Character = { ...newData, id: crypto.randomUUID() };
    const data: Character[] = await this.getAll();
    data.push(newCharacter);
    await this.saveOnFile(data);
    return newCharacter;
  }

  async update(
    id: Character['id'],
    item: Partial<Character>
  ): Promise<Character> {
    const data: Character[] = await this.getAll();
    const index = data.findIndex((item) => item.id === id);
    if (index < 0)
      throw new HttpError(
        404,
        'Not Found',
        'Character not found in file system',
        {
          cause: 'Trying update',
        }
      );
    data[index] = { ...data[index], ...item };
    await this.saveOnFile(data);
    return data[index];
  }

  async delete(id: Character['id']): Promise<void> {
    const data: Character[] = await this.getAll();
    const index = data.findIndex((item) => item.id === id);
    if (index < 0)
      throw new HttpError(
        404,
        'Not Found',
        'Character not found in file system',
        {
          cause: 'Trying delete',
        }
      );
    data.splice(index, 1);
    await this.saveOnFile(data);
  }

  private async saveOnFile(data: Character[]) {
    await writeFile(this.file, JSON.stringify(data), {
      encoding: 'utf-8',
    });
  }
}
