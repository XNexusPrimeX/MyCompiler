type NodeType =
    | 'Program'
    | 'NumberLiteral'
    | 'StringLiteral'
    | 'BooleanLiteral'
    | 'Identifier'
    | 'BinaryExpression'
    | 'NullLiteral';

export abstract class Statement {
    declare kind: NodeType;
}