export interface EntityOptions<T = any> {
  table_name?: string;
  key?: Array<keyof T | Array<keyof T>>;
  materialized_views?: { [index: string]: MaterializeViewStatic<T> };
  clustering_order?: Partial<{ [P in keyof T]: 'desc' | 'asc' }>;
  options?: EntityExtraOptions;
  indexes?: Array<keyof T> | string[];
  custom_indexes?: Partial<CustomIndexOptions>[];
  methods?: { [index: string]: Function };
  es_index_mapping?: {
    discover?: string;
    properties?: EsIndexPropertiesOptionsStatic<T>;
  };
  graph_mapping?: Partial<
    GraphMappingOptionsStatic<T | { [index: string]: any }>
  >;
  [index: string]: any;
}

export type ClusterOrder<T> = Partial<{ [P in keyof T]: 'desc' | 'asc' }>;

export interface MaterializeViewStatic<T> {
  select: Array<keyof T>;
  key: Array<keyof T | Array<keyof T>>;
  clustering_order?: ClusterOrder<T>;
  filter?: FilterOptions<T>;
}

export interface EntityExtraOptions {
  timestamps?: {
    createdAt?: string;
    updatedAt?: string;
  };
  versions?: { key: string };
}

type FilterOptions<T> = Partial<{ [P in keyof T]: FilterOptionsStatic<T> }>;

interface FilterOptionsStatic<T> {
  $gte?: any;
}

interface CustomIndexOptions {
  on: string;
  using: any;
  options: any;
}

type EsIndexPropertiesOptionsStatic<T> = {
  [P in keyof T]?: { type?: string; index?: string }
};

interface GraphMappingOptionsStatic<Entity = any> {
  relations: {
    follow?: 'MULTI' | 'SIMPLE' | 'MANY2ONE' | 'ONE2MANY' | 'ONE2ONE';
    mother?: 'MULTI' | 'SIMPLE' | 'MANY2ONE' | 'ONE2MANY' | 'ONE2ONE';
  };
  properties: {
    [index: string]: {
      type?: JanusGraphDataTypes;
      cardinality?: 'SINGLE' | 'LIST' | 'SET';
    };
  };
  indexes: {
    [index: string]: {
      type?: 'Composite' | 'Mixed' | 'VertexCentric';
      keys?: Array<keyof Entity | {}>;
      label?: 'follow';
      direction?: 'BOTH' | 'IN' | 'OUT';
      order?: 'incr' | 'decr';
      unique?: boolean;
    };
  };
}

type JanusGraphDataTypes =
  | 'Integer'
  | 'String'
  | 'Character'
  | 'Boolean'
  | 'Byte'
  | 'Short'
  | 'Long'
  | 'Float'
  | 'Double'
  | 'Date'
  | 'Geoshape'
  | 'UUID';
