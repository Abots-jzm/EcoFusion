export type CreateStorePayload = {
  name: string;
  ownerId: string;
};

export type EditStorePayload = {
  name: string;
  userId: string;
  storeId: string;
};

export type DeleteStorePayload = Omit<EditStorePayload, "name">;
