import { ColumnType, DataType } from './data.type';
export interface ColumnOptions {
    type?: ColumnType | DataType;
    typeDef?: string;
    default?: string | (() => any) | Function | {
        $db_function: string;
    };
    virtual?: {
        get?: any;
        set?: any;
    };
    rule?: ColumnRuleOptions | ((value: any) => boolean);
    static?: boolean;
}
export interface ColumnRuleOptions {
    validator?: (value: any) => boolean;
    validators?: any[];
    message?: string | ((value: any) => string);
    ignore_default?: boolean;
    required?: boolean;
}
