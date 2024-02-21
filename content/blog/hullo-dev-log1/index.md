---
title: "Hullo Programming Language - Dev Log 1"
date: "2024-02-21T08:07:10.300Z"
description: "I'm currently building my own interpreted programming language with Go. This is the start of many dev logs."
---

## Background
I came across this book called [Writing an Interpreter in Go](https://interpreterbook.com/), which essentially is a long tutorial 
for writing an interpreted programming language in Golang.

I've always wanted to write a programming language, and I've always wanted to learn Go. I thought this would be a fun
thing to do in the morning before my work day starts. I also thought this would be a good time for me to get
back into writing. I've been having terrible writer's block since my article last year, as I feel everything
that I write is not of much worth and I'm riddled with low self esteem.

So here we are. Don't think too much just write about what you did (yes I'm talking to myself).

## Interpreter

Let's get to building the `hullo` programming language.

### Language Features

The objective for me is to write a simple interpreted language in my own syntax that has all the basics of a C-type
programming language. This language will have the following features:
- `{ }`  to start and end a code block
- `if`, `else` conditionals
- `for` loop
- `fn` function definitions and ability to call those definitions
- `=` to assign
- `;` to end statements
- `+`, `-`, `/`, `*`, `<`, `>`, `!`, `==`, `!=` operators for arithmatic and comparison
- `return` in order to exit functions

Limitations:
- All variables and keywords be in ASCII
- No floats (at least for now)

## Basic Structure of an Interpreter

According to Wikipedia:
> An interpreter is a computer program that directly executes instructions written in a programming or scripting 
> language, without requiring them previously to have been compiled into a machine language program.

This is an apt description. The objective for an interpreter is to build a program that will take source code, make
sense of it and then execute it. We would basically have to tokenize the code, and then create an abstract syntax tree
that we can execute.

```
Source Code -> Tokens -> Abstract Syntax Tree (AST) 
```

An AST is a graph data-structure that would represent our code. We will get to the AST in later dev logs. In this dev 
log we're going to focus primarily on how we're going to build the elements of that syntax tree.

To transform the source code into tokens, we'll have to build a Lexer, which will lexically analyze a code and 
transform them into meaningful, easily categorizable data structures called tokens.

### Lexer

My progress so far has been about building the Lexer, which is easier than you might think. I use one pointer and go 
through the code character by character until I find distinct keywords that would form a token.

Let's go through one example:

```js
    let twelve = 12;
```

This is a simple example to demonstrate how the lexer works, but in the future we'll use more complicated examples.

```js
    let twelve = 12;
//     ^
```

When a pointer hits a space it knows to do a lookup for the word let in the defined keywords. If it finds it, it 
will create a token of type `token.LET`

```js
    let twelve = 12;
//            ^
```

Similarly here, although "twelve" is not a defined keyword, meaning that it's likely a variable name, so we can create 
a token of type `token.IDENT` and literal value of `twelve`.

```js
    let twelve = 12;
//             ^
```

This character it encountered is a special character, we check to see if it's followed by another "=", if so then we 
create `token.EQUALS` for "==", otherwise we create `token.ASSIGN` for "=".

```js
    let twelve = 12;
//               ^
```
At this point we encountered a number, so we keep pushing the pointer until it doesn't see numbers anymore in order to 
build the full number (12), then we create the token `token.INT` for the literal "12".

```js
    let twelve = 12;
```

Semicolon is a special character so we immediately create a token `token.SEMICOLON` with the literal `;`.

Finally, we create a `token.EOF` to indicate that the code is done.

### TDD

A nice thing about writing a program that parses strings and creates tokens is that it's relatively easy to employ TDD.

```go
package lexer

import (
	"testing"
)

type NextTokenTest struct {
	expectedType    token.TokenType
	expectedLiteral string
}

func runNextTokenTests(t *testing.T, input string, tests []NextTokenTest) {
	// ...
}

func TestSymbols(t *testing.T) {
	input := `!-/*5<>`
	tests := []NextTokenTest{
		{token.BANG, "!"},
		{token.MINUS, "-"},
		{token.DIVIDE, "/"},
		{token.MULTIPLY, "*"},
		{token.INT, "5"},
		{token.LT, "<"},
		{token.GT, ">"},
		{token.EOF, ""},
	}

	runNextTokenTests(t, input, tests)
}
```

Through out this process building the tests really helped with getting a good documentation on my progress.

### Cherry on Top, a REPL!

A `REPL` stands for Read, Eval, Print, Loop and most languages have one. It's very straightforward to write one, you
just take the input line by line and pass it to the lexer. But this allows you to test quickly your program to see
if it's spitting out the correct tokens.

```shell
 go run main.go                                                      16:12:30
Hello yelsayed! This is the Hullo programming language!
Executing the REPL!
>>let twelve = 12;
{Type:LET Literal:let}
{Type:IDENT Literal:twelve}
{Type:= Literal:=}
{Type:INT Literal:12}
{Type:; Literal:;}
```

So sexy! Next log will be about writing the parser, and how the parser will make sense of these tokens.
