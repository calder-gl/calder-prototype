/**
 * Calder - A WebGL library for writing WebGL shaders
 *
 * Copyright (c) 2017 Paul Bardea, Abhishek Madan, Andrew McBurney, Dave Pagurek
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

export { default as SyntaxNode } from './syntaxnode';

/*****************************
 * Expressions
 *****************************/

export { default as Expression } from './expressions/expression';

// Assignment Expressions
export { default as EqualAssignment } from './expressions/assignment/equal_assignment';
export { default as PlusEqualAssignment } from './expressions/assignment/plus_equal_assignment';
export { default as MinusEqualAssignment } from './expressions/assignment/minus_equal_assignment';
export { default as TimesEqualAssignment } from './expressions/assignment/times_equal_assignment';
export { default as DivideEqualAssignment } from './expressions/assignment/divide_equal_assignment';

// Boolean Expressions
export { default as AndExpression } from './expressions/boolean/and_expression';
export { default as OrExpression } from './expressions/boolean/or_expression';
export { default as EqualExpression } from './expressions/boolean/equal_expression';
export { default as NotEqualExpression } from './expressions/boolean/not_equal_expression';
export { default as XorExpression } from './expressions/boolean/xor_expression';
export { default as LessThanExpression } from './expressions/boolean/less_than_expression';
export { default as LessThanEqualExpression } from './expressions/boolean/less_than_equal_expression';
export { default as GreaterThanExpression } from './expressions/boolean/greater_than_expression';
export { default as GreaterThanEqualExpression } from './expressions/boolean/greater_than_equal_expression';

// Unary Math Expressions
export { default as PrefixIncrement } from './expressions/math/unary/prefix_increment';
export { default as PrefixDecrement } from './expressions/math/unary/prefix_decrement';
export { default as PostfixIncrement } from './expressions/math/unary/postfix_increment';
export { default as PostfixDecrement } from './expressions/math/unary/postfix_decrement';

// Infix Math Expressions
export { default as Addition } from './expressions/math/infix/addition';
export { default as Subtraction } from './expressions/math/infix/subtraction';
export { default as Multiplication } from './expressions/math/infix/multiplication';
export { default as Division } from './expressions/math/infix/division';
export { default as Modulo } from './expressions/math/infix/modulo';

// Other Expressions
export { default as Comma } from './expressions/other/comma';

/*****************************
 * Exceptions
 *****************************/

export { default as TypeException } from './exceptions/typeexception';

/*****************************
 * Other
 *****************************/

export { default as Statement } from './statement';
export { default as ReturnStatement } from './return_statement';
export { default as Function } from './function';
export { default as Reference } from './reference';
export { default as VariableDeclaration } from './variabledeclaration';
export { default as Shader } from './shader';
export { default as Qualifier } from './qualifier';
export { default as Type } from './type';
export { default as MetaKind } from './metakind';
export { default as Kind } from './kind';
export { default as If } from './if'
export { default as Block } from './block'
export { default as While } from './while'
export { default as DoWhile } from './dowhile'
export { default as DeclareStruct } from './declarestruct'
export { default as ShaderPipelineBuilder } from './shaderpipelinebuilder';
export { default as ShaderPipeline } from './shaderpipeline';

export { default as VariableSource } from './variablesource';
export { default as Variable } from './variable';
export { default as InterfaceVariable } from './interfacevariable';
export { default as LocalVariable } from './localvariable';
