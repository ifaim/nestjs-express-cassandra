export type CassandraType =
  | 'int'
  | 'boolean'
  | 'text'
  | 'varchar'
  | 'uuid'
  | 'timeuuid'
  | 'timestamp'
  | 'date'
  | 'map'
  | 'set'
  | 'list'
  | 'double'
  | 'float'
  | 'decimal'
  | 'smallint'
  | 'bigint'
  | 'tinyint'
  | 'varint'
  | 'ascii'
  | 'counter'
  | 'inet'
  | 'time'
  | 'tuple'
  | 'frozen'
  | 'blob';

export type WithWidthColumnType = 'int' | 'smallint' | 'bigint' | 'tinyint' | 'varint';

export type ModelColumnType =
  | 'bigint'
  | 'blob'
  | 'counter'
  | 'date'
  | 'decimal'
  | 'inet'
  | 'time'
  | 'timeuuid'
  | 'tuple'
  | 'uuid'
  | 'varint';

export type ColumnType = CassandraType | WithWidthColumnType | ModelColumnType;

export enum DataType {
  Map = 'map',
  List = 'list',
  Set = 'set',
  Frozen = 'frozen',
  Number = 'int',
  Text = 'text',
  Boolean = 'boolean',
  Varchar = 'varchar',
  Uuid = 'uuid',
  Timeuuid = 'timeuuid',
  Timestamp = 'timestamp',
  Date = 'date',
  Double = 'double',
  Float = 'float',
  Decimal = 'decimal',
  SmallInt = 'smallint',
  BigInt = 'bigint',
  TinyInt = 'tinyint',
  VarInt = 'varint',
  Counter = 'counter',
  Inet = 'inet',
  Time = 'time',
  Tuple = 'tuple',
  Blob = 'blob',
}
