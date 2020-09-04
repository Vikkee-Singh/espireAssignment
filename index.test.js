const dependencyResolver = require("./index");

// First test case
test("No task and no dependency", function () {
  expect(dependencyResolver("[]", "[]")).toEqual([]);
});

// Secound test case
test("Task [a,b] and no dependency", function () {
  expect(dependencyResolver("[a,b]", "[]")).toEqual(["a", "b"]);
});

// Third test case
test("Task [a,b] and dependency [a=>b]", function () {
  expect(dependencyResolver("[a,b]", "[a=>b]")).toEqual(["b", "a"]);
});

// Fourth test case
test("Task [a,b,c,d] and dependencies [a=>b,c=>d]", function () {
  expect(dependencyResolver("[a,b,c,d]", "[a=>b,c=>d]")).toEqual([
    "b",
    "a",
    "d",
    "c",
  ]);
});

// Fifth test case
test("Task [a,b,c] and dependencies [a=>b,b=>c]", function () {
  expect(dependencyResolver("[a,b,c]", "[a=>b,b=>c]")).toEqual(["c", "b", "a"]);
});

// Sixth test case
test("Task [a,b,c,d] and dependencies [a=>b,b=>c,c=>a]", function () {
  expect(dependencyResolver("[a,b,c,d]", "[a=>b,b=>c,c=>a]")).toEqual(
    "Error - this is a cyclic dependency"
  );
});
