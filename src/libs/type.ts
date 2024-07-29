type Bindings = {
  token: string;
};

type Variables = {
  user: {
    id: string;
  };
};

export type Hono = {
  Bindings: Bindings;
  Variables: Variables;
};
