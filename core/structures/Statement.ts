type NodeType =
    | 'Program'
    | 'NumberLiteral'
    | 'Identifier'
    | 'BinaryExpression'
    | 'NullLiteral';

export abstract class Statement {
    declare kind: NodeType;
}