# Deno Templates [![Build Status](https://travis-ci.org/zekth/deno-templates.svg?branch=master)](https://travis-ci.org/zekth/deno-templates)

A template parser for Deno.

## Usage

```ts
import { Template } from "./mod.ts";

const tmpl = decoder.decode(Deno.readFileSync("./myfile.tmpl"));
const t = new Template(tmpl);
t.render({ object: "to", pass: "to", my: "template" });
```

## Options

- `openBracket` : Openning bracket of your var. Default : `{{`
- `closeBracket` : Openning bracket of your var. Default : `}}`
- `debug` : If true output warning when value is not found in given object. Default : `false`
