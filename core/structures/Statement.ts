type NodeType =
    | 'Program'
    | 'NumberLiteral'
    | 'BooleanLiteral'
    | 'Identifier'
    | 'BinaryExpression'
    | 'NullLiteral';

export abstract class Statement {
    declare kind: NodeType;
}