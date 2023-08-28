export type CharacterWithId = {
  id: string;
};

export type CharacterNoId = {
  name: string;
  nationality: string;
  titles: string;
  age: string;
  img: string;
};

export type Character = CharacterWithId & CharacterNoId;
