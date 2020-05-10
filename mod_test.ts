import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Template } from "./mod.ts";
const decoder = new TextDecoder();

Deno.test({
  name: "Simple Template",
  fn(): void {
    const tmpl = decoder.decode(Deno.readFileSync("./test_data/simple.tmpl"));
    const expected = decoder.decode(
      Deno.readFileSync("./test_data/simple_result.tmpl")
    );
    const t = new Template(tmpl);
    assertEquals(
      t.render({ one: "OH MY GOD", two: "DIZ IZ TEMPLATE" }),
      expected
    );
  }
});

Deno.test({
  name: "Nested properties",
  fn(): void {
    const tmpl = decoder.decode(
      Deno.readFileSync("./test_data/nested_property.tmpl")
    );
    const expected = decoder.decode(
      Deno.readFileSync("./test_data/nested_property_result.tmpl")
    );
    const t = new Template(tmpl);
    assertEquals(
      t.render({
        supa: { nested: { propartiz: "Iz nested yo" } },
        iz: { dat: { nested: "nest sounds like jest" } }
      }),
      expected
    );
  }
});
Deno.test({
  name: "Custom brackets",
  fn(): void {
    const tmpl = decoder.decode(
      Deno.readFileSync("./test_data/custom_brackets.tmpl")
    );
    const expected = decoder.decode(
      Deno.readFileSync("./test_data/custom_brackets_result.tmpl")
    );
    const t = new Template(tmpl, { openBracket: "=o=", closeBracket: "!//;" });
    assertEquals(
      t.render({ seriously: "who read", test: "assertions?" }),
      expected
    );
  }
});
