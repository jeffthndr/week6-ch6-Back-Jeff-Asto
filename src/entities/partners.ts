export type PartnerWithId = {
  id: string;
};

export type PartnerNoId = {
  name: string;
  hobbie: string;
  gender: string;
  age: string;
};

export type Partner = PartnerWithId & PartnerNoId;
