type NodeType =
    | 'Program'
    | 'NumberLiteral'
    | 'StringLiteral'
    | 'BooleanLiteral'
    | 'Identifier'
    | 'BinaryExpression'
    | 'AssignExpression'
    | 'NullLiteral';

export abstract class Statement {
    declare kind: NodeType;
}